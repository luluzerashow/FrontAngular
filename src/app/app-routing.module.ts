import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContatoComponent } from './components/pages/contato/contato.component';
import { DashboardComponent } from './components/pages/dashboard/dashboard.component';
import { FaixasindexComponent } from './components/pages/faixas/faixasindex/faixasindex.component';
import { LoginComponent } from './components/pages/login/login.component';
import { PerfisindexComponent } from './components/pages/perfis/perfisindex/perfisindex.component';
import { UsuariosindexComponent } from './components/pages/usuarios/usuariosindex/usuariosindex.component';


const routes: Routes = [
  {path:'', redirectTo:'login',pathMatch: 'full'},
  {path: 'dashboard',component:DashboardComponent},
  {path: 'usuarios',component:UsuariosindexComponent},
  {path: 'contato',component:ContatoComponent},
  {path: 'login/:user,password',component:LoginComponent},
  {path: 'perfis',component:PerfisindexComponent},
  {path: 'faixas',component:FaixasindexComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
