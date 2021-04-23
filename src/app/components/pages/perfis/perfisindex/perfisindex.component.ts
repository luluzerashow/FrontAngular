import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DialogExampleComponent } from '../../../shared/dialog-example/dialog-example.component';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
import { MatSort } from '@angular/material/sort';
import { Perfilinterface } from '../perfisinterfaces/perfilinterface';
import { PerfilindexService } from '../perfisservice/perfilindex.service';
import { PerfildeleteService } from '../perfisservice/perfildelete.service';
import { PerfiscreateComponent } from '../perfiscreate/perfiscreate.component';
import { PerfiseditComponent } from '../perfisedit/perfisedit.component';

@Component({
  selector: 'app-perfisindex',
  templateUrl: './perfisindex.component.html',
  styleUrls: ['./perfisindex.component.css']
})

export class PerfisindexComponent implements OnInit {

  usuariosok: boolean = false;

  displayedColumns: string[] = ['id', 'Nome', 'Descricao', 'Ações'];
  dataSource = new MatTableDataSource<Perfilinterface>();
  selection = new SelectionModel<Perfilinterface>(true, []);

  dataexcel: any[];

  //adicionando a paginação
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private perfilservice: PerfilindexService,
    private perfildelete: PerfildeleteService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
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
  checkboxLabel(row?: Perfilinterface): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  ListarUsuarios() {
    //chamando serviço de lista usuarios
    this.perfilservice.list().subscribe(
      (usuariosretorno: Perfilinterface[]) => {
        //prepara dados pro excel
        this.dataexcel = usuariosretorno;
        this.dataSource = new MatTableDataSource<Perfilinterface>(this.dataexcel);
        this.usuariosok = true;
    
        //adicionando a paginação
        this.dataSource.paginator = this.paginator;

      },
      (erro: any) => {
        console.error(erro);
      }
    );
  }

  Deletar(id: number) {
    this.perfildelete.Deletar(id).subscribe(userresult => {
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

  Adicionar() {
    const dialogconfig = new MatDialogConfig();
    //dialogconfig.disableClose = true;
    dialogconfig.autoFocus = true;
    dialogconfig.width = "30%";
    this.dialog.open(PerfiscreateComponent, dialogconfig);
  }

  Editar(id: number, nome: string, descricao: string) {
    this.dialog.open(PerfiseditComponent, {
      width: '30%', autoFocus: false, disableClose: true, data: { Id: id, Nome: nome, Descricao: descricao }
    });
  }


  Download() {
    //create new excel work book
    let workbook = new Workbook();

    //add name to sheet
    let worksheet = workbook.addWorksheet("Perfis");
    //add column name
    let header = ['id', 'Nome', 'Descricao'];
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
    let fname = "Lista de Perfis - "

    //add data and file name and download
    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, fname + '-' + new Date().valueOf() + '.xlsx');
    });
  }


}
