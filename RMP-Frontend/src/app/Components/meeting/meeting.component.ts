import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Message } from 'primeng/api';
import { Meeting } from 'src/app/Entities/Meeting';
import { FuncionesBasicasService } from 'src/app/services/funciones-basicas.service';

@Component({
  selector: 'app-meeting',
  templateUrl: './meeting.component.html',
  styleUrls: ['./meeting.component.css']
})
export class MeetingComponent {

  meetIdForm: string = '';
  accesoOK : boolean = false;

  avisos : Message[] = [];
  advertencias : Message[] = [];

  listaMeetings: Meeting[] = [];

  funciones: FuncionesBasicasService;


  constructor(private router: Router, private http: HttpClient, private titleService: Title){
    this.titleService.setTitle('Reuniones de equipo | RetroS');
    this.funciones = new FuncionesBasicasService();
  }

  ngOnInit(): void {

    var liPestanaAdm = document.getElementById("pestanaAdmin") as HTMLLIElement;
    if(window.sessionStorage.getItem("rol") == 'admin'){
      liPestanaAdm.style.display = "block";
    }else{
      liPestanaAdm.style.display = "none";
    }
    
    this.accesoPermitido();     
  }

  accesoPermitido(){
    
    const headers = {
      'Content-Type': 'application/json'
    };
    
    const body = {
      "emailAcceso": window.sessionStorage.getItem('email'),
      "pwdAcceso": window.sessionStorage.getItem('pwd'),
    };

   
    const url = 'http://localhost:8080/user/accesoUser';
    this.http.post(url, body, { headers, responseType: 'text' }).subscribe({
      next: data => {
       
        if (data.includes("No tienes acceso a este servicio")) {
          this.advertencias = [{ severity: 'warn', summary: '', detail: "No tienes acceso a este servicio. Inicia sesión con credenciales apropiadas"}];
          setTimeout(() => {  this.router.navigate(['/login']) }, 2500);

        }else{
          this.peticionGetMeetingsDevTHttp();
          var divAdvertencia = document.getElementById("divAdvertencia") as HTMLDivElement;
          divAdvertencia.style.display = "none";
          var divUserMeetings = document.getElementById("divUserMeetings") as HTMLDivElement;
          divUserMeetings.style.display = "block" ;
          
        }
      },error: error => {
        this.advertencias = [{ severity: 'warn', summary: '', detail: "Ha ocurrido un error"}];
        setTimeout(() => { this.router.navigate(['/inicio']) }, 2500);
      }
    });
  }

  peticionGetMeetingsDevTHttp(){
    const headers = {
      'Content-Type': 'application/json'
    };

    const body = {
      "email": window.sessionStorage.getItem("email")
    };
    
    const url = 'http://localhost:8080/meeting/getMeetingsDevT';
    this.http.post(url, body, { headers, responseType: 'text' }).subscribe({
      next: data => {
        this.listaMeetings = [];
        if (data.length == 0) {
          this.avisos = [{ severity: 'info', summary: '', detail: "No hay reuniones para mostrar"}];
        } else {
          var listaMeetJSON = data.split(";");
          for (let i = 0; i < listaMeetJSON.length; i++) {
            var meetAux = new Meeting(listaMeetJSON[i],i)
            this.listaMeetings.push(meetAux)
          }
        }
        
      }, error: error => {
        this.avisos = [{ severity: 'warn', summary: '', detail: "Ha ocurrido un error al cargar las reuniones"}];
        setTimeout(() => { this.router.navigate(['/inicio']); }, 2500);      
      }
    });
  }

  onSelect(element: Meeting) {
    this.meetIdForm = element.meetId;
    this.funciones.asignarValorID('meetNewId', element.meetId);
    this.funciones.asignarValorID('meetNewDate', element.meetDate);
    this.funciones.asignarValorID('meetNewCompany', element.meetCompany);
    this.funciones.asignarValorID('meetNewDevT', element.meetDevelopTeam);
    this.funciones.asignarValorID('meetNewStage', element.meetStage);
    this.mostrarFormRegistro();
  }
  
  //***********************************************************************
  //***********************PETICIONES CRUD*********************************
  //***********************************************************************

  busquedaMeetFiltro(){

    var fecha1 = '';
    var fecha2 = '';
    var meetId = '';

    var fecha1Campo = document.getElementById("meetDate1") as HTMLInputElement;
    var fecha2Campo = document.getElementById("meetDate2") as HTMLInputElement;
    var meetIdCampo = document.getElementById("idMeet") as HTMLInputElement;

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
      "meetId": meetId
    }

    const url = 'http://localhost:8080/meeting/getMeetingsFilter';
    this.http.post(url, body, { headers, responseType: 'text' }).subscribe({
      next: data => {
        this.listaMeetings = [];
        if (data.length == 0) {
          this.avisos = [{ severity: 'info', summary: '', detail: "No hay reuniones para mostrar"}];

        } else {
          var listaMeetJSON = data.split(";");
          for (let i = 0; i < listaMeetJSON.length; i++) {
            var meetAux = new Meeting(listaMeetJSON[i],i)
            this.listaMeetings.push(meetAux)
          }
        }

      }, error: error => {
        this.avisos = [{ severity: 'warn', summary: '', detail: "Ha ocurrido un error al cargar las reuniones"}];

      }
    });

  }

  eliminarMeeting(){
    
    var camposCorrectos = 0;

    var meetIdCampo = document.getElementById("meetNewId") as HTMLInputElement;

    var errorMeetId = this.funciones.comprobarVacioSombreado(meetIdCampo?.value);
    if(errorMeetId){ 
      meetIdCampo.style.boxShadow = "0px 0px 6px rgba(255, 0, 0, 1.5)";
    }else{
      var errorFormatoMeetId = this.funciones.validarFormatoMeetId(meetIdCampo?.value);
      if(!errorFormatoMeetId){ 
        this.avisos = [{ severity: 'error', summary: '', detail: "Sigue el formato exigido para el ID de la reunion"}];
        meetIdCampo.style.boxShadow = "0px 0px 6px rgba(255, 0, 0, 1.5)";
      }else{
        camposCorrectos += 1;
      }
    }      

    if (camposCorrectos == 1) {
      this.peticionDeleteMeetingHttp(meetIdCampo?.value);
    }else{
      this.avisos = [{ severity: 'error', summary: '', detail: "Revisa los campos"}];

    }
  }

  peticionDeleteMeetingHttp(meetId:string){
    const headers = {
      'Content-Type': 'application/json'
    };
    
    const body = {
      "emailAcceso": window.sessionStorage.getItem('email'),
      "pwdAcceso": window.sessionStorage.getItem('pwd'),
      "meetId": meetId
    };
    
    const url = 'http://localhost:8080/meeting/deleteMeeting';
    this.http.post(url, body,{ headers, responseType: 'text' }).subscribe({
      next: data => {
        if (data.includes("Error: el ID de reunion suministrado no existe")) {
          this.avisos = [{ severity: 'error', summary: '', detail: "El ID de reunion suministrado no existe"}];
        } else {    
          this.avisos = [{ severity: 'success', summary: '', detail: "Información de la reunion eliminada correctamente"}];
          this.peticionGetMeetingsDevTHttp();
          this.ocultarFormRegistro();
        }
      }, error: error => {
        this.avisos = [{ severity: 'error', summary: '', detail: "Ha ocurrido un error al actualizar la reunion"}];
        setTimeout(() => { this.router.navigate(['/inicio']); }, 2500);      
      }
    });
  }


  actualizarMeeting(){
    
    var camposCorrectos = 0;

    var meetIdCampo = document.getElementById("meetNewId") as HTMLInputElement;
    var meetDateCampo = document.getElementById("meetNewDate") as HTMLInputElement;
    var meetCompanyCampo = document.getElementById("meetNewCompany") as HTMLInputElement;
    var meetDevTCampo = document.getElementById("meetNewDevT") as HTMLInputElement;
    var meetStageCampo = document.getElementById("meetNewStage") as HTMLInputElement;



    var errorMeetId = this.funciones.comprobarVacioSombreado(meetIdCampo?.value);
    if(errorMeetId){ 
      meetIdCampo.style.boxShadow = "0px 0px 6px rgba(255, 0, 0, 1.5)";
    }else{
      var errorFormatoMeetId = this.funciones.validarFormatoMeetId(meetIdCampo?.value);
      if(!errorFormatoMeetId){ 
        this.avisos = [{ severity: 'error', summary: '', detail: "Sigue el formato exigido para el ID de la reunion"}];
        meetIdCampo.style.boxShadow = "0px 0px 6px rgba(255, 0, 0, 1.5)";
      }else{
        camposCorrectos+=1; 
        meetIdCampo.style.boxShadow = "none";
      }
    }

    var errorMeetDate = this.funciones.comprobarVacioSombreado(meetDateCampo?.value);
    if(errorMeetDate){ 
      meetDateCampo.style.boxShadow = "0px 0px 6px rgba(255, 0, 0, 1.5)";
    }else{
      meetDateCampo.style.boxShadow = "none";
      camposCorrectos+=1; 
    }

    var errorMeetComp = this.funciones.comprobarVacioSombreado(meetCompanyCampo?.value);
    if(errorMeetComp){ 
      meetCompanyCampo.style.boxShadow = "0px 0px 6px rgba(255, 0, 0, 1.5)";
    }else{
      meetCompanyCampo.style.boxShadow = "none";
      camposCorrectos+=1; 
    }

    var errorMeetDevT = this.funciones.comprobarVacioSombreado(meetDevTCampo?.value);
    if(errorMeetDevT){ 
      meetDevTCampo.style.boxShadow = "0px 0px 6px rgba(255, 0, 0, 1.5)";
    }else{
      meetDevTCampo.style.boxShadow = "none";
      camposCorrectos+=1; 
    }

    var errorMeetStage = this.funciones.comprobarVacioSombreado(meetStageCampo?.value);
    if(errorMeetStage){ 
      meetStageCampo.style.boxShadow = "0px 0px 6px rgba(255, 0, 0, 1.5)";
    }else{
      meetStageCampo.style.boxShadow = "none";
      camposCorrectos+=1; 
    }

    if (camposCorrectos == 5) {
      this.peticionHttpUpdateMeeting(meetIdCampo?.value, meetDateCampo?.value, meetCompanyCampo?.value, meetDevTCampo?.value, meetStageCampo?.value);

    }else{
      this.avisos = [{ severity: 'error', summary: '', detail: "Revise los campos"}];
    }
  }

  peticionHttpUpdateMeeting(meetId : string, meetDate : string, meetCompany : string, meetDevT:string, meetStage:string ){
    const headers = {
      'Content-Type': 'application/json'
    };
    
    const body = {
      "meetId": meetId,
      "meetDate": meetDate,
      "meetCompany": meetCompany,
      "meetDevelopTeam": meetDevT,
      "meetStage": meetStage
    };

    const url = 'http://localhost:8080/meeting/updateMeeting';
    this.http.post(url, body,{ headers, responseType: 'text' }).subscribe({
      next: data => {
        if (data.includes("Error: el ID de reunion suministrado no existe")) {
          this.avisos = [{ severity: 'error', summary: '', detail: "El ID de reunion suministrado no existe"}];
        } else {
          this.avisos = [{ severity: 'success', summary: '', detail: "Información de la reunion actualizada correctamente"}];
          this.peticionGetMeetingsDevTHttp();
          this.ocultarFormRegistro();
        }
        
      }, error: error => {
        this.avisos = [{ severity: 'warn', summary: '', detail: "Ha ocurrido un error al actualizar la reunion"}];
        setTimeout(() => { this.router.navigate(['/inicio']); }, 2500);      
      }
    });
  }


  //***********************************************************************
  //***********************FUNCIONES AUXILIARES****************************
  //***********************************************************************


  mostrarFormRegistro(): void {
    var formularioR = document.getElementById("divFormularioMeet") as HTMLDivElement;
    var fondoR = document.getElementById("fondoRegistro") as HTMLDivElement;
    
    if (formularioR && fondoR) {
      formularioR.style.display = "block";
      fondoR.style.display = "block";
    }
  }
  
  ocultarFormRegistro(): void {
    var formularioR = document.getElementById("divFormularioMeet") as HTMLDivElement;
    var fondoR = document.getElementById("fondoRegistro") as HTMLDivElement;
    if (formularioR && fondoR) {
      formularioR.style.display = "none";
      fondoR.style.display = "none";
    }
    this.bloquearCamposEditarMeeting();

    var meetIdCampo = document.getElementById("meetNewId") as HTMLInputElement;
    var meetDateCampo = document.getElementById("meetNewDate") as HTMLInputElement;
    var meetCompanyCampo = document.getElementById("meetNewCompany") as HTMLInputElement;
    var meetDevTCampo = document.getElementById("meetNewDevT") as HTMLInputElement;
    var meetStageCampo = document.getElementById("meetNewStage") as HTMLInputElement;
    var btnUpdtMeet = document.getElementById("btnUpdtMeet") as HTMLInputElement;

    btnUpdtMeet.disabled = true;

    meetIdCampo.style.boxShadow = "0px 0px 0px rgb(0, 0, 0)"
    meetCompanyCampo.style.boxShadow = "0px 0px 0px rgb(0, 0, 0)"
    meetDateCampo.style.boxShadow = "0px 0px 0px rgb(0, 0, 0)"
    meetDevTCampo.style.boxShadow = "0px 0px 0px rgb(0, 0, 0)"
    meetStageCampo.style.boxShadow = "0px 0px 0px rgb(0, 0, 0)"

    meetIdCampo.value = "";
    meetDateCampo.value = "";
    meetDevTCampo.value = "";
    meetStageCampo.value = "";
    meetCompanyCampo.value = "";

  }

  mostrarBusqueda(): void{

    var idCampo = document.getElementById("idMeet") as HTMLInputElement;
    var meetDate = document.getElementById("meetDate") as HTMLInputElement;

  }

  editarMeeting(): void{

    var parametrosMeet:string[] = ['btnUpdtMeet','btnUpdtMeet','meetNewId','meetNewDate','meetNewCompany','meetNewDevT','meetNewStage'];
    var btnComprobar2 = document.getElementById("btnUpdtMeet") as HTMLInputElement;

    if(btnComprobar2.disabled == true){
      this.funciones.editarCampos(parametrosMeet);
    }else{
      this.funciones.bloquearCampos(parametrosMeet);
    }
    
  }

  bloquearCamposEditarMeeting(): void{
    var meetNewIdCampo = document.getElementById("meetNewId") as HTMLInputElement;
    var meetNewDateCampo = document.getElementById("meetNewDate") as HTMLInputElement;
    var meetNewCompanyCampo = document.getElementById("meetNewCompany") as HTMLInputElement;
    var meetNewDevTCampo = document.getElementById("meetNewDevT") as HTMLInputElement;
    var meetNewStageCampo = document.getElementById("meetNewStage") as HTMLInputElement;

    meetNewIdCampo.readOnly = true;
    meetNewDateCampo.readOnly = true;
    meetNewCompanyCampo.readOnly = true;
    meetNewDevTCampo.readOnly = true;
    meetNewStageCampo.readOnly = true;
  }

  resetFiltrosMeet(): void{
    var filtrosMeet : string[] = ['idMeet','meetDate1','meetDate2'];
      this.funciones.resetFiltrosBusqueda(filtrosMeet);
  }

}
