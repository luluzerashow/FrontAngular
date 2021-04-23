import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DialogExampleComponent } from '../../../shared/dialog-example/dialog-example.component';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
import { MatSort } from '@angular/material/sort';
import { Faixasinterface } from '../faixasinterfaces/faixasinterface';
import { FaixaindexService } from '../faixasservice/faixaindex.service';
import { FaixadeleteService } from '../faixasservice/faixadelete.service';
import { FaixascreateComponent } from '../faixascreate/faixascreate.component';
import { FaixaseditComponent } from '../faixasedit/faixasedit.component';

@Component({
  selector: 'app-faixasindex',
  templateUrl: './faixasindex.component.html',
  styleUrls: ['./faixasindex.component.css']
})
export class FaixasindexComponent implements OnInit {

  faixassok: boolean = false;

  displayedColumns: string[] = ['id', 'Cor', 'Aula Meta', 'Ações'];
  dataSource = new MatTableDataSource<Faixasinterface>();
  selection = new SelectionModel<Faixasinterface>(true, []);

  dataexcel: any[];

  //adicionando a paginação
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private faixaservice: FaixaindexService,
    private faixadelete: FaixadeleteService,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.ListarFaixas();
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
  checkboxLabel(row?: Faixasinterface): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.Id + 1}`;
  }

  ListarFaixas() {
    //chamando serviço de lista usuarios
    this.faixaservice.list().subscribe(
      (usuariosretorno: Faixasinterface[]) => {
        //prepara dados pro excel
        this.dataexcel = usuariosretorno;
        this.dataSource = new MatTableDataSource<Faixasinterface>(this.dataexcel);
        this.faixassok = true;
    
        //adicionando a paginação
        this.dataSource.paginator = this.paginator;

      },
      (erro: any) => {
        console.error(erro);
      }
    );
  }
  
  Deletar(id: number) {
    this.faixadelete.Deletar(id).subscribe(userresult => {
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
    this.dialog.open(FaixascreateComponent, dialogconfig);
  }

  Editar(id: number, cor: string, aula_meta: string) {
    this.dialog.open(FaixaseditComponent, {
      width: '30%', autoFocus: false, disableClose: true, data: { Id: id, Cor: cor, Aula_Meta: aula_meta }
    });
  }


  Download() {
    //create new excel work book
    let workbook = new Workbook();

    //add name to sheet
    let worksheet = workbook.addWorksheet("Faixas");
    //add column name
    let header = ['id', 'Cor', 'Aula_Meta'];
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
    let fname = "Lista de Faixas - "

    //add data and file name and download
    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, fname + '-' + new Date().valueOf() + '.xlsx');
    });
  }


}

