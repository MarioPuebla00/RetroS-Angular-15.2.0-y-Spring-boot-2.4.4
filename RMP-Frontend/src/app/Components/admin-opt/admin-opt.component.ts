import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Admin } from 'src/app/Entities/Admin';
import { Issue } from 'src/app/Entities/Issue';
import { Meeting } from 'src/app/Entities/Meeting';
import { User } from 'src/app/Entities/User';
import { FuncionesBasicasService } from 'src/app/services/funciones-basicas.service';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-admin-opt',
  templateUrl: './admin-opt.component.html',
  styleUrls: ['./admin-opt.component.css']
})

export class AdminOptComponent {

  
  //AVISOS 
  avisos: Message[] = [];
  advertencias: Message[] = [];

  //LISTAS DE ENTIDADES
  listaAdmins: Admin[] = [];
  listaUsersAdm: User[] = [];
  listaReunionesAdm: Meeting[] = [];
  listaIssuesAdm: Issue[] = [];

  //TRADUCCIONES
  keyWordTrad : string = "";
  
  //CONTROL DE ESTAÑAS
  activeTab = 1;

  changeTab(tab: number) {
    this.activeTab = tab;
  }

  funciones: FuncionesBasicasService;

  constructor(private router: Router, private http: HttpClient, private titleService: Title){
    this.titleService.setTitle('Menú de administrador | RetroS');
    this.funciones = new FuncionesBasicasService();
  }

  ngOnInit(): void {
    
    this.accesoPermitido();
  }

  //***********************************************************************
  //**************************CONTROL DE ACCESO****************************
  //***********************************************************************

  accesoPermitido(){

    const headers = {
      'Content-Type': 'application/json'
    };

    const body = {
      "emailAcceso": window.sessionStorage.getItem('email'),
      "pwdAcceso": window.sessionStorage.getItem('pwd'),
    };


    const url = 'http://localhost:8080/user/accesoAdmin';
    this.http.post(url, body, { headers, responseType: 'text' }).subscribe({
      next: data => {

        if (data.includes("No tienes acceso a este servicio")) {
          this.advertencias = [{ severity: 'warn', summary: '', detail: "No tienes acceso a este servicio. Inicia sesión con credenciales apropiadas"}];
          setTimeout(() => {  this.router.navigate(['/login']) }, 2500);
        }else{
          this.peticionGetAdminsHttp();
          this.peticionGetUsersHttp();
          this.peticionGetMeetingsHttp();
          this.peticionGetIssuesHttp();
          var liPestanaAdm = document.getElementById("pestanaAdmin") as HTMLLIElement;
          liPestanaAdm.style.display = "block";
          var divAdvertencia = document.getElementById("divAdvertencia") as HTMLDivElement;
          divAdvertencia.style.display = "none";
          var divDevTeam = document.getElementById("divAdminMenu") as HTMLDivElement;
          divDevTeam.style.display = "block" ;
        }
      },error: error => {
        this.advertencias = [{ severity: 'warn', summary: '', detail: "Ha ocurrido un error"}];
        setTimeout(() => { this.router.navigate(['/inicio']) }, 2500);
      }
    });
  }

  //***********************************************************************
  //***********************PETICIONES GET**********************************
  //***********************************************************************

  peticionGetAdminsHttp(){
    const headers = {
      'Content-Type': 'application/json'
    };

    const urlUsers = 'http://localhost:8080/user/getAdmins';
    this.http.get(urlUsers, { headers, responseType: 'text' }).subscribe({
      next: data => {
        this.listaAdmins = [];
        if (data.length == 0) {
          this.avisos = [{ severity: 'info', summary: '', detail: "No hay administradores registrados"}];
        } else {
          var listaAdminJSON = data.split(";");
          for (let i = 0; i < listaAdminJSON.length; i++) {
            var adminAUX = new Admin(listaAdminJSON[i],i);
            this.listaAdmins.push(adminAUX);
          }
        }
      }, error: error => {
        this.avisos = [{ severity: 'warn', summary: '', detail: "Ha ocurrido un error"}];
        setTimeout(() => { this.router.navigate(['/inicio']) }, 2500);
      }
    });
  }

  peticionGetUsersHttp(){
    const headers = {
      'Content-Type': 'application/json'
    };

    const urlUsers = 'http://localhost:8080/user/getUsers';
    this.http.get(urlUsers, { headers, responseType: 'text' }).subscribe({
      next: data => {
        this.listaUsersAdm = [];
        if (data.length == 0) {
          this.avisos = [{ severity: 'info', summary: '', detail: "No hay usuarios registrados"}];
        } else {
          var listaUserJSON = data.split(";");
          for (let i = 0; i < listaUserJSON.length; i++) {
            var userAUX = new User(listaUserJSON[i],i);
            this.listaUsersAdm.push(userAUX);
     
          }
        }
      }, error: error => {
        this.avisos = [{ severity: 'warn', summary: '', detail: "Ha ocurrido un error"}];
        setTimeout(() => { this.router.navigate(['/inicio']) }, 2500);
      }
    });
  }

  peticionGetMeetingsHttp(){
    const headers = {
      'Content-Type': 'application/json'
    };

    const url = 'http://localhost:8080/meeting/getMeetings';
    this.http.get(url, { headers, responseType: 'text' }).subscribe({
      next: data => {
        this.listaReunionesAdm = [];
        if (data.length == 0) {
          this.avisos = [{ severity: 'info', summary: '', detail: "No hay reuniones para mostrar"}];
        } else {
          var listaMeetJSON = data.split(";");
          for (let i = 0; i < listaMeetJSON.length; i++) {
            var meetAux = new Meeting(listaMeetJSON[i],i)
            this.listaReunionesAdm.push(meetAux)
          }
        }

      }, error: error => {
        this.avisos = [{ severity: 'warn', summary: '', detail: "Ha ocurrido un error"}];
        setTimeout(() => { this.router.navigate(['/inicio']) }, 2500);  
      }
    });
  }

  peticionGetIssuesHttp(){
    const headers = {
      'Content-Type': 'application/json'
    };

    const url = 'http://localhost:8080/issue/getIssues';
    this.http.get(url, { headers, responseType: 'text' }).subscribe({
      next: data => {
        this.listaIssuesAdm = [];
        if (data.length == 0) {
          this.avisos = [{ severity: 'info', summary: '', detail: "No hay Issues registradas"}];
          
        } else {
          var listaIssJSON = data.split(";");
          for (let i = 0; i < listaIssJSON.length; i++) {
            var issAux = new Issue(listaIssJSON[i],i)

            if(issAux.issFixed == 'true'){
              issAux.issFixed = 'Si'
            }else{
              issAux.issFixed = 'No'
            }

            issAux.issKeyWord = this.funciones.traduccionKeyWord(issAux.issKeyWord,1);

            this.listaIssuesAdm.push(issAux);
          }
        }
      }, error: error => {
        this.avisos = [{ severity: 'warn', summary: '', detail: "Ha ocurrido un error"}];
        setTimeout(() => { this.router.navigate(['/inicio']) }, 2500);
      }
    });
  }

  //***********************************************************************
  //***********************CRUD OPERATIONS ADMIN***************************
  //***********************************************************************

  registrarAdmin(){

    var camposCorrectos = 0;

    var emailCampo = document.getElementById("admNewEmail") as HTMLInputElement;
    var nameCampo = document.getElementById("admNewName") as HTMLInputElement;
    var surnameCampo = document.getElementById("admNewSurname") as HTMLInputElement;
    var pwdCampo = document.getElementById("admNewPwd") as HTMLInputElement;
    var pwd2Campo = document.getElementById("admNewPwd2") as HTMLInputElement;
    var tlfCampo = document.getElementById("admNewTlf") as HTMLInputElement;

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

    if (camposCorrectos == 5) {
      this.peticionHttpRegistroAdm(nameCampo?.value, surnameCampo?.value, emailCampo?.value, pwdCampo?.value, pwd2Campo?.value, tlfCampo?.value);
    }else{
      this.avisos = [{ severity: 'error', summary: '', detail: "Revise los campos"}];
    }
  }

  peticionHttpRegistroAdm(name:string, surname:string, email:string, pwd:string, pwd2:string, tlf:string){
    const headers = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    };
    const body = {
      "email": email,
      "name": name,
      "surname": surname,
      "pwd1": pwd,
      "pwd2": pwd2,
      "tlf": tlf,
      "emailAcceso": window.sessionStorage.getItem('email'),
      "pwdAcceso": window.sessionStorage.getItem('pwd')

    };

    const url = 'http://localhost:8080/user/crearAdmin';
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
        }else if(data.includes("Ya existe un administrador con ese correo")){ 
          this.avisos = [{ severity: 'error', summary: '', detail: data}];
        }else{
          this.avisos = [{ severity: 'success', summary: '', detail: "Administrador creado correctamente"}];
          this.peticionGetAdminsHttp();
          this.ocultarFormRegistroAdmin();
        }
      },
      error: error => {
        this.avisos = [{ severity: 'warn', summary: '', detail: "Ha ocurrido un error"}];
        setTimeout(() => { this.router.navigate(['/inicio']) }, 2500);
      }
    });
  }

  eliminarAdmin(){

    var camposCorrectos = 0;

    var emailCampo = document.getElementById("inputAdmEmail") as HTMLInputElement;

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

    if (camposCorrectos == 1) {
      this.peticionHttpEliminarAdm(emailCampo?.value);
    }else{
      this.avisos = [{ severity: 'error', summary: '', detail: "Revisa los campos"}];
    }
  }

  peticionHttpEliminarAdm(email:string){
    const headers = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    };
    const body = {
      "email": email,
      "emailAcceso": window.sessionStorage.getItem('email'),
      "pwdAcceso": window.sessionStorage.getItem('pwd')
    };

    const url = 'http://localhost:8080/user/deleteAdmin';
    this.http.post(url, body, { headers, responseType: 'text' }).subscribe({
      next: data => {
        if (data.includes("Error: el administrador suministrado no existe")) {
          this.avisos = [{ severity: 'error', summary: '', detail: data}];
        
        }else{
          var parametrosAdmConBtn : string[] = ['btnUpdtAdm','btnUpdtAdm','inputAdmEmail','inputAdmName','inputAdmSurname','inputAdmTlf'];
          var parametrosAdm : string[] = ['inputAdmEmail','inputAdmName','inputAdmSurname','inputAdmTlf'];
          this.peticionGetAdminsHttp();
          this.funciones.restaurarCampos(parametrosAdm);
          this.funciones.bloquearCampos(parametrosAdmConBtn);
        }
      },
      error: error => {
        this.avisos = [{ severity: 'warn', summary: '', detail: "Ha ocurrido un error"}];
        setTimeout(() => { this.router.navigate(['/inicio']) }, 2500);
      }
    });
  }

  actualizarAdmin(){

    var camposCorrectos = 0;

    var emailCampo = document.getElementById("inputAdmEmail") as HTMLInputElement;
    var nameCampo = document.getElementById("inputAdmName") as HTMLInputElement;
    var surnameCampo = document.getElementById("inputAdmSurname") as HTMLInputElement;
    var tlfCampo = document.getElementById("inputAdmTlf") as HTMLInputElement;

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

    if (camposCorrectos == 4) {
      this.peticionHttpActualizarAdm(nameCampo?.value, surnameCampo?.value, emailCampo?.value, tlfCampo?.value);
    }else{
      this.avisos = [{ severity: 'error', summary: '', detail: "Revisa los campos"}];
    }

  }

  peticionHttpActualizarAdm(name:string, surname:string, email:string, tlf:string){
    const headers = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    };
    const body = {
      "email": email,
      "name": name,
      "surname": surname,
      "tlf": tlf,
      "emailAcceso": window.sessionStorage.getItem('email'),
      "pwdAcceso": window.sessionStorage.getItem('pwd')
    };

    const url = 'http://localhost:8080/user/updateAdmin';
    this.http.post(url, body, { headers, responseType: 'text' }).subscribe({
      next: data => {
        if (data.includes("Error: el administrador suministrado no existe")) {
          this.avisos = [{ severity: 'error', summary: '', detail: data}];
          
        }else{
          this.avisos = [{ severity: 'success', summary: '', detail: "Administrador actualizado correctamente"}];
          this.peticionGetAdminsHttp();       
        }
      },
      error: error => {
        this.avisos = [{ severity: 'warn', summary: '', detail: "Ha ocurrido un error"}];
        setTimeout(() => { this.router.navigate(['/inicio']) }, 2500);
      }
    });
  }

  //***********************************************************************
  //***********************CRUD OPERATIONS USER***************************
  //***********************************************************************

  registroUsuario(){

    var camposCorrectos = 0;
    var supervisorActivo = 'false';
    
    var nameCampo = document.getElementById("inputAdmNewUsName") as HTMLInputElement;
    var surnameCampo = document.getElementById("inputAdmNewUsSurname") as HTMLInputElement;
    var emailCampo = document.getElementById("inputAdmNewUsEmail") as HTMLInputElement;
    var pwdCampo = document.getElementById("inputAdmNewUsPwd") as HTMLInputElement;
    var pwd2Campo = document.getElementById("inputAdmNewUsPwd2") as HTMLInputElement;
    var tlfCampo = document.getElementById("inputAdmNewUsTlf") as HTMLInputElement;
    var companyCampo = document.getElementById("inputAdmNewUsCompany") as HTMLInputElement;
    var developTeamCampo = document.getElementById("inputAdmNewUsDevT") as HTMLInputElement;
    var supervisorCampo = document.getElementById("inputAdmNewUsCargo") as HTMLInputElement;

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
      // El checkbox está marcado, se enviará el valor "true"
      var supervisorActivo = 'true';
    }

    if (camposCorrectos == 7) {
      this.peticionHttpRegistroUsuario(nameCampo?.value, surnameCampo?.value, emailCampo?.value, pwdCampo?.value,
        pwd2Campo?.value, tlfCampo?.value, companyCampo?.value, developTeamCampo?.value, supervisorActivo);
    }else{
      this.avisos = [{ severity: 'error', summary: '', detail: "Revisa los campos"}];
    }
  }

  peticionHttpRegistroUsuario(name:string, surname:string, email:string, pwd:string, pwd2:string, tlf:string, company:string, developTeam:string, supervisor:string){
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
      "supervisor": supervisor,
      "emailAcceso": window.sessionStorage.getItem('email'),
      "pwdAcceso": window.sessionStorage.getItem('pwd')
    };

    const url = 'http://localhost:8080/user/register';
    this.http.post(url, body, { headers, responseType: 'text' }).subscribe({
      next: data => {
        if (data.includes("Ya existe un usuario con ese correo")) {
          this.avisos = [{ severity: 'error', summary: '', detail: data}];
        } else {
          this.avisos = [{ severity: 'success', summary: '', detail: "Usuario creado correctamente"}];
          this.peticionGetUsersHttp();
          this.ocultarFormRegistroUser();
        }
      },
      error: error => {
        this.avisos = [{ severity: 'warn', summary: '', detail: "Ha ocurrido un error"}];
        setTimeout(() => { this.router.navigate(['/inicio']) }, 2500);
      }
    });
  }


  eliminarUsuario(){

    var camposCorrectos = 0;

    var emailCampo = document.getElementById("inputAdmUsEmail") as HTMLInputElement;

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

    if (camposCorrectos == 1) {
      this.peticionHttpEliminarUser(emailCampo?.value);
    }else{
      this.avisos = [{ severity: 'error', summary: '', detail: "Revise los campos"}];
    }
  }

  peticionHttpEliminarUser(email:string){
    const headers = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    };
    const body = {
      "email": email,
      "emailAcceso": window.sessionStorage.getItem('email'),
      "pwdAcceso": window.sessionStorage.getItem('pwd')
    };

    const url = 'http://localhost:8080/user/deleteUser';
    this.http.post(url, body, { headers, responseType: 'text' }).subscribe({
      next: data => {
        if (data.includes("Error: el usuario suministrado no existe")) {
          this.avisos = [{ severity: 'error', summary: '', detail: data}];
        
       }else{
        this.avisos = [{ severity: 'success', summary: '', detail: "Usuario eliminado correctamente"}];
        var parametrosUs : string[] = ['inputAdmUsCargo','inputAdmUsEmail','inputAdmUsName','inputAdmUsSurname','inputAdmUsTlf','inputAdmUsCompany','inputAdmUsDevT'];
        var parametrosUsConBtn : string[] = ['btnUpdtUs','btnUpdtUs','inputAdmUsCargo','inputAdmUsEmail','inputAdmUsName','inputAdmUsSurname','inputAdmUsTlf','inputAdmUsCompany','inputAdmUsDevT'];
        this.peticionGetUsersHttp();
        this.funciones.restaurarCamposConSelect(parametrosUs);
        this.funciones.bloquearCamposConSelect(parametrosUsConBtn);
        }
      },
      error: error => {
        this.avisos = [{ severity: 'warn', summary: '', detail: "Ha ocurrido un error"}];
        setTimeout(() => { this.router.navigate(['/inicio']) }, 2500);
      }
    });
  }

  actualizarUsuario(){

    var camposCorrectos = 0;
    var supervisorActivo = 'true';

    var nameCampo = document.getElementById("inputAdmUsName") as HTMLInputElement;
    var surnameCampo = document.getElementById("inputAdmUsSurname") as HTMLInputElement;
    var emailCampo = document.getElementById("inputAdmUsEmail") as HTMLInputElement;
    var tlfCampo = document.getElementById("inputAdmUsTlf") as HTMLInputElement;
    var companyCampo = document.getElementById("inputAdmUsCompany") as HTMLInputElement;
    var developTeamCampo = document.getElementById("inputAdmUsDevT") as HTMLInputElement;
    var supervisorCampo = document.getElementById("inputAdmUsCargo") as HTMLSelectElement;

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

    var supervisorActivo = 'true';

    if (supervisorCampo.value == 'invalid') {
      this.avisos = [{ severity: 'error', summary: '', detail: "Indica si es supervisor o no"}];
    }else if(supervisorCampo.value == 'true'){
      supervisorActivo = 'true';
    }else{
      supervisorActivo = 'false';
    }

    if (camposCorrectos == 7) {
      this.peticionHttpActualizarUser(nameCampo?.value, surnameCampo?.value, emailCampo?.value, tlfCampo?.value, companyCampo?.value, developTeamCampo?.value, supervisorActivo);
    }else{
      this.avisos = [{ severity: 'error', summary: '', detail: "Revise los campos"}];
    }
  }

  peticionHttpActualizarUser(name:string, surname:string, email:string, tlf:string, company:string, developTeam:string, supervisor:string){
    const headers = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    };
    const body = {
      "email": email,
      "name": name,
      "surname": surname,
      "tlf": tlf,
      "company": company,
      "developTeam" : developTeam,
      "supervisor" : supervisor,
      "emailAcceso": window.sessionStorage.getItem('email'),
      "pwdAcceso": window.sessionStorage.getItem('pwd')
    };

    const url = 'http://localhost:8080/user/updateUser';
    this.http.post(url, body, { headers, responseType: 'text' }).subscribe({
      next: data => {
        if (data.includes("Error: el usuario suministrado no existe")) {
          this.avisos = [{ severity: 'error', summary: '', detail: data}];
        }else{
        this.avisos = [{ severity: 'success', summary: '', detail: "Usuario actualizado correctamente"}];
        this.peticionGetUsersHttp();

        }
      },
      error: error => {
        this.avisos = [{ severity: 'warn', summary: '', detail: "Ha ocurrido un error"}];
        setTimeout(() => { this.router.navigate(['/inicio']) }, 2500);
      }
    });
  }

  //***********************************************************************
  //***********************CRUD OPERATIONS ISSUE***************************
  //***********************************************************************
  
  busquedaIssFiltro(){

    var fixed = '';
    var keyWord = '';
    var fecha1 = '';
    var fecha2 = '';

    var issIdcampo = document.getElementById("issIdFilter") as HTMLInputElement;
    var issKeyWordcampo = document.getElementById("issKeyWFilter") as HTMLSelectElement;
    var issFixedcampo = document.getElementById("issFixedFilter") as HTMLSelectElement;
    var fecha1Campo = document.getElementById("fecha1Filter") as HTMLInputElement;
    var fecha2Campo = document.getElementById("fecha2Filter") as HTMLInputElement;

    if(fecha1Campo.value != ''){
      fecha1 = fecha1Campo?.value;
    }else{
      fecha1 = '2023-01-01';
    }

    if(fecha2Campo.value != ''){
      fecha2 = fecha2Campo?.value;
    }else{
      fecha2 = new Date().toISOString().split("T")[0];
    }

    if(issKeyWordcampo.value == 'invalid'){
      keyWord = '';
    }else{
      keyWord = issKeyWordcampo.value; 
    }

    if(issFixedcampo.value == 'invalid'){
      fixed = '';
    }else{
      fixed = issFixedcampo.value; 
    }
  
    this.peticionHttpBusquedaIssue(issIdcampo?.value, keyWord, fixed, fecha1, fecha2);
  }

  peticionHttpBusquedaIssue(issId : string, issKeyWord : string, issFixed : string, fecha1 : string, fecha2 : string){
    const headers = {
      'Content-Type': 'application/json'
    };

    const body = {
      "issFixed": issFixed,
      "issKeyWord": issKeyWord,
      "issId": issId,
      "issDateStart": fecha1,
      "issDateEnd": fecha2,
      "emailAcceso": window.sessionStorage.getItem('email'),
      "pwdAcceso": window.sessionStorage.getItem('pwd')
    }

    const url = 'http://localhost:8080/issue/getIssuesFilter';
    this.http.post(url, body, { headers, responseType: 'text' }).subscribe({
      next: data => {
        this.listaIssuesAdm = [];
        if (data.length == 0) {
          this.avisos = [{ severity: 'info', summary: '', detail: "No hay Issues registradas para esos filtros"}];
        } else {
          var listaIssJSON = data.split(";");
          for (let i = 0; i < listaIssJSON.length; i++) {
            var issAux = new Issue(listaIssJSON[i],i)
            if(issAux.issFixed == 'true'){
              issAux.issFixed = 'Si'
            }else{
              issAux.issFixed = 'No'
            }
            issAux.issKeyWord = this.funciones.traduccionKeyWord(issAux.issKeyWord,1);
            this.listaIssuesAdm.push(issAux)
          }
        }
      }, error: error => {
        this.avisos = [{ severity: 'warn', summary: '', detail: "Ha ocurrido un error"}];
        setTimeout(() => { this.router.navigate(['/inicio']) }, 2500);
      }
    });
  }
 
  registrarIssue(){

    var camposCorrectos = 0;
    var fixed = 'false';

    var issIdCampo = document.getElementById("issAdmNewId") as HTMLInputElement;
    var issKeyWordCampo = document.getElementById("issAdmNewKeyW") as HTMLSelectElement;
    var issFixedCampo = document.getElementById("issAdmNewFixed") as HTMLInputElement;
    var issDescriptCampo = document.getElementById("issAdmNewDescription") as HTMLInputElement;
    var issSolutionCampo = document.getElementById("issAdmNewSolution") as HTMLInputElement;
    var issDevTeamCampo = document.getElementById("issAdmNewDevTeam") as HTMLInputElement;

    var errorIssId = this.funciones.comprobarVacioSombreado(issIdCampo?.value);
    if(errorIssId){
      issIdCampo.style.boxShadow = "0px 0px 6px rgba(255, 0, 0, 1.5)";
    }else{
      var errorFormatoIssId = this.funciones.validarFormatoIssId(issIdCampo?.value);
      if(!errorFormatoIssId){
        issIdCampo.style.boxShadow = "0px 0px 6px rgba(255, 0, 0, 1.5)";
      }else{
        camposCorrectos += 1;
        issIdCampo.style.boxShadow = "none";
      }
    }

    var errorDescript = this.funciones.comprobarVacioSombreado(issDescriptCampo?.value);
    if(errorDescript){
      issDescriptCampo.style.boxShadow = "0px 0px 6px rgba(255, 0, 0, 1.5)";
    }else{
      issDescriptCampo.style.boxShadow = "none";
      camposCorrectos += 1;
    }

    if (issFixedCampo.checked) {
      fixed = 'true';
      var errorSolution = this.funciones.comprobarVacioSombreado(issSolutionCampo?.value);
      if(errorSolution){
        issSolutionCampo.style.boxShadow = "0px 0px 6px rgba(255, 0, 0, 1.5)";
      }else{
        camposCorrectos += 1;
        issSolutionCampo.style.boxShadow = "none";
      }
    }else{
      camposCorrectos += 1;
    }

    if (issKeyWordCampo.value == 'invalid') {
      issKeyWordCampo.style.boxShadow = "0px 0px 6px rgba(255, 0, 0, 1.5)";
    }else{
      camposCorrectos += 1;
      issKeyWordCampo.style.boxShadow = "none";
    }

    var errorDevTeam = this.funciones.comprobarVacioSombreado(issDevTeamCampo?.value);
    if(errorDevTeam){
      issDevTeamCampo.style.boxShadow = "0px 0px 6px rgba(255, 0, 0, 1.5)";
    }else{
      issDevTeamCampo.style.boxShadow = "none";
      camposCorrectos += 1;
    }
    
    if (camposCorrectos == 5) {
      this.peticionHttpRegistrarIssue(issIdCampo?.value, issKeyWordCampo?.value, issDescriptCampo?.value, fixed , issSolutionCampo?.value, issDevTeamCampo?.value);
    }else{
      this.avisos = [{ severity: 'error', summary: '', detail: "Revisa los campos"}];
    }
  }

  peticionHttpRegistrarIssue(issId: string, issKeyWord:string, issDescription:string,  issFixed:string , issSolution:string, issDevTeam : string){
    
    var fechaUltCambio = '';
    fechaUltCambio = new Date().toISOString().split("T")[0];

    const headers = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    };
    const body = {
      "issId": issId,
      "issKeyWord": issKeyWord,
      "issDescription": issDescription,
      "issFixed": issFixed,
      "issSolution": issSolution,
      "issDevTeam": issDevTeam,
      "issLastModif": fechaUltCambio,
      "emailAcceso": window.sessionStorage.getItem('email'),
      "pwdAcceso": window.sessionStorage.getItem('pwd')
    };

    const url = 'http://localhost:8080/issue/registerIssueAdm';
    this.http.post(url, body, { headers, responseType: 'text' }).subscribe({
      next: data => {
        if (data.includes("Ya existe una Issue con ese ID")) {
          this.avisos = [{ severity: 'error', summary: '', detail: data}];
          
        }else if(data.includes("errorDevTeamUser")){
          this.avisos = [{ severity: 'error', summary: '', detail: "El IssId y el equipo de desarrollo de la Issue deben ser el mismo"}];

        }else {
          this.avisos = [{ severity: 'success', summary: '', detail: "Issue registrada correctamente"}];
          this.peticionGetIssuesHttp();
          this.ocultarFormRegistroIssue();
        }
      },
      error: error => {
        this.avisos = [{ severity: 'warn', summary: '', detail: "Ha ocurrido un error"}];
        setTimeout(() => { this.router.navigate(['/inicio']) }, 2500);
      }
    });
  }

  actualizarIssue(){

    var camposCorrectos = 0;

    var issIdCampo = document.getElementById("inputIssId") as HTMLInputElement;
    var issSelectCampo = document.getElementById("issKeyWSelect") as HTMLSelectElement;
    var issFixedCampo = document.getElementById("issFixedSelect") as HTMLSelectElement;
    var issDescriptCampo = document.getElementById("inputIssDescrp") as HTMLInputElement;
    var issSolutionCampo = document.getElementById("inputIssSolut") as HTMLInputElement;

    var errorIssId = this.funciones.comprobarVacioSombreado(issIdCampo?.value);
    if(errorIssId){
      issIdCampo.style.boxShadow = "0px 0px 6px rgba(255, 0, 0, 1.5)";
    }else{
      var errorFormatoIssId = this.funciones.validarFormatoIssId(issIdCampo?.value);
      if(!errorFormatoIssId){
        issIdCampo.style.boxShadow = "0px 0px 6px rgba(255, 0, 0, 1.5)";
      }else{
        camposCorrectos += 1;
        issIdCampo.style.boxShadow = "none";
      }
    }

    var errorDescript = this.funciones.comprobarVacioSombreado(issDescriptCampo?.value);
    if(errorDescript){
      issDescriptCampo.style.boxShadow = "0px 0px 6px rgba(255, 0, 0, 1.5)";
    }else{
      issDescriptCampo.style.boxShadow = "none";
      camposCorrectos += 1;
    }

    if (issFixedCampo.value == 'invalid') {
      this.avisos = [{ severity: 'error', summary: '', detail: "Indica si la Issue esta solucionada o no"}];
    }else if (issFixedCampo.value == 'true'){
      camposCorrectos += 1;
      var errorSolution = this.funciones.comprobarVacioSombreado(issSolutionCampo?.value);
      if(errorSolution){
        issSolutionCampo.style.boxShadow = "0px 0px 6px rgba(255, 0, 0, 1.5)";
      }else{
        camposCorrectos += 1;
        issSolutionCampo.style.boxShadow = "none";
      }
    }else{
      camposCorrectos += 1;
    }

    if (issSelectCampo.value == 'invalid') {
      this.avisos = [{ severity: 'error', summary: '', detail: "Indica una clave para la Issue"}];
    }else{
      camposCorrectos += 1;
    }

    if (camposCorrectos == 5) {
      this.peticionHttpActualizarIssue(issIdCampo?.value, issSelectCampo?.value, issDescriptCampo?.value, issFixedCampo?.value , issSolutionCampo?.value);
    }else{
      this.avisos = [{ severity: 'error', summary: '', detail: "Revise los campos"}];
    }
  }

  peticionHttpActualizarIssue(issId: string, issKeyWord:string, issDescription:string,  issFixed:string, issSolution:string){
    
    var fechaUltCambio = '';
    fechaUltCambio = new Date().toISOString().split("T")[0];

    const headers = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    };
    const body = {
      "issId": issId,
      "issKeyWord": issKeyWord,
      "issDescription": issDescription,
      "issFixed": issFixed,
      "issSolution": issSolution,
      "issLastModif": fechaUltCambio,
      "emailAcceso": window.sessionStorage.getItem('email'),
      "pwdAcceso": window.sessionStorage.getItem('pwd')
    };

    const url = 'http://localhost:8080/issue/updateIssue';
    this.http.post(url, body, { headers, responseType: 'text' }).subscribe({
      next: data => {
        if (data.includes("Issue actualizada correctamente")) {

          this.avisos = [{ severity: 'error', summary: '', detail: data}];
          

        } else {
          this.avisos = [{ severity: 'success', summary: '', detail: data}];
          this.peticionGetIssuesHttp();
        }
      },
      error: error => {
        this.avisos = [{ severity: 'warn', summary: '', detail: "Ha ocurrido un error"}];
        setTimeout(() => { this.router.navigate(['/inicio']) }, 2500);
      }
    });
  }

  eliminarIssue(){

    var camposCorrectos = 0;

    var issIdCampo = document.getElementById("inputIssId") as HTMLInputElement;

    var errorEmail = this.funciones.comprobarVacioSombreado(issIdCampo?.value);
    if(errorEmail){
      issIdCampo.style.boxShadow = "0px 0px 6px rgba(255, 0, 0, 1.5)";
    }else{
      if (!this.funciones.validarFormatoIssId(issIdCampo?.value)) {
        issIdCampo.style.boxShadow = "0px 0px 6px rgba(255, 0, 0, 1.5)";
      } else {
        issIdCampo.style.boxShadow = "none";
        camposCorrectos+=1;
      }
    }

    if (camposCorrectos == 1) {
      this.peticionHttpEliminarIssue(issIdCampo?.value);
    }else{
      this.avisos = [{ severity: 'error', summary: '', detail: "Revise los campos"}];
    }
  }

  peticionHttpEliminarIssue(issId:string){
    const headers = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    };
    const body = {
      "issId": issId,
      "emailAcceso": window.sessionStorage.getItem('email'),
      "pwdAcceso": window.sessionStorage.getItem('pwd')
    };

    const url = 'http://localhost:8080/issue/deleteIssue';
    this.http.post(url, body, { headers, responseType: 'text' }).subscribe({
      next: data => {
        if (data.includes("Error: el ID de Issue suministrado no existe")) {
          this.avisos = [{ severity: 'error', summary: '', detail: data}];

        }else{
          this.avisos = [{ severity: 'success', summary: '', detail: data}];
          var parametrosIssue : string[] = ['issFixedSelect','issKeyWSelect','inputIssId','inputIssDescrp','inputIssSolut'];
          var parametrosIssueConBtn : string[] = ['btnUpdtIssue','btnUpdtIssue','issFixedSelect','issKeyWSelect','inputIssId','inputIssDescrp','inputIssSolut', ];
          this.peticionGetIssuesHttp();
          this.funciones.restaurarCamposConSelect(parametrosIssue);
          this.funciones.bloquearCamposConSelect(parametrosIssueConBtn);

        }
      },
      error: error => {
        this.avisos = [{ severity: 'warn', summary: '', detail: "Ha ocurrido un error"}];
        setTimeout(() => { this.router.navigate(['/inicio']) }, 2500);
      }
    });
  }


  //***********************************************************************
  //***********************CRUD OPERATIONS MEETING*************************
  //***********************************************************************


  busquedaMeetFiltro(){

    var fecha1 = '';
    var fecha2 = '';
    var meetId = '';

    var fecha1Campo = document.getElementById("fecha1Filter") as HTMLInputElement;
    var fecha2Campo = document.getElementById("fecha2Filter") as HTMLInputElement;
    var meetIdCampo = document.getElementById("meetIdFilter") as HTMLInputElement;

    if(fecha1Campo.value != ''){
      fecha1 = fecha1Campo?.value;
    }else{
      fecha1 = '2023-01-01';
    }

    if(fecha2Campo.value != ''){
      fecha2 = fecha2Campo?.value;
    }else{
      fecha2 = new Date().toISOString().split("T")[0];
    }

    if(meetIdCampo.value != ''){
      meetId = meetIdCampo?.value;
    }

    this.peticionHttpBusquedaMeet(fecha1, fecha2, meetId);
  }

  peticionHttpBusquedaMeet(fecha1 : string, fecha2 : string, meetId : string){
    const headers = {
      'Content-Type': 'application/json'
    };

    const body = {
      "meetDateStart": fecha1,
      "meetDateEnd": fecha2,
      "meetId": meetId,
      "emailAcceso": window.sessionStorage.getItem('email'),
      "pwdAcceso": window.sessionStorage.getItem('pwd')
    }

    const url = 'http://localhost:8080/meeting/getMeetingsFilter';
    this.http.post(url, body, { headers, responseType: 'text' }).subscribe({
      next: data => {
        this.listaReunionesAdm = [];
        if (data.length == 0) {
      this.avisos = [{ severity: 'info', summary: '', detail: "No hay reuniones registradas para esos filtros"}];
        } else {
          var listaMeetJSON = data.split(";");
          for (let i = 0; i < listaMeetJSON.length; i++) {
            var meetAux = new Meeting(listaMeetJSON[i],i)
            this.listaReunionesAdm.push(meetAux)
          }
        }

      }, error: error => {
        this.avisos = [{ severity: 'warn', summary: '', detail: "Ha ocurrido un error"}];
        setTimeout(() => { this.router.navigate(['/inicio']) }, 2500);
      }
    });

  }

  registrarMeeting(){

    var camposCorrectos = 0;
    
    var meetIdCampo = document.getElementById("meetNewId") as HTMLInputElement;
    var meetDateCampo = document.getElementById("meetNewDate") as HTMLInputElement;
    var meetCompanyCampo = document.getElementById("meetNewCompany") as HTMLInputElement;
    var meetStageCampo = document.getElementById("meetNewStage") as HTMLInputElement;
    var meetDevTeamCampo = document.getElementById("meetNewDevT") as HTMLInputElement;

    var errorId = this.funciones.comprobarVacioSombreado(meetIdCampo?.value);
    if(errorId){
      meetIdCampo.style.boxShadow = "0px 0px 6px rgba(255, 0, 0, 1.5)";
    }else{
      if (!this.funciones.validarFormatoMeetId(meetIdCampo?.value)) {
        meetIdCampo.style.boxShadow = "0px 0px 6px rgba(255, 0, 0, 1.5)";
      } else {
        meetIdCampo.style.boxShadow = "none";
        camposCorrectos+=1;
      }

    }
    var errorDate = this.funciones.comprobarVacioSombreado(meetDateCampo?.value);
    if(errorDate){
      meetDateCampo.style.boxShadow = "0px 0px 6px rgba(255, 0, 0, 1.5)";
    }else{
      meetDateCampo.style.boxShadow = "none";
      camposCorrectos+=1;
    }

    var errorCompany = this.funciones.comprobarVacioSombreado(meetCompanyCampo?.value);
    if(errorCompany){
      meetCompanyCampo.style.boxShadow = "0px 0px 6px rgba(255, 0, 0, 1.5)";
    }else{
      meetCompanyCampo.style.boxShadow = "none";
      camposCorrectos+=1;
    }

    var errorStage = this.funciones.comprobarVacioSombreado(meetStageCampo?.value);
    if(errorStage){
      meetStageCampo.style.boxShadow = "0px 0px 6px rgba(255, 0, 0, 1.5)";
    }else{
      meetStageCampo.style.boxShadow = "none";
      camposCorrectos+=1;
    }

    var errorDevTeam = this.funciones.comprobarVacioSombreado(meetDevTeamCampo?.value);
    if(errorDevTeam){
      meetDevTeamCampo.style.boxShadow = "0px 0px 6px rgba(255, 0, 0, 1.5)";
    }else{
      meetDevTeamCampo.style.boxShadow = "none";
      camposCorrectos+=1;
    }

    if (camposCorrectos == 5) {
      this.peticionHttpRegistroMeet(meetIdCampo?.value, meetDateCampo?.value, meetCompanyCampo?.value, meetStageCampo?.value, meetDevTeamCampo?.value);
    }else{
        this.avisos = [{ severity: 'error', summary: '', detail: "Revisa los campos"}];
    }
  }

  peticionHttpRegistroMeet(meetId:string, meetDate:string, meetCompany:string, meetStage:string, meetDevTeam:string){
   
    const headers = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    };
    const body = {
      "meetId": meetId,
      "meetDate": meetDate,
      "meetCompany": meetCompany,
      "meetDevelopTeam": meetDevTeam,
      "meetStage": meetStage,
      "emailAcceso": window.sessionStorage.getItem('email'),
      "pwdAcceso": window.sessionStorage.getItem('pwd')
    };

    const url = 'http://localhost:8080/meeting/registerMeeting';
    this.http.post(url, body, { headers, responseType: 'text' }).subscribe({
      next: data => {
        if (data.includes("Error en el registro de la reunion")) {
          this.avisos = [{ severity: 'warn', summary: '', detail: data}];
        }else{

          this.avisos = [{ severity: 'success', summary: '', detail: "Reunión registrada correctamente"}];
          this.peticionGetMeetingsHttp();
          this.ocultarFormRegistroMeeting();
        }
      },
      error: error => {
        this.avisos = [{ severity: 'warn', summary: '', detail: "Ha ocurrido un error al registrar la reunión"}];
        //setTimeout(() => { this.router.navigate(['/inicio']) }, 2500);
      }
    });
  }

  eliminarMeeting(){

    var camposCorrectos = 0;

    var meetIdCampo = document.getElementById("inputMeetId") as HTMLInputElement;

    var errorId = this.funciones.comprobarVacioSombreado(meetIdCampo?.value);
    if(errorId){
      meetIdCampo.style.boxShadow = "0px 0px 6px rgba(255, 0, 0, 1.5)";
    }else{
      if (!this.funciones.validarFormatoMeetId(meetIdCampo?.value)) {
        meetIdCampo.style.boxShadow = "0px 0px 6px rgba(255, 0, 0, 1.5)";
      } else {
        meetIdCampo.style.boxShadow = "none";
        camposCorrectos+=1;
      }

    }

    if (camposCorrectos == 1) {
      this.peticionHttpEliminarMeet(meetIdCampo?.value);
    }else{
      this.avisos = [{ severity: 'error', summary: '', detail: 'Revisa los campos'}];
    }
  }

  peticionHttpEliminarMeet(meetId:string){
    const headers = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    };
    const body = {
      "meetId": meetId,
      "emailAcceso": window.sessionStorage.getItem('email'),
      "pwdAcceso": window.sessionStorage.getItem('pwd')
    };

    const url = 'http://localhost:8080/meeting/deleteMeeting';
    this.http.post(url, body, { headers, responseType: 'text' }).subscribe({
      next: data => {
        if (data.includes("Error: el ID de reunion suministrado no existe")) {
          this.avisos = [{ severity: 'error', summary: '', detail: data}];
        }else{
          this.avisos = [{ severity: 'success', summary: '', detail: 'Reunión eliminada correctamente'}];
         
          var parametrosMeet : string[] = ['inputMeetId','inputMeetDate','inputMeetCompany','inputMeetDevT','inputMeetStage'];
          var parametrosMeetConBtn : string[] = ['btnUpdtMeet','btnUpdtMeet','inputMeetId','inputMeetDate','inputMeetCompany','inputMeetDevT','inputMeetStage'];
          this.peticionGetMeetingsHttp();
          this.funciones.restaurarCampos(parametrosMeet);
          this.funciones.bloquearCampos(parametrosMeetConBtn);
        }
      },
      error: error => {
        this.avisos = [{ severity: 'warn', summary: '', detail: "Ha ocurrido un error al eliminar la reunión"}];
        //setTimeout(() => { this.router.navigate(['/inicio']) }, 2500);
      }
    });
  }

  actualizarMeeting(){

    var camposCorrectos = 0;

    var meetIdCampo = document.getElementById("inputMeetId") as HTMLInputElement;
    var meetDateCampo = document.getElementById("inputMeetDate") as HTMLInputElement;
    var meetCompanyCampo = document.getElementById("inputMeetCompany") as HTMLInputElement;
    var meetStageCampo = document.getElementById("inputMeetStage") as HTMLInputElement;
    var meetDevTeamCampo = document.getElementById("inputMeetDevT") as HTMLInputElement;

    var errorId = this.funciones.comprobarVacioSombreado(meetIdCampo?.value);
    if(errorId){
      meetIdCampo.style.boxShadow = "0px 0px 6px rgba(255, 0, 0, 1.5)";
    }else{
      if (!this.funciones.validarFormatoMeetId(meetIdCampo?.value)) {
        meetIdCampo.style.boxShadow = "0px 0px 6px rgba(255, 0, 0, 1.5)";
      } else {
        meetIdCampo.style.boxShadow = "none";
        camposCorrectos+=1;
      }

    }
    var errorDate = this.funciones.comprobarVacioSombreado(meetDateCampo?.value);
    if(errorDate){
      meetDateCampo.style.boxShadow = "0px 0px 6px rgba(255, 0, 0, 1.5)";
    }else{
      meetDateCampo.style.boxShadow = "none";
      camposCorrectos+=1;
    }

    var errorCompany = this.funciones.comprobarVacioSombreado(meetCompanyCampo?.value);
    if(errorCompany){
      meetCompanyCampo.style.boxShadow = "0px 0px 6px rgba(255, 0, 0, 1.5)";
    }else{
      meetCompanyCampo.style.boxShadow = "none";
      camposCorrectos+=1;
    }

    var errorStage = this.funciones.comprobarVacioSombreado(meetStageCampo?.value);
    if(errorStage){
      meetStageCampo.style.boxShadow = "0px 0px 6px rgba(255, 0, 0, 1.5)";
    }else{
      meetStageCampo.style.boxShadow = "none";
      camposCorrectos+=1;
    }

    var errorDevTeam = this.funciones.comprobarVacioSombreado(meetDevTeamCampo?.value);
    if(errorDevTeam){
      meetDevTeamCampo.style.boxShadow = "0px 0px 6px rgba(255, 0, 0, 1.5)";
    }else{
      meetDevTeamCampo.style.boxShadow = "none";
      camposCorrectos+=1;
    }

    if (camposCorrectos == 5) {
      this.peticionHttpActualizarMeet(meetIdCampo?.value, meetDateCampo?.value, meetCompanyCampo?.value, meetStageCampo?.value, meetDevTeamCampo?.value);
    }else{
        this.avisos = [{ severity: 'error', summary: '', detail: "Revisa los campos"}];
    }
  }

  peticionHttpActualizarMeet(meetId:string, meetDate:string, meetCompany:string, meetStage:string, meetDevTeam:string){
    const headers = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    };
    const body = {
      "meetId": meetId,
      "meetDate": meetDate,
      "meetCompany": meetCompany,
      "meetDevelopTeam": meetDevTeam,
      "meetStage": meetStage,
      "emailAcceso": window.sessionStorage.getItem('email'),
      "pwdAcceso": window.sessionStorage.getItem('pwd')
    };

    const url = 'http://localhost:8080/meeting/updateMeeting';
    this.http.post(url, body, { headers, responseType: 'text' }).subscribe({
      next: data => {
        if (data.includes("Error: el ID de reunion suministrado no existe")) {
          this.avisos = [{ severity: 'warn', summary: '', detail: data}];
        }else{

          this.avisos = [{ severity: 'success', summary: '', detail: "Reunión actualizada correctamente"}];
          this.peticionGetMeetingsHttp();
        }
      },
      error: error => {
        this.avisos = [{ severity: 'warn', summary: '', detail: "Ha ocurrido un error al actualizar la reunión"}];
        //setTimeout(() => { this.router.navigate(['/inicio']) }, 2500);
      }
    });
  }

  //***********************************************************************
  //***************************ELEMENTOS LISTAS****************************
  //***********************************************************************

  onSelectAdmins(element:Admin) {

    var parametrosAdmConBtn : string[] = ['btnUpdtAdm','btnUpdtAdm','inputAdmEmail','inputAdmName','inputAdmSurname','inputAdmTlf'];
    var parametrosAdm : string[] = ['inputAdmEmail','inputAdmName','inputAdmSurname','inputAdmTlf'];

    this.funciones.restaurarCampos(parametrosAdm);
    this.funciones.bloquearCampos(parametrosAdmConBtn);
    this.funciones.asignarValorID(parametrosAdm[0], element.admEmail);
    this.funciones.asignarValorID(parametrosAdm[1], element.admName);
    this.funciones.asignarValorID(parametrosAdm[2], element.admSurname);
    this.funciones.asignarValorID(parametrosAdm[3], element.admTlf);
  }

  onSelectUsers(element:User) {

    var parametrosUs : string[] = ['inputAdmUsEmail','inputAdmUsName','inputAdmUsSurname','inputAdmUsTlf','inputAdmUsCompany','inputAdmUsDevT'];
    var parametrosUsConBtn : string[] = ['btnUpdtUs','btnUpdtUs','inputAdmUsCargo','inputAdmUsEmail','inputAdmUsName','inputAdmUsSurname','inputAdmUsTlf','inputAdmUsCompany','inputAdmUsDevT'];

    this.funciones.restaurarCamposConSelect(parametrosUs);
    this.funciones.bloquearCamposConSelect(parametrosUsConBtn);
    this.funciones.asignarValorID(parametrosUs[0], element.userEmail);
    this.funciones.asignarValorID(parametrosUs[1], element.userName);
    this.funciones.asignarValorID(parametrosUs[2], element.userSurname);
    this.funciones.asignarValorID(parametrosUs[3], element.userTlf);
    if(element.userSupervisor == true){
      var cargo = document.getElementById("inputAdmUsCargo") as HTMLSelectElement;
      cargo.value = "true";
      //Mostrar boton contacto supervisor
    }else if(element.userSupervisor == false){
      var cargo = document.getElementById("inputAdmUsCargo") as HTMLSelectElement;
      cargo.value = "false";
    }
    this.funciones.asignarValorID(parametrosUs[4], element.userCompany);
    this.funciones.asignarValorID(parametrosUs[5], element.userDevT);
  }

  onSelectIssues(element:Issue) {

    var parametrosIssue : string[] = ['issFixedSelect','issKeyWSelect','inputIssId','inputIssDescrp','inputIssSolut'];
    var parametrosIssueConBtn : string[] = ['btnUpdtIssue','btnUpdtIssue','issFixedSelect','issKeyWSelect','inputIssId','inputIssDescrp','inputIssSolut' ];

    this.funciones.restaurarCamposConSelect(parametrosIssue);
    this.funciones.bloquearCamposConSelect(parametrosIssueConBtn);
    this.funciones.asignarValorID(parametrosIssue[2], element.issId);
    this.funciones.asignarValorID(parametrosIssue[3],element.issDescription);

    var keyWord = document.getElementById("issKeyWSelect") as HTMLSelectElement;
    keyWord.value = this.funciones.traduccionKeyWord(element.issKeyWord, 2);

    if(element.issFixed === "Si"){
      var fixed = document.getElementById("issFixedSelect") as HTMLSelectElement;
      fixed.value = "true";
    }else if(element.issFixed === "No"){
      var fixed = document.getElementById("issFixedSelect") as HTMLSelectElement;
      fixed.value = "false";
    }

    if(element.issSolution == 'No solution yet'){
      this.funciones.asignarValorID(parametrosIssue[4], 'Sin solución encontrada');
    }else{
      this.funciones.asignarValorID(parametrosIssue[4], element.issSolution);
    }
    //this.mostrarFormInfo();
  }

  onSelectMeetings(element: Meeting) {

    var parametrosMeet : string[] = ['inputMeetId','inputMeetDate','inputMeetCompany','inputMeetDevT','inputMeetStage'];
    var parametrosMeetConBtn : string[] = ['btnUpdtMeet','btnUpdtMeet','inputMeetId','inputMeetDate','inputMeetCompany','inputMeetDevT','inputMeetStage'];

    this.funciones.restaurarCampos(parametrosMeet);
    this.funciones.bloquearCampos(parametrosMeetConBtn);
    this.funciones.asignarValorID(parametrosMeet[0], element.meetId);
    this.funciones.asignarValorID(parametrosMeet[1], element.meetDate);
    this.funciones.asignarValorID(parametrosMeet[2], element.meetCompany);
    this.funciones.asignarValorID(parametrosMeet[3], element.meetDevelopTeam);
    this.funciones.asignarValorID(parametrosMeet[4], element.meetStage);
  }

  //***********************************************************************
  //***********************************************************************
  //***********************FUNCIONES AUXILIARES****************************
  //***********************************************************************
  //***********************************************************************

  //***********************************************************************
  //***********************FUNCIONES ADMINISTRADOR*************************
  //***********************************************************************

  mostrarFormRegistroAdmin(): void {
    var formularioR = document.getElementById("divFormularioRegAdmin") as HTMLDivElement;
    var fondoR = document.getElementById("fondoRegistro") as HTMLDivElement;
    
    if (formularioR && fondoR) {
      formularioR.style.display = "block";
      fondoR.style.display = "block";
    }
  }

  ocultarFormRegistroAdmin(): void{
    var parametrosAdm : string[] = ["admNewEmail","admNewName","admNewSurname","admNewPwd","admNewPwd2","admNewTlf"]
    var formularioRAdm = document.getElementById("divFormularioRegAdmin") as HTMLDivElement;
    var fondoR = document.getElementById("fondoRegistro") as HTMLDivElement;
    if (formularioRAdm && fondoR) {
      formularioRAdm.style.display = "none";
      fondoR.style.display = "none";
    }
    this.funciones.restaurarCampos(parametrosAdm);
  }

  editarAdmin(){

    var parametrosAdmConBtn:string[] = ['btnUpdtAdm','btnUpdtAdm','inputAdmEmail','inputAdmName','inputAdmSurname','inputAdmTlf'];
    var admIdComprobar = document.getElementById("inputAdmEmail") as HTMLInputElement;
    var btnComprobar = document.getElementById("btnUpdtAdm") as HTMLInputElement;

    if(!(admIdComprobar.value == '')){
      if(btnComprobar.disabled == true){
        this.funciones.editarCampos(parametrosAdmConBtn);
      }else{
        this.funciones.bloquearCampos(parametrosAdmConBtn);
      }
    }
  }

  //***********************************************************************
  //***********************FUNCIONES USUARIO*******************************
  //***********************************************************************

  mostrarFormRegistroUser(): void {
    var formularioR = document.getElementById("divFormularioRegUsAdm") as HTMLDivElement;
    var fondoR = document.getElementById("fondoRegistro") as HTMLDivElement;
    
    if (formularioR && fondoR) {
      formularioR.style.display = "block";
      fondoR.style.display = "block";
    }
  }

  ocultarFormRegistroUser(){
    var parametrosRegUs : string[] = ["inputAdmNewUsEmail","inputAdmNewUsName","inputAdmNewUsSurname","inputAdmNewUsTlf","inputAdmNewUsPwd","inputAdmNewUsPwd2", "inputAdmNewUsCompany", "inputAdmNewUsDevT", "inputAdmNewUsCargo"]
    var formularioRegUs = document.getElementById("divFormularioRegUsAdm") as HTMLDivElement;
    var fondoR = document.getElementById("fondoRegistro") as HTMLDivElement;
    var formRegUs1 = document.getElementById("div1") as HTMLDivElement;
    var formRegUs2 = document.getElementById("div2") as HTMLDivElement;
    var formRegUs3 = document.getElementById("div3") as HTMLDivElement;

    formRegUs1.style.display = "block";
    formRegUs2.style.display = "none";
    formRegUs3.style.display = "none";

    if (formularioRegUs && fondoR) {
      formularioRegUs.style.display = "none";
      fondoR.style.display = "none";
    }
    this.funciones.restaurarCampos(parametrosRegUs);
  }

  editarUser(){

    var parametrosUsConBtn : string[] = ['btnUpdtUs','btnUpdtUs','inputAdmUsCargo','inputAdmUsEmail','inputAdmUsName','inputAdmUsSurname','inputAdmUsTlf','inputAdmUsCompany','inputAdmUsDevT'];
    var usIdComprobar = document.getElementById("inputAdmUsEmail") as HTMLInputElement;
    var btnComprobar = document.getElementById("btnUpdtUs") as HTMLInputElement;

    if(!(usIdComprobar.value == '')){
      if(btnComprobar.disabled == true){
        this.funciones.editarCamposConSelect(parametrosUsConBtn);
      }else{
        this.funciones.bloquearCamposConSelect(parametrosUsConBtn);
      }
    }
  }

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


  //***********************************************************************
  //***********************FUNCIONES ISSUE*******************************
  //***********************************************************************

  mostrarFormRegistroIssue(): void {
    var regMeetCampos: string[] = [];
    var formularioR = document.getElementById("divFormularioRegistroIssue") as HTMLDivElement;
    var fondoR = document.getElementById("fondoRegistro") as HTMLDivElement;
    
    if (formularioR && fondoR) {
      formularioR.style.display = "block";
      fondoR.style.display = "block";
    }
  }

  ocultarFormRegistroIssue(): void {
    var parametrosIssue : string[] = ['issAdmNewKeyW','issAdmNewKeyW','issAdmNewId','issAdmNewFixed','issAdmNewDescription','issAdmNewSolution','issAdmNewDevTeam'];
    var formularioR = document.getElementById("divFormularioRegistroIssue") as HTMLDivElement;
    var fondoR = document.getElementById("fondoRegistro") as HTMLDivElement;
    if (formularioR && fondoR) {
      formularioR.style.display = "none";
      fondoR.style.display = "none";
    }
    var issFixedCampo = document.getElementById("issAdmNewFixed") as HTMLInputElement;
    issFixedCampo.checked = false; 
    this.funciones.restaurarCamposConSelect(parametrosIssue);
  }

  editarIssue(){
    var parametrosIssue : string[] = ['btnUpdtIssue','btnUpdtIssue','issFixedSelect','issKeyWSelect','inputIssId','inputIssDescrp','inputIssSolut', ];
    var issIdComprobar = document.getElementById("inputIssId") as HTMLInputElement;
    var btnComprobar = document.getElementById("btnUpdtIssue") as HTMLInputElement;
    if(!(issIdComprobar.value == '')){
      if(btnComprobar.disabled == true){
        this.funciones.editarCamposConSelect(parametrosIssue);
      }else{
      this.funciones.bloquearCamposConSelect(parametrosIssue);
      }
    }
  }

  resetFiltrosIssue(): void{
    var filtrosMeet : string[] = ['issIdFilter','issKeyWFilter','issFixedFilter','fecha1Filter','fecha2Filter'];
      this.funciones.resetFiltrosBusqueda(filtrosMeet);
    
    var keyWCampo = document.getElementById('issKeyWFilter') as HTMLSelectElement;
    var fixedCampo = document.getElementById('issFixedFilter') as HTMLSelectElement;

    keyWCampo.value = 'invalid';
    fixedCampo.value = 'invalid';


  }

  //***********************************************************************
  //***********************FUNCIONES MEETING*******************************
  //***********************************************************************

  mostrarFormRegistroMeeting(): void {
    var formularioR = document.getElementById("divFormularioMeeting") as HTMLDivElement;
    var fondoR = document.getElementById("fondoRegistro") as HTMLDivElement;
    
    if (formularioR && fondoR) {
      formularioR.style.display = "block";
      fondoR.style.display = "block";
    }
  }

  ocultarFormRegistroMeeting(): void {
    var parametrosMeet : string[] = ['meetNewId','meetNewDate','meetNewCompany','meetNewStage','meetNewDevT'];
    var formularioR = document.getElementById("divFormularioMeeting") as HTMLDivElement;
    var fondoR = document.getElementById("fondoRegistro") as HTMLDivElement;
    if (formularioR && fondoR) {
      formularioR.style.display = "none";
      fondoR.style.display = "none";
    }
    this.funciones.restaurarCampos(parametrosMeet);
  }

  editarMeeting(): void{
    var parametrosMeetConBtn : string[] = ['btnUpdtMeet','btnUpdtMeet','inputMeetId','inputMeetDate','inputMeetCompany','inputMeetDevT','inputMeetStage'];
    var meetIdComprobar = document.getElementById("inputMeetId") as HTMLInputElement;
    var btnComprobar = document.getElementById("btnUpdtMeet") as HTMLInputElement;

    if(!(meetIdComprobar.value == '')){
      if(btnComprobar.disabled == true){
        this.funciones.editarCampos(parametrosMeetConBtn);
      }else{
        this.funciones.bloquearCampos(parametrosMeetConBtn);
      }
    }
  }

  resetFiltrosMeet(): void{
    var filtrosMeet : string[] = ['meetIdFilter','fecha1Filter','fecha2Filter'];
      this.funciones.resetFiltrosBusqueda(filtrosMeet);
  }

}
