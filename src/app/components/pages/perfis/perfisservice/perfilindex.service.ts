import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Perfilinterface } from '../perfisinterfaces/perfilinterface';

@Injectable({
  providedIn: 'root'
})
export class PerfilindexService {

  private readonly APIGetAll = `${environment.API}Perfil/PerfilGetAllAsync`;
  constructor(private http: HttpClient) { }

  list(){
    return this.http.get<[Perfilinterface]>(this.APIGetAll);
  }

  download(){
    
  }

}
