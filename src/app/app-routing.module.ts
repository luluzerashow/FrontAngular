import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContatoComponent } from './components/pages/contato/contato.component';
import { DashboardComponent } from './components/pages/dashboard/dashboard.component';
import { LoginComponent } from './components/pages/login/login.component';
import { UsuariosComponent } from './components/pages/usuarios/usuarios.component';

const routes: Routes = [
  {path:'', redirectTo:'login',pathMatch: 'full'},
  {path: 'dashboard',component:DashboardComponent},
  {path: 'usuarios',component:UsuariosComponent},
  {path: 'contato',component:ContatoComponent},
  {path: 'login/:user,password',component:LoginComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
