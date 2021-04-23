import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Faixasinterface } from '../faixasinterfaces/faixasinterface';

@Injectable({
  providedIn: 'root'
})
export class FaixaindexService {

  private readonly APIGetAll = `${environment.API}Faixas/FaixasGetAllAsync`;
  constructor(private http: HttpClient) { }

  list(){
    return this.http.get<[Faixasinterface]>(this.APIGetAll);
  }
}
