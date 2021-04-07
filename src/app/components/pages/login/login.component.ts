import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogExampleComponent } from '../../shared/dialog-example/dialog-example.component';
import { CookieService } from 'ngx-cookie-service';
import { LoginInterface } from './loginInterface';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']

})
// ta reclamando mas taa funcionando nao entendi sempre Cookie Service
export class LoginComponent implements OnInit {
  hide = true;

  userresult: boolean;

  loginusuarios$: Observable<LoginInterface[]>;

  constructor(
    private loginservice: LoginService,
    private cookie:CookieService,
    public dialog: MatDialog
    ) { }


  ngOnInit(): void {
  }

  CriarCoockie(user){
    this.loginservice.criarcookie(user).subscribe(loginusuarios =>{
       
      var cookie = 'Id-' + loginusuarios[0].id 
                  + '-User-' + loginusuarios[0].User 
                  + '-Nome-' + loginusuarios[0].Nome
                  + '-PerfilId-' + loginusuarios[0].PerfilId
                  + '-PerfilNome-' + loginusuarios[0].PerfilNome;
       //Criando cookie
       this.cookie.set('UsuarioCookie',cookie,1)
   
    }, err =>{
      console.log('Erro', err);
    });
  }

  Logar(user) {
    this.loginservice.logaruser(user).subscribe(userresult =>{
      if(userresult){

        this.CriarCoockie(user);

        //Navegando para outra pagina
        var url = location.href;
        window.location.href = url +  "dashboard";
      }else{
        //alert("Usuario não cadastrado");
        var title = 'Usuário não Cadastrado';
        var description = 'Talvez você não esteja cadastrado no sistema, verifique com o administrador!';
        var buttonclose = true;
        this.dialog.open(DialogExampleComponent, {data:{Title:title, Description: description,ButtonClose: buttonclose }});        
      }
    }, err =>{
      console.log('Erro', err);
    });
  }
}




