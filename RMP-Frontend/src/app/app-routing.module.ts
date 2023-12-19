import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminOptComponent } from './Components/admin-opt/admin-opt.component';
import { InicioComponent } from './Components/inicio/inicio.component';
import { IssueComponent } from './Components/issue/issue.component';
import { LoginComponent } from './Components/login/login.component';
import { MeetingComponent } from './Components/meeting/meeting.component';
import { RegistroComponent } from './Components/registro/registro.component';
import { DevelopmentTeamComponent } from './Components/development-team/development-team.component';
import { PruebasEnSucioComponent } from './Components/pruebas-en-sucio/pruebas-en-sucio.component';
import { RestablecerPwdComponent } from './Components/restablecer-pwd/restablecer-pwd.component';
import { LogoutComponent } from './Components/logout/logout.component';
import { ForgotPwdComponent } from './Components/forgot-pwd/forgot-pwd.component';
import { UserProfileComponent } from './Components/user-profile/user-profile.component';


const routes: Routes = [
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  { path: 'inicio', component: InicioComponent },
  { path: 'login', component: LoginComponent},
  { path: 'registro', component: RegistroComponent},
  { path: 'admin-opt', component: AdminOptComponent},
  { path: 'meeting', component: MeetingComponent},
  { path: 'development-team', component: DevelopmentTeamComponent},
  { path: 'issue', component: IssueComponent},
  { path: 'rstPwd', component: RestablecerPwdComponent},
  { path: 'logout', component: LogoutComponent},
  { path: 'forgotPwd', component: ForgotPwdComponent},
  { path: 'userProfile', component: UserProfileComponent},
  { path: 'sucio', component: PruebasEnSucioComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
