import { Component, OnInit, ViewChild } from '@angular/core';
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
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
import { MatSort } from '@angular/material/sort';


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

  dataexcel: any[];

  //adicionando a paginação
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private usuariosservice: UsuarioindexService,
    private usuariosdelete: UsuariosdeleteService,
    public dialog: MatDialog,
  ) { }


  ngOnInit() {
    this.ListarUsuarios();
  }



  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

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




  ListarUsuarios() {
    //chamando serviço de lista usuarios
    this.usuariosservice.list().subscribe(
      (usuariosretorno: UsuariosInterface[]) => {
        //prepara dados pro excel
        this.dataexcel = usuariosretorno;
        this.dataSource = new MatTableDataSource<UsuariosInterface>(this.dataexcel);
        this.usuariosok = true;
    
        //adicionando a paginação
        this.dataSource.paginator = this.paginator;

      },
      (erro: any) => {
        console.error(erro);
      }
    );
  }

  

  Adicionar() {
    const dialogconfig = new MatDialogConfig();
    //dialogconfig.disableClose = true;
    dialogconfig.autoFocus = true;
    dialogconfig.width = "30%";
    this.dialog.open(UsuarioscreateComponent, dialogconfig);
  }

  Editar(id: number, user: string, nome: string, perfil: number) {
    this.dialog.open(UsuarioseditComponent, {
      width: '30%', autoFocus: false, disableClose: true, data: { Id: id, User: user, Nome: nome, Perfil: perfil }
    });
  }

  Deletar(id: number) {
    this.usuariosdelete.Deletar(id).subscribe(userresult => {
      if (userresult) {
        var title = 'Resgistro Excluido com sucesso!';
        var description = 'Esse registro foi excluído!';
        var buttonclose = true;
        this.dialog.open(DialogExampleComponent, { data: { Title: title, Description: description, ButtonClose: buttonclose } });
      } else {
        var title = 'Não foi possível Excluir o Registro';
        var description = 'Esse registro realmente existe?';
        var buttonclose = true;
        this.dialog.open(DialogExampleComponent, { data: { Title: title, Description: description, ButtonClose: buttonclose } });
      }
    }, err => {
      alert(err);
    });
  }

  Download() {
    //create new excel work book
    let workbook = new Workbook();

    //add name to sheet
    let worksheet = workbook.addWorksheet("Employee Data");
    //add column name
    let header = ['id', 'User', 'Nome', 'PerfilId', 'Perfil'];
    let headerRow = worksheet.addRow(header);
    for (let x1 of this.dataexcel) {
      let x2 = Object.keys(x1);
      let temp = []
      for (let y of x2) {
        temp.push(x1[y])
      }
      worksheet.addRow(temp)
    }
    //set downloadable file name
    let fname = "Lista de Usuarios - "

    //add data and file name and download
    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, fname + '-' + new Date().valueOf() + '.xlsx');
    });
  }
}
