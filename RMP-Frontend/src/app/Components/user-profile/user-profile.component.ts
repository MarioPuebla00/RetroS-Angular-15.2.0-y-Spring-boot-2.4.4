import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Message, MessageService } from 'primeng/api';
import { Admin } from 'src/app/Entities/Admin';
import { User } from 'src/app/Entities/User';
import { FuncionesBasicasService } from 'src/app/services/funciones-basicas.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  providers: [MessageService]
})
export class UserProfileComponent {
  
  avisos : Message[] = [];
  advertencias : Message[] = [];

  funciones: FuncionesBasicasService;
  
  constructor(private router: Router, private http: HttpClient, private messageService: MessageService, private titleService: Title) {
    this.titleService.setTitle('Mi perfil | RetroS');
    this.funciones = new FuncionesBasicasService();
  }
  
  ngOnInit():void{
    
    this.accesoPermitido();

    var liPestanaAdm = document.getElementById("pestanaAdmin") as HTMLLIElement;
    if(window.sessionStorage.getItem("rol") == 'admin'){
      liPestanaAdm.style.display = "block";
    }else{
     liPestanaAdm.style.display = "none";
    }

  }

  accesoPermitido(){
    
    const headers = {
      'Content-Type': 'application/json'
    };
    
    const body = {
      "emailAcceso": window.sessionStorage.getItem('email'),
      "pwdAcceso": window.sessionStorage.getItem('pwd'),
    };

    var url : string = '';

    if(window.sessionStorage.getItem('rol') == 'user'){
      url = 'http://localhost:8080/user/accesoUser';
    }else if(window.sessionStorage.getItem('rol') == 'admin'){
      url = 'http://localhost:8080/user/accesoAdmin';
    }
    
    if(window.sessionStorage.length == 0){
      this.advertencias = [{ severity: 'warn', summary: '', detail: "No tienes acceso a este servicio. Inicia sesión con credenciales apropiadas"}];
      setTimeout(() => {  this.router.navigate(['/login']) }, 2500);
    }else{
       this.http.post(url, body, { headers, responseType: 'text' }).subscribe({
        next: data => {
          if (data.includes("No tienes acceso a este servicio")) {
            this.advertencias = [{ severity: 'warn', summary: '', detail: "No tienes acceso a este servicio. Inicia sesión con credenciales apropiadas"}];
            setTimeout(() => {  this.router.navigate(['/login']) }, 2500);
          }else{
            var divAdvertencia = document.getElementById("divAdvertencia") as HTMLDivElement;
            divAdvertencia.style.display = "none";
            var divUserMeetings = document.getElementById("divDevTeam") as HTMLDivElement;
            divUserMeetings.style.display = "block" ;
            this.peticionHttpGetUser();
          }
        },error: error => {
          this.advertencias = [{ severity: 'warn', summary: '', detail: "Ha ocurrido un error"}];
          setTimeout(() => { this.router.navigate(['/inicio']) }, 2500);
        }
      });
    }


   
  }
  
  peticionHttpGetUser(){

    const headers = {
      'Content-Type': 'application/json'
    };
    
    const body = {
      "email": window.sessionStorage.getItem('email'),
    }; 

    const url = 'http://localhost:8080/user/getUserId';
    this.http.post(url, body, { headers, responseType: 'text' }).subscribe({
      next: data => {
        if (data.includes("No existe el usuario")) {
          this.advertencias = [{ severity: 'error', summary: '', detail: "No existe el usuario suministrado. Redireccionando a login..."}];
          setTimeout(() => {  this.router.navigate(['/login']) }, 2500);
        }else{
          var divUser = document.getElementById('divUser') as HTMLDivElement;
          var divAdmin = document.getElementById('divAdmin') as HTMLDivElement;
          
          if(window.sessionStorage.getItem('rol') == 'user'){
            var userAux = new User(data,0);
            divUser.style.display="inherit";
            divAdmin.style.display="none";
            this.rellenarCamposUser(userAux);
          }else if(window.sessionStorage.getItem('rol') == 'admin'){
            var adminAux = new Admin(data,0);
            divUser.style.display="none";
            divAdmin.style.display="inherit";
            this.rellenarCamposAdmin(adminAux);
          }
        }
      },error: error => {
        this.advertencias = [{ severity: 'warn', summary: '', detail: "Ha ocurrido un error"}];
        setTimeout(() => { this.router.navigate(['/inicio']) }, 2500);
      }
    });
  }

  rellenarCamposUser(userAux : User){

    
      var parametrosUs : string[] = ['inputAdmUsCargo','inputAdmUsEmail','inputAdmUsName','inputAdmUsSurname','inputAdmUsTlf','inputAdmUsCompany','inputAdmUsDevT'];
      var cargoCampo = document.getElementById(parametrosUs[0]) as HTMLSelectElement;
      if(userAux.userSupervisor === true){
        cargoCampo.value = 'true';
        //Mostrar boton contacto supervisor
      }else if(userAux.userSupervisor === false){
        cargoCampo.value = 'false';
      }

      this.funciones.asignarValorID(parametrosUs[1], userAux.userEmail );
      this.funciones.asignarValorID(parametrosUs[2], userAux.userName );
      this.funciones.asignarValorID(parametrosUs[3], userAux.userSurname );
      this.funciones.asignarValorID(parametrosUs[4], userAux.userTlf );
      this.funciones.asignarValorID(parametrosUs[5], userAux.userCompany );
      this.funciones.asignarValorID(parametrosUs[6], userAux.userDevT);
  }

  rellenarCamposAdmin(admAux : Admin){
    
    var parametrosAdm : string[] = ['inputAdmEmail','inputAdmName','inputAdmSurname','inputAdmTlf'];
    this.funciones.asignarValorID(parametrosAdm[0], admAux.admEmail);
    this.funciones.asignarValorID(parametrosAdm[1], admAux.admName);
    this.funciones.asignarValorID(parametrosAdm[2], admAux.admSurname);
    this.funciones.asignarValorID(parametrosAdm[3], admAux.admTlf);
    
  }

  actualizarUsuario(){

  }

  editar(rol : string){
    
    if(rol == 'user'){

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

    }else if(rol == 'admin'){

      var parametrosAdmConBtn : string[] = ['btnUpdtAdm','btnUpdtAdm','inputAdmEmail','inputAdmName','inputAdmSurname','inputAdmTlf'];
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
  }

  resetPwd(){
    this.router.navigate(['/forgotPwd'])  
  }
}