import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FaixaeditService {

  private readonly APIEditPerfil = `${environment.API}Faixas/FaixasEditAsync`;

  constructor(private http: HttpClient) { }

  Salvar(id:number, Cornovo: string, Aula_Metanovo: string): Observable<any> {
    var novacor = { "Id": id, "Cor": Cornovo, "Aulas_Meta": Aula_Metanovo };
    return this.http.put(this.APIEditPerfil, novacor);
  }

}
