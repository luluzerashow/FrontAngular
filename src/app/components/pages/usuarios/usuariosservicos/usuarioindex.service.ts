import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, delay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { UsuariosInterface } from '../usuariosinterfaces/usuariosInterface';
import { PerfilComboInterface } from '../usuariosinterfaces/perfilcomboInterface';

@Injectable({
  providedIn: 'root'
})
export class UsuarioindexService {

  private readonly APIGetAll = `${environment.API}Usuario/GetAllAsync`;
  constructor(private http: HttpClient) { }

  list(){
    return this.http.get<UsuariosInterface[]>(this.APIGetAll);
  }


}

