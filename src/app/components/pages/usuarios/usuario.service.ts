import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, delay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { UsuariosInterface } from './usuariosInterface';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private readonly API = `${environment.API}Usuario/GetAllAsync`;

  constructor(private http: HttpClient) { }

  list(){
    return this.http.get<UsuariosInterface[]>(this.API);
    // .pipe(
    //   delay(2000),
    //   tap(console.log)
    // );
  }
}
