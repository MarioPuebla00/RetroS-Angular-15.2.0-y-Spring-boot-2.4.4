import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Issue } from 'src/app/Entities/Issue';
import { FuncionesBasicasService } from 'src/app/services/funciones-basicas.service';
import { Message, MessageService } from 'primeng/api';
import { Solution } from 'src/app/Entities/Solution';

@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.css']
})
export class IssueComponent {

  issIdInfo: string = "";
  issLastModif: string = "";

  solId : string = "";

  issFixedada: string = 'false';

  valStars : number = 0;
  issSolutionAVG: number = 0;
  activeIndex : number = 0;

  avisos : Message[] = [];
  advertencias : Message[] = [];

  listaIssues: Issue[] = [];
  listaSolutions: Solution[] = [];

  funciones: FuncionesBasicasService;

  
  constructor(private router: Router, private http: HttpClient, private titleService: Title, private messageService: MessageService) {
    this.titleService.setTitle('Issues | RetroS');
    this.funciones = new FuncionesBasicasService();
  }

  ngOnInit(): void {
    
    var liPestanaAdm = document.getElementById("pestanaAdmin") as HTMLLIElement;
    if(window.sessionStorage.getItem("rol") == 'admin'){
      liPestanaAdm.style.display = "block";
    }else{
      liPestanaAdm.style.display = "none";
    }

    this.peticionGetIssuesHttp();
    
  }

  peticionGetIssuesHttp(){
    const headers = {
      'Content-Type': 'application/json'
    };
    
    const url = 'http://localhost:8080/issue/getIssues';
    this.http.get(url, { headers, responseType: 'text' }).subscribe({
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
        this.advertencias = [{ severity: 'warn', summary: '', detail: "Ha ocurrido un error al cargar las Issue. Redireccionando a la pagina principal"}];
        setTimeout(() => {  this.router.navigate(['/inicio']) }, 2500);
      }
    });
  }

  mostrarSoluciones(){    
    this.peticionGetSolutionsHttp(this.issIdInfo);
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
        var campoSoluciones = document.getElementById('formInfo') as HTMLDivElement;
          campoSoluciones.style.display = "none";
        var campoSoluciones = document.getElementById('divSoluciones') as HTMLDivElement;
          campoSoluciones.style.display = "block";
  
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
        this.peticionGetSolutionsHttp(this.issIdInfo);
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
      "issId": this.issIdInfo
    }

    const url = 'http://localhost:8080/issue/registerSolution';
    this.http.post(url, body, { headers, responseType: 'text' }).subscribe({
      next: data => {
        if(data.includes("sinDescript")){
          this.avisos = [{ severity: 'error', summary: '', detail: "Debes aportar una descripción de la posible solucion"}];
        }else{
          this.avisos = [{ severity: 'success', summary: '', detail: data}];
          this.peticionGetSolutionsHttp(this.issIdInfo);
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

  onSelect(element: Issue) {
   
    this.issIdInfo = element.issId;
    this.issLastModif = element.issLastModif;
    this.funciones.asignarValorID('issIdInfo', element.issId);
    this.funciones.asignarValorID('issDevTeam', element.issDevTeam);
    this.funciones.asignarValorID('issSelectInfo', element.issKeyWord);
    this.funciones.asignarValorID('issFixedInfo', element.issFixed);

    if(element.issFixed == 'true'){
      this.funciones.asignarValorID('issSolutionInfo', element.issSolution);
    }else{
      this.funciones.asignarValorID('issSolutionInfo', "Sin solución encontrada");
    }
    this.funciones.asignarValorID('issDescriptionInfo', element.issDescription);
    this.mostrarFormInfo();
   
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


  busquedaIssFiltro(){

    var fixed = '';
    var keyWord = '';
    var fecha1 = '';
    var fecha2 = '';

    var issIdcampo = document.getElementById("issIdFilter") as HTMLInputElement;
    var issKeyWordcampo = document.getElementById("issKeyWSelect") as HTMLSelectElement;
    var issFixedcampo = document.getElementById("issFixedSelect") as HTMLSelectElement;
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
    }


    const url = 'http://localhost:8080/issue/getIssuesFilter';
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
            issAux.issKeyWord = this.funciones.traduccionKeyWord(issAux.issKeyWord,1);
            this.listaIssues.push(issAux)
          }
        }
      }, error: error => {
        this.advertencias = [{ severity: 'info', summary: '', detail: "Ha ocurrido un error al cargar las Issues"}];
        setTimeout(() => {  this.router.navigate(['/inicio']) }, 2500);
      }
    });
  }

  registrarIssue(){

    var camposCorrectos = 0;

    var issNewIdCampo = document.getElementById("issNewId") as HTMLInputElement;
    var issNewSelectCampo = document.getElementById("issNewSelect") as HTMLInputElement;
    var issNewFixedCampo = document.getElementById("issNewFixed") as HTMLInputElement;
    var issNewDescriptCampo = document.getElementById("issNewDescription") as HTMLInputElement;
    var issNewSolutionCampo = document.getElementById("issNewSolution") as HTMLInputElement;

    var errorIssId = this.funciones.comprobarVacioSombreado(issNewIdCampo?.value);
    if(errorIssId){ 
      issNewIdCampo.style.boxShadow = "0px 0px 6px rgba(255, 0, 0, 1.5)";
    }else{
      var errorFormatoIssId = this.funciones.validarFormatoIssId(issNewIdCampo?.value);
      if(!errorFormatoIssId){ 
        issNewIdCampo.style.boxShadow = "0px 0px 6px rgba(255, 0, 0, 1.5)";
      }else{
        camposCorrectos += 1; 
        issNewIdCampo.style.boxShadow = "none";
      }
    }

    var errorDescript = this.funciones.comprobarVacioSombreado(issNewDescriptCampo?.value);
    if(errorDescript){ 
      issNewDescriptCampo.style.boxShadow = "0px 0px 6px rgba(255, 0, 0, 1.5)";
    }else{
      issNewDescriptCampo.style.boxShadow = "none";
      camposCorrectos += 1; 
    }

    if(issNewSelectCampo.value == 'invalid'){
      issNewSelectCampo.style.boxShadow = "0px 0px 6px rgba(255, 0, 0, 1.5)";
    }else{
      camposCorrectos += 1;
      issNewSelectCampo.style.boxShadow = "none";

    }

    if (issNewFixedCampo.checked) {
      // El checkbox está marcado, se enviará el valor "true"
      this.issFixedada = 'true';
      var errorSolution = this.funciones.comprobarVacioSombreado(issNewSolutionCampo?.value);
      if(errorSolution){ 
        issNewSolutionCampo.style.boxShadow = "0px 0px 6px rgba(255, 0, 0, 1.5)";
      }else{
        camposCorrectos += 1; 
        issNewSolutionCampo.style.boxShadow = "none";
      }
    }else{
      issNewSolutionCampo.style.boxShadow = "none";
      camposCorrectos += 1;
    }


    if (camposCorrectos == 4) {
      this.peticionHttpRegistroIssue(issNewIdCampo?.value,issNewSelectCampo?.value, issNewDescriptCampo?.value, this.issFixedada, issNewSolutionCampo?.value);
      this.issFixedada = 'false';
    }else{
      this.avisos = [{ severity: 'error', summary: '', detail: "Revisa los campos"}];
    }
  }

  peticionHttpRegistroIssue(issId: string, issKeyWord:string, issDescription:string,  issFixed:string, issSolution:string){
   
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
      "emailAcceso": window.sessionStorage.getItem("email"),
      "pwdAcceso": window.sessionStorage.getItem('pwd')
    };

    const url = 'http://localhost:8080/issue/registerIssue';
    this.http.post(url, body, { headers, responseType: 'text' }).subscribe({
      next: data => {
        if (data.includes("Ya existe una Issue con ese ID")) {
          this.avisos = [{ severity: 'error', summary: '', detail: "Ya existe una Issue con ese ID"}];
        }else if(data.includes("errorDevTeamUser")) {
          this.avisos = [{ severity: 'error', summary: '', detail: "Tienes que poner el nombre de tu equipo en el ID de la Issue"}];
        }else{
          this.avisos = [{ severity: 'success', summary: '', detail: "Issue registrada correctamente"}];
          this.ocultarFormRegistro();
          this.peticionGetIssuesHttp();
        }
      },
      error: error => {
        this.advertencias = [{ severity: 'warn', summary: '', detail: "Ha ocurrido un error al registrar las Issue"}];
        setTimeout(() => { this.router.navigate(['/inicio']) }, 2500);
      }
    });
  }

  //***********************************************************************
  //***********************FUNCIONES AUXILIARES****************************
  //***********************************************************************

  mostrarFormRegistro(): void {
    if(window.sessionStorage.length == 0){
      this.messageService.add({ severity: 'warn', summary: '', detail: 'Debes iniciar sesión para registrar una Issue' });
      this.ocultarFormInfo();
    }else{
      var formularioR = document.getElementById("divFormularioRegistroIssue") as HTMLDivElement;
      var fondoR = document.getElementById("fondoRegistro") as HTMLDivElement;
      
      if (formularioR && fondoR) {
        formularioR.style.display = "block";
        fondoR.style.display = "block";
      }
    }  
  }

  mostrarFormInfo(): void {
    var infoIssueCampos: string[] = ['issSelectInfo','issFixedInfo','issSelectInfo','issFixedInfo','issIdInfo','issDescriptionInfo','issSolutionInfo','issDevTeam'];
    var formularioR = document.getElementById("divFormularioInfoIssue") as HTMLDivElement;
    var fondoR = document.getElementById("fondoRegistro") as HTMLDivElement;
    //
    if (formularioR && fondoR) {
      formularioR.style.display = "block";
      fondoR.style.display = "block";
    }
    this.funciones.bloquearCampos(infoIssueCampos);

  }
  
  ocultarFormRegistro(): void {
    var regIssueCampos: string[] = ['issNewSelect','issNewSelect','issNewId','issNewDescription','issNewSolution'];
    var formularioR = document.getElementById("divFormularioRegistroIssue") as HTMLDivElement;
    var fondoR = document.getElementById("fondoRegistro") as HTMLDivElement;
    if (formularioR && fondoR) {
      formularioR.style.display = "none";
      fondoR.style.display = "none";
    }
    var fixedCampo = document.getElementById("issNewFixed") as HTMLInputElement;
    fixedCampo.checked = false;
    this.funciones.restaurarCamposConSelect(regIssueCampos);
  }

  ocultarFormInfo(): void {
    this.volverSoluciones();
    var formularioR = document.getElementById("divFormularioInfoIssue") as HTMLDivElement;
    var fondoR = document.getElementById("fondoRegistro") as HTMLDivElement;
    if (formularioR && fondoR) {
      formularioR.style.display = "none";
      fondoR.style.display = "none";
    }
    this.issSolutionAVG = 0;
    this.solId="";
    this.funciones.asignarValorID('issSolutionDescript', 'Descripcion de la solucion propuesta');
    var btnMostrarRegSol = document.getElementById('btnMostrarRegSol') as HTMLButtonElement;
    if(btnMostrarRegSol.style.display == 'none'){
      this.desbloqRegSolucion();
    }
  }

  resetFiltrosIssue(): void{
    var filtrosMeet : string[] = ['issIdFilter','issKeyWSelect','issFixedSelect', 'fecha1Filter', 'fecha2Filter'];
    
    this.funciones.resetFiltrosBusqueda(filtrosMeet);
    
    var keyWCampo = document.getElementById('issKeyWSelect') as HTMLSelectElement;
    var fixedCampo = document.getElementById('issFixedSelect') as HTMLSelectElement;

    keyWCampo.value = 'invalid';
    fixedCampo.value = 'invalid';
  }

  volverSoluciones(): void{
    var campoSoluciones = document.getElementById('formInfo') as HTMLDivElement;
    campoSoluciones.style.display = "block";
    var campoSoluciones = document.getElementById('divSoluciones') as HTMLDivElement;
    campoSoluciones.style.display = "none";
    this.valStars = 0;
    this.issSolutionAVG = 0;
    var btnMostrarRegSol = document.getElementById('btnMostrarRegSol') as HTMLButtonElement;
    if(btnMostrarRegSol.style.display == 'none'){
      this.desbloqRegSolucion();
    }
  }
 
}


