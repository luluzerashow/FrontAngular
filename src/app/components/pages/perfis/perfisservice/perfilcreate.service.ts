import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PerfilcreateService {
  private readonly APICriarPerfil = `${environment.API}Perfil/PerfilCreateAsync`;

  constructor(private http: HttpClient) { }

  Salvar(Nomenovo: string, Descricaonovo: string): Observable<any> {
    var novoperfil = {"Nome": Nomenovo, "Descricao": Descricaonovo };
    console.log(novoperfil);
    return this.http.post(this.APICriarPerfil, novoperfil);
  }

}
