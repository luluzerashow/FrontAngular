import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { PerfilComboInterface } from '../usuariosinterfaces/perfilcomboInterface';

@Injectable({
  providedIn: 'root'
})
export class UsuariosperfisService {

  private readonly APIComboPerfil = `${environment.API}Perfil/GetPerfisCombo`;

  constructor(private http: HttpClient) { }

  ComboPerfil() {
    return this.http.get<PerfilComboInterface[]>(this.APIComboPerfil);
  }

}
