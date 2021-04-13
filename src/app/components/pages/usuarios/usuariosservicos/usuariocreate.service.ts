import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { PerfilComboInterface } from '../usuariosinterfaces/perfilcomboInterface';

@Injectable({
  providedIn: 'root'
})
export class UsuariocreateService {
  private readonly APICriarUsuario = `${environment.API}Usuario/CreateAsync`;

  constructor(private http: HttpClient) { }

  Salvar(Usernovo: string, Senhanovo: string, Nomenovo: string, Perfilidnovo: number): Observable<any> {
    var novousuario = { "User": Usernovo, "Senha": Senhanovo, "Nome": Nomenovo, "PerfilId": Perfilidnovo };
    console.log(novousuario);
    return this.http.post(this.APICriarUsuario, novousuario);
  }

}
