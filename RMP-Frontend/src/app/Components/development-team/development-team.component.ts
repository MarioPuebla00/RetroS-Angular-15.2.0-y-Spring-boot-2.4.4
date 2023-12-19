import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Meeting } from 'src/app/Entities/Meeting';
import { User } from 'src/app/Entities/User';
import { Message } from 'primeng/api';
import { FuncionesBasicasService } from 'src/app/services/funciones-basicas.service';
import { Issue } from 'src/app/Entities/Issue';
import { Solution } from 'src/app/Entities/Solution';

@Component({
  selector: 'app-development-team',
  templateUrl: './development-team.component.html',
  styleUrls: ['./development-team.component.css']
})

export class DevelopmentTeamComponent {
  
  avisoErrorDevT: string = '';
  userDevTeam: string = '---';

  emailComp: string = '...';
  nameComp: string = '...';
  surnameComp: string = '...';
  tlfComp: string = '...';
  cargoComp: string = '...';

  solId : string = "";
  valStars : number = 0;
  issSolutionAVG: number = 0;

  issDevTId : string = '...';
  issDevTClave: string = '...';
  issDevTFixed: string = '...';
  issDevTDescrip: string = '...';
  issDevTSolution: string = '...';
  issDevTLastModif: string = '...';


  avisos : Message[] = [];
  advertencias : Message[] = [];

  activeIndex: number = 0;

  listaUsers: User[] = [];
  listaReuniones: Meeting[] = [];
  listaIssues: Issue[] = [];
  listaSolutions: Solution[] = [];

  funciones: FuncionesBasicasService;

  constructor(private router: Router, private http: HttpClient, private titleService: Title){
    this.titleService.setTitle('Equipo de desarrollo | RetroS');
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
          this.peticionGetUsersDevTHttp();
          this.peticionGetIssuesDevTHttp();
          var divAdvertencia = document.getElementById("divAdvertencia") as HTMLDivElement;
          divAdvertencia.style.display = "none";
          var divUserMeetings = document.getElementById("divDevTeam") as HTMLDivElement;
          divUserMeetings.style.display = "block" ;
        }
      },error: error => {
        this.advertencias = [{ severity: 'warn', summary: '', detail: "Ha ocurrido un error"}];
        setTimeout(() => { this.router.navigate(['/inicio']) }, 2500);
      }
    });
  }

  peticionGetUsersDevTHttp(){
    const headers = {
      'Content-Type': 'application/json'
    };

    const body = {
      "email": window.sessionStorage.getItem('email'),
    };

    const urlUsers = 'http://localhost:8080/user/getUsersDevT';
    this.http.post(urlUsers, body, { headers, responseType: 'text' }).subscribe({
      next: data => {
        this.listaUsers = [];
        if (data.length == 0) {
          this.avisos = [{ severity: 'info', summary: '', detail: "No hay compañeros para mostrar"}];
        } else {
          var listaUserJSON = data.split(";");
          for (let i = 0; i < listaUserJSON.length; i++) {
            var userAux = new User(listaUserJSON[i],i);
            if(userAux.userEmail != window.sessionStorage.getItem('email')){
              this.listaUsers.push(userAux);
              this.userDevTeam = userAux.userDevT.toUpperCase();
            } 
          }   
        }
      }, error: error => {

        this.avisos = [{ severity: 'warn', summary: '', detail: "Ha ocurrido un error al cargar los usuarios"}];

      }
    });
  }

  peticionGetIssuesDevTHttp(){
    const headers = {
      'Content-Type': 'application/json'
    };

    const body = {
      "email": window.sessionStorage.getItem('email'),
    };

    const url = 'http://localhost:8080/issue/getIssuesDevTeam';
    this.http.post(url, body, { headers, responseType: 'text' }).subscribe({
      next: data => {
        this.listaIssues = [];
        if (data.length == 0) {
          this.avisos = [{ severity: 'info', summary: '', detail: "No hay Issues para mostrar"}];

        } else {
          var listaIssJSON = data.split(";");
          for (let i = 0; i < listaIssJSON.length; i++) {
            var issAux = new Issue(listaIssJSON[i],i)
            if(issAux.issFixed == 'true'){ 
              issAux.issFixed = 'Si'
            }else{
              issAux.issFixed = 'No'
            }
            issAux.issKeyWord = this.funciones.traduccionKeyWord(issAux.issKeyWord, 1)
            this.listaIssues.push(issAux)
          }
        }
        
      }, error: error => {
        this.avisos = [{ severity: 'warn', summary: '', detail: "Ha ocurrido un error al cargar las issues"}];
        
      }
    });
  }

  peticionGetSolutionsHttp(issId : string){
    const headers = {
      'Content-Type': 'application/json'
    };
    
    const body = {
      "emailAcceso": window.sessionStorage.getItem('email'),
      "pwdAcceso": window.sessionStorage.getItem('pwd'),
      "issId": issId
    }

    const url = 'http://localhost:8080/issue/getSolutions';
    this.http.post(url, body, { headers, responseType: 'text' }).subscribe({
      next: data => {
        this.listaSolutions = [];
        if (data.length == 0) {
          this.avisos = [{ severity: 'info', summary: '', detail: "No hay soluciones posibles para mostrar"}];
        } else {
          var listaSolJSON = data.split(";");
          for (let i = 0; i < listaSolJSON.length; i++) {
            var solAux = new Solution(listaSolJSON[i],i);
            solAux.solRatingAvg = Math.floor(solAux.solRatingAvg * 10) / 10; 
            this.listaSolutions.push(solAux);
          }
        }
        
      }, error: error => {
        this.advertencias = [{ severity: 'warn', summary: '', detail: "Ha ocurrido un error al cargar las posibles soluciones. Redireccionando a la pagina principal"}];
        setTimeout(() => {  this.router.navigate(['/inicio']) }, 2500);
      }
    });
  }

  registrarSolucion(){

    var solDescriptCampo = document.getElementById('issSolutionDescript') as HTMLTextAreaElement;

    if(window.sessionStorage.length == 0){
      this.avisos = [{ severity: 'warn', summary: '', detail: "Debes iniciar sesión para valorar"}];
    }else if(this.funciones.comprobarVacioSombreado(solDescriptCampo?.value)){
      this.avisos = [{ severity: 'error', summary: '', detail: "Debes aportar una descripción de la posible solucion"}];
    }else{
      this.peticionPostSolutionHttp(solDescriptCampo?.value);
    } 
    
  }

  peticionPostSolutionHttp(solDescript :string){
    const headers = {
      'Content-Type': 'application/json'
    };

    const body = {
      "emailAcceso": window.sessionStorage.getItem('email'),
      "pwdAcceso": window.sessionStorage.getItem('pwd'),
      "solDescript": solDescript,
      "issId": this.issDevTId
    }

    const url = 'http://localhost:8080/issue/registerSolution';
    this.http.post(url, body, { headers, responseType: 'text' }).subscribe({
      next: data => {
        if(data.includes("sinDescript")){
          this.avisos = [{ severity: 'error', summary: '', detail: "Debes aportar una descripción de la posible solucion"}];
        }else{
          this.avisos = [{ severity: 'success', summary: '', detail: data}];
          this.peticionGetSolutionsHttp(this.issDevTId);
          this.valStars=0;
          this.issSolutionAVG = 0;
          this.solId="";
          this.desbloqRegSolucion();
        }
     
      }, error: error => {
        this.advertencias = [{ severity: 'warn', summary: '', detail: "Ha ocurrido un error al registrar la solución"}];
        setTimeout(() => {  this.router.navigate(['/inicio']) }, 2500);
      }
    });
  }

  valorarSolucion(){
  
    if(window.sessionStorage.length == 0){
      this.avisos = [{ severity: 'warn', summary: '', detail: "Debes iniciar sesión para valorar"}];
    }else if(this.solId == ""){
      this.avisos = [{ severity: 'warn', summary: '', detail: "Debes seleccionar una solución a valorar"}];
    }else{
      this.peticionPostRatingHttp(this.valStars.toString(), this.solId);
    } 
    
  }

  peticionPostRatingHttp(rating : string, solId : string){
    const headers = {
      'Content-Type': 'application/json'
    };

    const body = {
      "emailAcceso": window.sessionStorage.getItem('email'),
      "pwdAcceso": window.sessionStorage.getItem('pwd'),
      "email": window.sessionStorage.getItem('email'),
      "solId": solId,
      "scoreRating": rating
    }

    const url = 'http://localhost:8080/issue/registerRating';
    this.http.post(url, body, { headers, responseType: 'text' }).subscribe({
      next: data => {
        this.avisos = [{ severity: 'success', summary: '', detail: data}];
        this.peticionGetSolutionsHttp(this.issDevTId);
        this.valStars=0;
        this.issSolutionAVG = 0;
        this.solId="";
        this.funciones.asignarValorID('issSolutionDescript', 'Descripcion de la solucion propuesta');
      }, error: error => {
        this.advertencias = [{ severity: 'warn', summary: '', detail: "Ha ocurrido un error al valorar"}];
        setTimeout(() => {  this.router.navigate(['/inicio']) }, 2500);
      }
    });
  }

  onSelectUser(element:User) {
    this.emailComp = element.userEmail;
    this.nameComp = element.userName;
    this.surnameComp = element.userSurname;
    this.tlfComp = element.userTlf;
    if(element.userSupervisor === true){
      this.cargoComp = 'Supervisor';
      //Mostrar boton contacto supervisor
    }else if(element.userSupervisor === false){
      this.cargoComp = 'Desarrollador'
    }
  }

  onSelectIssue(element:Issue) {
    this.issDevTId = element.issId;
    this.issDevTDescrip = element.issDescription;
    this.issDevTClave = element.issKeyWord;
    this.issDevTFixed = element.issFixed;
    if(element.issSolution == 'No solution yet'){
      this.issDevTSolution = 'Sin solución encontrada';
    }else{
      this.issDevTSolution = element.issSolution ;
    }
    this.issDevTLastModif = element.issLastModif;
  }

  onSelectSolution(element: Solution) {

    this.solId = element.solId;
    this.issSolutionAVG = element.solRatingAvg;
    this.funciones.asignarValorID('issSolutionDescript', element.solDescript);
    var btnMostrarRegSol = document.getElementById('btnMostrarRegSol') as HTMLButtonElement;
    if(btnMostrarRegSol.style.display == 'none'){
      this.desbloqRegSolucion();
    }  
    this.funciones.asignarValorID('issSolutionDescript', element.solDescript);
  }

  mostrarPosiblesSoluciones(){
    if(this.issDevTId === "..."){
      this.avisos = [{ severity: 'warn', summary: '', detail: "Selecciona una Issue de la lista para poder ver sus posibles soluciones"}];
    }else{
      var formularioR = document.getElementById("divFormularioSolutsIssue") as HTMLDivElement;
      var fondoR = document.getElementById("fondoRegistro") as HTMLDivElement;
      
      if (formularioR && fondoR) {
        formularioR.style.display = "block";
        fondoR.style.display = "block";
      }
      
      this.peticionGetSolutionsHttp(this.issDevTId);
    }
      
  }
  
  desbloqRegSolucion(){
    var solDescriptCampo = document.getElementById('issSolutionDescript') as HTMLTextAreaElement;
    var btnMostrarRegSol = document.getElementById('btnMostrarRegSol') as HTMLButtonElement;
    var btnNewSol = document.getElementById('btnNewSol') as HTMLButtonElement;
    var btnOcultarRegSol = document.getElementById('btnOcultarRegSol') as HTMLButtonElement;

    this.issSolutionAVG = 0;

    if(btnMostrarRegSol.style.display == 'none'){
      solDescriptCampo.placeholder = "Descripción de la solución propuesta"
      solDescriptCampo.readOnly = true;
      solDescriptCampo.style.boxShadow = 'none';
      solDescriptCampo.value = '';

      btnNewSol.style.display = 'none';
      btnOcultarRegSol.style.display = 'none';
      btnMostrarRegSol.style.display = 'inline-flex';

    }else{
      solDescriptCampo.placeholder = "Introduce la posible solución que puedes aportar a este problema"
      solDescriptCampo.readOnly = false;
      solDescriptCampo.style.boxShadow = "rgb(0 173 255) 0px 0px 10px";
      solDescriptCampo.value = '';

      btnNewSol.style.display = 'inline-flex';
      btnOcultarRegSol.style.display = 'inline-flex';
      btnMostrarRegSol.style.display = 'none';
    }
  }

  nuevaMeeting(){

  }

  ocultarFormInfo(): void {
    var formularioR = document.getElementById("divFormularioSolutsIssue") as HTMLDivElement;
    var fondoR = document.getElementById("fondoRegistro") as HTMLDivElement;
    if (formularioR && fondoR) {
      formularioR.style.display = "none";
      fondoR.style.display = "none";
    }
    this.valStars = 0;
    this.issSolutionAVG = 0;
    this.solId="";
    this.funciones.asignarValorID('issSolutionDescript', 'Descripcion de la solucion propuesta');
    var btnMostrarRegSol = document.getElementById('btnMostrarRegSol') as HTMLButtonElement;
    if(btnMostrarRegSol.style.display == 'none'){
      this.desbloqRegSolucion();
    }
  }

}
