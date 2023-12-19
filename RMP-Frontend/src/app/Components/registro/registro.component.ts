import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { FuncionesBasicasService } from '../../services/funciones-basicas.service';
import { LoginComponent } from '../login/login.component';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})


export class RegistroComponent {

  avisos : Message[] = [];
  loading: boolean = false;
  showPassword : boolean = false;

  funciones : FuncionesBasicasService;

  @ViewChild(LoginComponent) login!: LoginComponent;


  //URL : string = 'http://localhost:8080/'
  
  constructor(private router: Router, private http: HttpClient, private titleService: Title) {
    this.funciones = new FuncionesBasicasService();
    this.titleService.setTitle('Registro | RetroS');
  }
  
  ngOnInit(): void { 
    
    var liPestanaAdm = document.getElementById("pestanaAdmin") as HTMLLIElement;
    if(window.sessionStorage.getItem("rol") == 'admin'){
      liPestanaAdm.style.display = "block";
    }else{
      liPestanaAdm.style.display = "none";
    }
  }

  registro(){

    var supervisorActivo = 'false';
    var camposCorrectos = 0;

    var nameCampo = document.getElementById("name") as HTMLInputElement;
    var surnameCampo = document.getElementById("surname") as HTMLInputElement;
    var emailCampo = document.getElementById("email") as HTMLInputElement;
    var pwdCampo = document.getElementById("pwd") as HTMLInputElement;
    var pwd2Campo = document.getElementById("pwd2") as HTMLInputElement;
    var tlfCampo = document.getElementById("tlf") as HTMLInputElement;
    var companyCampo = document.getElementById("company") as HTMLInputElement;
    var developTeamCampo = document.getElementById("developTeam") as HTMLInputElement;
    var supervisorCampo = document.getElementById("supervisor") as HTMLInputElement;
    
    var errorName = this.funciones.comprobarVacioSombreado(nameCampo?.value);
    if(errorName){ 
      nameCampo.style.boxShadow = "0px 0px 6px rgba(255, 0, 0, 1.5)";
    }else{
      nameCampo.style.boxShadow = "none";
      camposCorrectos+=1; 
    }

    var errorSurname = this.funciones.comprobarVacioSombreado(surnameCampo?.value);
    if(errorSurname){ 
      surnameCampo.style.boxShadow = "0px 0px 6px rgba(255, 0, 0, 1.5)";
    }else{
      surnameCampo.style.boxShadow = "none";
      camposCorrectos+=1; 
    }
    
    var errorEmail = this.funciones.comprobarVacioSombreado(emailCampo?.value);
    if(errorEmail){ 
      emailCampo.style.boxShadow = "0px 0px 6px rgba(255, 0, 0, 1.5)";
    }else{
      if (!this.funciones.validarEmail(emailCampo?.value)) {
        emailCampo.style.boxShadow = "0px 0px 6px rgba(255, 0, 0, 1.5)";
      } else {
        emailCampo.style.boxShadow = "none";
        camposCorrectos+=1; 
      }
     
    }

    var errorPwd = this.funciones.comprobarVacioSombreado(pwdCampo?.value);
    var errorPwd2 = this.funciones.comprobarVacioSombreado(pwd2Campo?.value);
    if(errorPwd || errorPwd2){ 
      pwdCampo.style.boxShadow = "0px 0px 6px rgba(255, 0, 0, 1.5)";
      pwd2Campo.style.boxShadow = "0px 0px 6px rgba(255, 0, 0, 1.5)";
    }else{     
      if (pwdCampo?.value !== pwd2Campo?.value) {
        pwd2Campo.style.boxShadow = "0px 0px 6px rgba(255, 0, 0, 1.5)";
        pwdCampo.style.boxShadow = "0px 0px 6px rgba(255, 0, 0, 1.5)";
      }else{
        camposCorrectos+=1;
        pwdCampo.style.boxShadow = "none"; 
        pwd2Campo.style.boxShadow = "none";
      }
    }
    
    var errorTlf = this.funciones.comprobarVacioSombreado(tlfCampo?.value);
    if(errorTlf){ 
      tlfCampo.style.boxShadow = "0px 0px 6px rgba(255, 0, 0, 1.5)";
    }else{
      if (this.funciones.esNumero(tlfCampo?.value)) {
        tlfCampo.style.boxShadow = "none";
        camposCorrectos+=1; 
      } else {
        tlfCampo.style.boxShadow = "0px 0px 6px rgba(255, 0, 0, 1.5)";
      }
 
    }

    var errorCompany = this.funciones.comprobarVacioSombreado(companyCampo?.value);
    if(errorCompany){ 
      companyCampo.style.boxShadow = "0px 0px 6px rgba(255, 0, 0, 1.5)";
    }else{
      companyCampo.style.boxShadow = "none";
      camposCorrectos+=1; 
    }

    var errorDevTeam = this.funciones.comprobarVacioSombreado(developTeamCampo?.value);
    if(errorDevTeam){ 
      developTeamCampo.style.boxShadow = "0px 0px 6px rgba(255, 0, 0, 1.5)";
    }else{
      developTeamCampo.style.boxShadow = "none";
      camposCorrectos+=1; 
    }

    if (supervisorCampo.checked) {
      supervisorActivo = 'true';
    }

    if (camposCorrectos == 7) {
      this.peticionHttpRegistro(nameCampo?.value, surnameCampo?.value, emailCampo?.value, pwdCampo?.value,
        pwd2Campo?.value, tlfCampo?.value, companyCampo?.value, developTeamCampo?.value, supervisorActivo);
    }else{
      this.avisos = [{ severity: 'error', summary: '', detail: "Revisa los campos de registro"}];
    }
  }

  peticionHttpRegistro(name:string, surname:string, email:string, pwd:string, pwd2:string, tlf:string, company:string, developTeam:string, supervisor:string){
    const headers = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    };
    const body = {
      "name": name,
      "surname": surname,
      "email": email,
      "pwd1": pwd,
      "pwd2": pwd2,
      "tlf": tlf,
      "company": company,
      "developTeam": developTeam,
      "supervisor": supervisor
    };

    const url = 'http://localhost:8080/user/register';
    this.http.post(url, body, { headers, responseType: 'text' }).subscribe({
      next: data => {
        if (data.includes("La contraseña debe tener al menos 8 caracteres")) {
          this.avisos = [{ severity: 'error', summary: '', detail: data}];
        } else if(data.includes("La contraseña debe contener al menos un digito")){
          this.avisos = [{ severity: 'error', summary: '', detail: data}];
        }else if(data.includes("La contraseña debe tener al menos una mayúscula")){ 
          this.avisos = [{ severity: 'error', summary: '', detail: data}];
        }else if(data.includes("La contraseña debe tener al menos una minúscula")){  
          this.avisos = [{ severity: 'error', summary: '', detail: data}];
        }else if(data.includes("Ya existe un usuario con ese correo")){ 
          this.avisos = [{ severity: 'error', summary: '', detail: data}];
        }else{
          this.avisos = [{ severity: 'sucesss', summary: '', detail: "Registrado correctamente"}];
          setTimeout(() => {  this.login.peticionLoginHttp(email, pwd) }, 2000);
          this.router.navigate(['/login']);
        }
      },
      error: error => {
        this.avisos = [{ severity: 'warn', summary: '', detail: "Ha ocurrido un error"}];
        setTimeout(() => {  this.router.navigate(['/inicio']); }, 2500);
      }
    });
  }

  //***********************************************************************
  //***********************FUNCIONES AUXILIARES****************************
  //***********************************************************************

  
  previousDiv(currentDivId:string, previousDivId:string) {
    var currentDiv = document.getElementById(currentDivId) as HTMLDivElement;
    var previousDiv = document.getElementById(previousDivId)as HTMLDivElement ;
    currentDiv.style.display = "none";
    previousDiv.style.display = "block";
  }

  nextDiv(currentDivId:string, nextDivId:string) {
    var currentDiv = document.getElementById(currentDivId) as HTMLDivElement;
    var nextDiv = document.getElementById(nextDivId) as HTMLDivElement;
    currentDiv.style.display = "none";
    nextDiv.style.display = "block";
  }

  mostrarPwd(){

    if(this.showPassword == true) this.showPassword = false;
    else this.showPassword = true;
    
    var campo = document.getElementById("pwd") as HTMLInputElement;

    if(campo.type == 'password') campo.type = 'text';
    else campo.type = 'password';
    
  }

}



