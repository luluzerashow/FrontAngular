import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosdeleteService {
  private readonly APIDelete = `${environment.API}Usuario/DeleteByIdAsync/`;

  constructor(private http: HttpClient) { }

Deletar(id:number): Observable<any>{
  return this.http.delete(this.APIDelete + id);
}
}
