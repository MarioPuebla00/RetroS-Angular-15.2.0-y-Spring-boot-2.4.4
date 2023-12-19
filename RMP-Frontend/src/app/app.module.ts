import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './Components/login/login.component';
import { InicioComponent } from './Components/inicio/inicio.component';
import { RegistroComponent } from './Components/registro/registro.component';
import { AdminOptComponent } from './Components/admin-opt/admin-opt.component';
import { MeetingComponent } from './Components/meeting/meeting.component';
import { DevelopmentTeamComponent } from './Components/development-team/development-team.component';
import { IssueComponent } from './Components/issue/issue.component';
import { UserProfileComponent } from './Components/user-profile/user-profile.component';
import { PruebasEnSucioComponent } from './Components/pruebas-en-sucio/pruebas-en-sucio.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MessagesModule } from 'primeng/messages';
import { MessageService } from 'primeng/api';
import { RestablecerPwdComponent } from './Components/restablecer-pwd/restablecer-pwd.component';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { LogoutComponent } from './Components/logout/logout.component';
import { ForgotPwdComponent } from './Components/forgot-pwd/forgot-pwd.component';
import { InputTextModule } from 'primeng/inputtext';
import { RatingModule } from 'primeng/rating';
import { TabViewModule } from 'primeng/tabview';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    InicioComponent,
    RegistroComponent,
    AdminOptComponent,
    MeetingComponent,
    DevelopmentTeamComponent,
    IssueComponent,
    UserProfileComponent,
    PruebasEnSucioComponent,
    RestablecerPwdComponent,
    LogoutComponent,
    ForgotPwdComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule ,
    MatTooltipModule,
    MessagesModule,
    ButtonModule,
    FormsModule,
    ConfirmDialogModule,
    ToastModule,
    InputTextModule,
    RatingModule,
    TabViewModule
    
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
