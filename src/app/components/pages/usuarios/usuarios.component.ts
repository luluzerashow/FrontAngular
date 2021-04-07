import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { UsuariosInterface } from './usuariosInterface';
import { Observable } from 'rxjs';
import { UsuarioService } from './usuario.service';

import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { throwToolbarMixedModesError } from '@angular/material/toolbar';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit, AfterViewInit {

  usuariosok: boolean = false;

  displayedColumns: string[] = ['id', 'User', 'Nome', 'PerfilId', 'Perfil'];
  dataSource = new MatTableDataSource<UsuariosInterface>();
 
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private usuariosservice: UsuarioService) { }

    ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
    }

  ngOnInit() {
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
}