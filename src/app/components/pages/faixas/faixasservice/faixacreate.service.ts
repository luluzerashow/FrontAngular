import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FaixacreateService {
  private readonly APICriarPerfil = `${environment.API}Faixas/FaixasCreateAsync`;

  constructor(private http: HttpClient) { }

  Salvar(Cornovo: string, Aula_Metanovo: number): Observable<any> {
    var novacor = {"Cor": Cornovo, "Aulas_Meta": Aula_Metanovo };
    console.log(novacor);
    return this.http.post(this.APICriarPerfil, novacor);
  }

}