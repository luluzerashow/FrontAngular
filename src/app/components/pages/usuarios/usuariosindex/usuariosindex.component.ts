import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { UsuariosInterface } from '../usuariosinterfaces/usuariosInterface';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DialogExampleComponent } from '../../../shared/dialog-example/dialog-example.component';
import { UsuarioseditComponent } from '../usuariosedit/usuariosedit.component';
import { UsuarioscreateComponent } from '../usuarioscreate/usuarioscreate.component';
import { UsuarioindexService } from '../usuariosservicos/usuarioindex.service';
import { UsuariosdeleteService } from '../usuariosservicos/usuariosdelete.service';
import { config } from 'rxjs';

@Component({
  selector: 'app-usuariosindex',
  templateUrl: './usuariosindex.component.html',
  styleUrls: ['./usuariosindex.component.css']
})
export class UsuariosindexComponent implements OnInit {

  usuariosok: boolean = false;

  displayedColumns: string[] = ['select', 'id', 'User', 'Nome', 'PerfilId', 'Perfil', 'Ações'];
  dataSource = new MatTableDataSource<UsuariosInterface>();
  selection = new SelectionModel<UsuariosInterface>(true, []);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: UsuariosInterface): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }
 
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private usuariosservice: UsuarioindexService,
    private usuariosdelete: UsuariosdeleteService,
    public dialog: MatDialog,
    ) { }

    ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
    }

  ngOnInit() {
    this.ListarUsuarios();
  }



  ListarUsuarios(){
        //chamando serviço de lista usuarios
        this.usuariosservice.list().subscribe(
          (usuariosretorno: UsuariosInterface[]) => {
            var data = usuariosretorno;
            this.dataSource = new MatTableDataSource<UsuariosInterface>(data);
            this.usuariosok = true;
          },
          (erro: any) => {
            console.error(erro);
          }
        );
  }

  Adicionar(){     
      const dialogconfig = new MatDialogConfig();
      //dialogconfig.disableClose = true;
      dialogconfig.autoFocus = true;
      dialogconfig.width = "30%";
      this.dialog.open(UsuarioscreateComponent, dialogconfig);
  }

  Editar(user:string,nome:string,perfil:number){
      this.dialog.open(UsuarioseditComponent,{
        width: '30%',autoFocus: false, disableClose: true, data: {User:user, Nome: nome, Perfil: perfil}
      });
  }

  Deletar(id:number){
    this.usuariosdelete.Deletar(id).subscribe(userresult =>{
      if(userresult){  
        var title = 'Resgistro Excluido com sucesso!';
        var description = 'Esse registro foi excluído!';
        var buttonclose = true;
        this.dialog.open(DialogExampleComponent, {data:{Title:title, Description: description,ButtonClose: buttonclose}});
      }else{
        var title = 'Não foi possível Excluir o Registro';
        var description = 'Esse registro realmente existe?';
        var buttonclose = true;
        this.dialog.open(DialogExampleComponent, {data:{Title:title, Description: description,ButtonClose: buttonclose }});  
      }
    }, err =>{
      alert(err);
    });   
  }
}