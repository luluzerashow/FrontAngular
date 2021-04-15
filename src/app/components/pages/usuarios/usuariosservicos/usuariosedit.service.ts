import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { PerfilComboInterface } from '../usuariosinterfaces/perfilcomboInterface';

@Injectable({
  providedIn: 'root'
})
export class UsuarioseditService {

  private readonly APICriarUsuario = `${environment.API}Usuario/EditAsync`;

  constructor(private http: HttpClient) { }

  Salvar(id:number, Usernovo: string, Nomenovo: string, Perfilidnovo: number): Observable<any> {
    var novousuario = { "Id": id, "User": Usernovo, "Nome": Nomenovo, "PerfilId": Perfilidnovo };
    return this.http.put(this.APICriarUsuario, novousuario);
  }

}