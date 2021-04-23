import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PerfileditService {

  private readonly APIEditPerfil = `${environment.API}Perfil/PerfilEditAsync`;

  constructor(private http: HttpClient) { }

  Salvar(id:number, Nomenovo: string, Descricaonovo: string): Observable<any> {
    var novouperfil = { "Id": id, "Nome": Nomenovo, "Descricao": Descricaonovo };
    return this.http.put(this.APIEditPerfil, novouperfil);
  }

}
