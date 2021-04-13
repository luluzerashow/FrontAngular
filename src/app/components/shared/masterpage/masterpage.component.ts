import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-masterpage',
  templateUrl: './masterpage.component.html',
  styleUrls: ['./masterpage.component.css']
})
export class MasterpageComponent implements OnInit {

  //variaveis de cookie
  cookieExists: boolean;
  cookieId: string;
  cookieUser: string;
  cookieNome: string;
  cookiePerfilId: string;
  cookiePerfil: string;

  constructor(private cookie:CookieService) { }

  ngOnInit(): void {
     //trazendo o cookie e colocando em varaveis
     this.cookieExists = this.cookie.check('UsuarioCookie');
     if(this.cookieExists){
       var dadoscookie = this.cookie.get('UsuarioCookie').split('-');
       this.cookieId = dadoscookie[1];
       this.cookieUser = dadoscookie[3];
       this.cookieNome = dadoscookie[5];
       this.cookiePerfilId = dadoscookie[7];
       this.cookiePerfil = dadoscookie[9];
     }else{
       //Navegando para outra pagina
       window.location.href = 'http://localhost:4200/login';
     }
  }

}
