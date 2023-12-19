import { Injectable, ViewChild } from '@angular/core';
import { AppComponent } from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class FuncionesBasicasService {

  @ViewChild(AppComponent) app!: AppComponent;

  constructor() { }

  validarEmail(valor: string): boolean {
    if (/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i.test(valor)) {
      return true;
    } else {
      return false;
    }
  }

  validarFormatoMeetId(cadena: string): boolean {
    const regex = /^meet-\d{4}-[a-zA-Z]{1,15}$/;
    return regex.test(cadena);
  }
  
  validarFormatoIssId(cadena: string): boolean {
    const regex = /^iss-\d{4}-[a-zA-Z]{1,15}$/;
    return regex.test(cadena);
  }

  comprobarVacio(cadena: string): string {
    if (cadena === "") {
      return "Campo vacío";
    } else {
      return "";
    }
  }

  comprobarVacioSombreado(cadena : string): boolean{
    if(cadena === ""){
      return true;
    }else{
      return false
    }
  }

  esNumero(cadena: string): boolean {
    if (cadena.length != 9) {
      return false;
    }

    for (let i = 0; i < 9; i++) {
      if (!this.esInt(cadena.charAt(i))) {
        return false;
      }
    }
    return true;
  }

  esInt(charac: string): boolean {
    if (charac == '0') {
      return true;
    } else if (charac == '1') {
      return true;
    } else if (charac == '2') {
      return true;
    } else if (charac == '3') {
      return true;
    } else if (charac == '4') {
      return true;
    } else if (charac == '5') {
      return true;
    } else if (charac == '6') {
      return true;
    } else if (charac == '7') {
      return true;
    } else if (charac == '8') {
      return true;
    } else if (charac == '9') {
      return true;
    } else {
      return false;
    }
  }

  asignarValorID(id: string, valor: string) {
    var campo = document.getElementById(id) as HTMLInputElement;
    campo.value = valor;
  }
  
  traduccionKeyWord(issKeyWord: string, tradOption : number){
    
    var keyWordTraduc = issKeyWord
    if(tradOption == 1){
      if(issKeyWord == 'comunication'){ 
        keyWordTraduc = 'comunicación entre miembros'
      }else if(issKeyWord == 'technology'){
        keyWordTraduc = 'tecnología desconocida'
      }else if(issKeyWord == 'empathy'){
        keyWordTraduc = 'empatía entre compañeros'
      }else if(issKeyWord == 'timeDevelop'){
        keyWordTraduc = 'tiempo para el desarrollo'
      }else if(issKeyWord == 'speedDevelop'){
        keyWordTraduc = 'velocidad de desarrollo'
      }
    }else if(tradOption == 2){
      if(issKeyWord == 'comunicación entre miembros'){ 
        keyWordTraduc = 'comunication'
      }else if(issKeyWord == 'tecnología desconocida'){
        keyWordTraduc = 'technology'
      }else if(issKeyWord == 'empatía entre compañeros'){
        keyWordTraduc = 'empathy'
      }else if(issKeyWord == 'tiempo para el desarrollo'){
        keyWordTraduc = 'timeDevelop'
      }else if(issKeyWord == 'velocidad de desarrollo'){
        keyWordTraduc = 'speedDevelop'
      }
    }

    return keyWordTraduc
  }
  
  comprobacionVacio(nameCampo:string, surnameCampo:string, emailCampo:string, pwdCampo:string, pwd2Campo:string, tlfCampo:string, companyCampo:string, developTeamCampo:string ,supervisorCampo: string){

    if((nameCampo && surnameCampo && emailCampo && pwdCampo && pwd2Campo && tlfCampo && companyCampo && developTeamCampo  && supervisorCampo) != ''){
      return true;
    }else{
      return false;
    }
  }
  
  restaurarCampos(campos:string[]){
    
    var uno = document.getElementById(campos[0]) as HTMLInputElement;
    var dos = document.getElementById(campos[1]) as HTMLInputElement;
    var tres = document.getElementById(campos[2]) as HTMLInputElement;
    var cuatro = document.getElementById(campos[3]) as HTMLInputElement;   

    uno.style.boxShadow = "0px 0px 0px rgb(0, 0, 0)"
    dos.style.boxShadow = "0px 0px 0px rgb(0, 0, 0)"
    tres.style.boxShadow = "0px 0px 0px rgb(0, 0, 0)"
    cuatro.style.boxShadow = "0px 0px 0px rgb(0, 0, 0)"
  

    uno.value = "";
    dos.value = "";
    tres.value = "";
    cuatro.value = "";
   

    var longitudParam = campos.length;
    
    if(longitudParam == 6){
      var cinco = document.getElementById(campos[4]) as HTMLInputElement;
      var seis = document.getElementById(campos[5]) as HTMLInputElement;
      
      cinco.style.boxShadow = "0px 0px 0px rgb(0, 0, 0)"
      seis.style.boxShadow = "0px 0px 0px rgb(0, 0, 0)"

      cinco.value = "";
      seis.value = "";

    }else if(longitudParam == 7){
      var cinco = document.getElementById(campos[4]) as HTMLInputElement;
      var seis = document.getElementById(campos[5]) as HTMLInputElement;
      var siete = document.getElementById(campos[6]) as HTMLInputElement;
      
      cinco.style.boxShadow = "0px 0px 0px rgb(0, 0, 0)"
      seis.style.boxShadow = "0px 0px 0px rgb(0, 0, 0)"
      siete.style.boxShadow = "0px 0px 0px rgb(0, 0, 0)"
      
      cinco.value = "";
      seis.value = "";
      siete.value = "";

    }else if(longitudParam == 8){

      var cinco = document.getElementById(campos[4]) as HTMLInputElement;
      var seis = document.getElementById(campos[5]) as HTMLInputElement;
      var siete = document.getElementById(campos[6]) as HTMLInputElement;
      var ocho = document.getElementById(campos[7]) as HTMLInputElement;

      cinco.style.boxShadow = "0px 0px 0px rgb(0, 0, 0)"
      seis.style.boxShadow = "0px 0px 0px rgb(0, 0, 0)"
      siete.style.boxShadow = "0px 0px 0px rgb(0, 0, 0)"
      ocho.style.boxShadow = "0px 0px 0px rgb(0, 0, 0)"
      
      cinco.value = "";
      seis.value = "";
      siete.value = "";
      ocho.value = "";

    }else if(longitudParam == 9){
      var cinco = document.getElementById(campos[4]) as HTMLInputElement;
      var seis = document.getElementById(campos[5]) as HTMLInputElement;
      var siete = document.getElementById(campos[6]) as HTMLInputElement;
      var ocho = document.getElementById(campos[7]) as HTMLInputElement;
      var nueve = document.getElementById(campos[8]) as HTMLInputElement;

      cinco.style.boxShadow = "0px 0px 0px rgb(0, 0, 0)"
      seis.style.boxShadow = "0px 0px 0px rgb(0, 0, 0)"
      siete.style.boxShadow = "0px 0px 0px rgb(0, 0, 0)"
      ocho.style.boxShadow = "0px 0px 0px rgb(0, 0, 0)"
      nueve.style.boxShadow = "0px 0px 0px rgb(0, 0, 0)"
      
      cinco.value = "";
      seis.value = "";
      siete.value = "";
      ocho.value = "";
      nueve.value = "";
    }
  }

  restaurarCamposConSelect(campos:string[]){
    
    var longitudParam = campos.length;

    if(longitudParam == 5){

      var select1 = document.getElementById(campos[0]) as HTMLSelectElement;
      var select2 = document.getElementById(campos[1]) as HTMLSelectElement;
      var input1 = document.getElementById(campos[2]) as HTMLInputElement;
      var input2 = document.getElementById(campos[3]) as HTMLInputElement;
      var input3 = document.getElementById(campos[4]) as HTMLInputElement;

      input1.style.boxShadow = "0px 0px 0px rgb(0, 0, 0)"
      input2.style.boxShadow = "0px 0px 0px rgb(0, 0, 0)"
      input3.style.boxShadow = "0px 0px 0px rgb(0, 0, 0)"
      
      input1.value = "";
      input2.value = "";
      input3.value = "";
      
      select1.value = 'invalid';
      select2.value = 'invalid';

      select1.style.boxShadow = "0px 0px 0px rgb(0, 0, 0)"
      select2.style.boxShadow = "0px 0px 0px rgb(0, 0, 0)"

    }else if(longitudParam == 7){

      var select1 = document.getElementById(campos[0]) as HTMLSelectElement;
      var input1 = document.getElementById(campos[1]) as HTMLInputElement;
      var input2 = document.getElementById(campos[2]) as HTMLInputElement;
      var input3 = document.getElementById(campos[3]) as HTMLInputElement;
      var input4 = document.getElementById(campos[4]) as HTMLInputElement;
      var input5 = document.getElementById(campos[5]) as HTMLInputElement;
      var input6 = document.getElementById(campos[6]) as HTMLInputElement;

      input1.style.boxShadow = "0px 0px 0px rgb(0, 0, 0)"
      input2.style.boxShadow = "0px 0px 0px rgb(0, 0, 0)"
      input3.style.boxShadow = "0px 0px 0px rgb(0, 0, 0)"
      input4.style.boxShadow = "0px 0px 0px rgb(0, 0, 0)"
      input5.style.boxShadow = "0px 0px 0px rgb(0, 0, 0)"
      input6.style.boxShadow = "0px 0px 0px rgb(0, 0, 0)"

      input1.value = "";
      input2.value = "";
      input3.value = "";
      input4.value = "";
      input5.value = "";
      input6.value = "";

      select1.value = 'invalid';
      select1.style.boxShadow = "0px 0px 0px rgb(0, 0, 0)"

    }
  }

  editarCampos(campos:string[]):void{

    var botonUpdt = document.getElementById(campos[0]) as HTMLButtonElement;
    var botonDlt = document.getElementById(campos[1]) as HTMLButtonElement;

    botonUpdt.disabled = false;
    botonDlt.disabled = false;

    var uno = document.getElementById(campos[2]) as HTMLInputElement;
    var dos = document.getElementById(campos[3]) as HTMLInputElement;
    var tres = document.getElementById(campos[4]) as HTMLInputElement;
    var cuatro = document.getElementById(campos[5]) as HTMLInputElement;   
  
    uno.readOnly = false;
    dos.readOnly = false;
    tres.readOnly = false;
    cuatro.readOnly = false;

    var longitudParam = campos.length;
    
    if((longitudParam - 2) == 5){

      var cinco = document.getElementById(campos[6]) as HTMLInputElement;
      cinco.readOnly = false;


    }else if((longitudParam - 2) == 6){
      var cinco = document.getElementById(campos[6]) as HTMLInputElement;
      var seis = document.getElementById(campos[7]) as HTMLInputElement;
      
      cinco.readOnly = false;
      seis.readOnly = false;


    }else if((longitudParam - 2) == 7){
      var cinco = document.getElementById(campos[6]) as HTMLInputElement; 
      var seis = document.getElementById(campos[7]) as HTMLInputElement;
      var siete = document.getElementById(campos[8]) as HTMLInputElement;

      cinco.readOnly = false;
      seis.readOnly = false;
      siete.readOnly = false;

    }
  }

  editarCamposConSelect(campos:string[]): void{
    
    var botonUpdt = document.getElementById(campos[0]) as HTMLButtonElement;
    var botonDlt = document.getElementById(campos[1]) as HTMLButtonElement;

    botonUpdt.disabled = false;
    botonDlt.disabled = false;
  
    var longitudParam = campos.length;
    

    if(longitudParam == 7){

      var select1 = document.getElementById(campos[2]) as HTMLSelectElement;
      var select2 = document.getElementById(campos[3]) as HTMLSelectElement;
      var input1 = document.getElementById(campos[4]) as HTMLInputElement;
      var input2 = document.getElementById(campos[5]) as HTMLInputElement;
      var input3 = document.getElementById(campos[6]) as HTMLInputElement;

      select1.disabled = false;
      select2.disabled = false;

      input1.readOnly = false;
      input2.readOnly = false;
      input3.readOnly = false;
    
    }else if(longitudParam == 9){

      var select1 = document.getElementById(campos[2]) as HTMLSelectElement;
      var input1 = document.getElementById(campos[3]) as HTMLInputElement;
      var input2 = document.getElementById(campos[4]) as HTMLInputElement;
      var input3 = document.getElementById(campos[5]) as HTMLInputElement;
      var input4 = document.getElementById(campos[6]) as HTMLInputElement;
      var input5 = document.getElementById(campos[7]) as HTMLInputElement;
      var input6 = document.getElementById(campos[8]) as HTMLInputElement;

      select1.disabled = false;

      input1.readOnly = false;
      input2.readOnly = false;
      input3.readOnly = false;
      input4.readOnly = false;
      input5.readOnly = false;
      input6.readOnly = false;

    }
  }

  bloquearCampos(campos:string[]): void{

    var botonUpdt = document.getElementById(campos[0]) as HTMLButtonElement;
    var botonDlt = document.getElementById(campos[1]) as HTMLButtonElement;

    botonUpdt.disabled = true;
    botonDlt.disabled = true;

    if(campos[2] == 'issSelectInfo'){

      var input1 = document.getElementById(campos[2]) as HTMLInputElement;
      var input2 = document.getElementById(campos[3]) as HTMLInputElement;
      var input3 = document.getElementById(campos[4]) as HTMLInputElement; 
      var txtAr1 = document.getElementById(campos[5]) as HTMLTextAreaElement;
      var txtAr2 = document.getElementById(campos[6]) as HTMLTextAreaElement;
      
      input1.readOnly = true;
      input2.readOnly = true;
      input3.readOnly = true;
      txtAr1.readOnly = true;
      txtAr2.readOnly = true;

      return;
    }

    var input1 = document.getElementById(campos[2]) as HTMLInputElement;
    var input2 = document.getElementById(campos[3]) as HTMLInputElement;
    var input3 = document.getElementById(campos[4]) as HTMLInputElement;
    var input4 = document.getElementById(campos[5]) as HTMLInputElement;   
  
    input1.readOnly = true;
    input2.readOnly = true;
    input3.readOnly = true;
    input4.readOnly = true;

    var longitudParam = campos.length;
    
    if((longitudParam - 2) == 5){

      var input5 = document.getElementById(campos[6]) as HTMLInputElement;
      input5.readOnly = true;


    }else if((longitudParam - 2) == 6){
      var input5 = document.getElementById(campos[6]) as HTMLInputElement;
      var input6 = document.getElementById(campos[7]) as HTMLInputElement;
      
      input5.readOnly = true;
      input6.readOnly = true;


    }else if((longitudParam - 2) == 7){
      var input5 = document.getElementById(campos[6]) as HTMLInputElement; 
      var input6 = document.getElementById(campos[7]) as HTMLInputElement;
      var input7= document.getElementById(campos[8]) as HTMLInputElement;

      input5.readOnly = true;
      input6.readOnly = true;
      input7.readOnly = true;

    }

  }

  bloquearCamposConSelect(campos:string[]): void{

    var botonUpdt = document.getElementById(campos[0]) as HTMLButtonElement;
    var botonDlt = document.getElementById(campos[1]) as HTMLButtonElement;

    botonUpdt.disabled = true;
    botonDlt.disabled = true;
  
    var longitudParam = campos.length;
    

    if(longitudParam == 7){

      var select1 = document.getElementById(campos[2]) as HTMLSelectElement;
      var select2 = document.getElementById(campos[3]) as HTMLSelectElement;
      var input1 = document.getElementById(campos[4]) as HTMLInputElement;
      var input2 = document.getElementById(campos[5]) as HTMLInputElement;
      var input3 = document.getElementById(campos[6]) as HTMLInputElement;

      select1.disabled = true;
      select2.disabled = true;

      input1.readOnly = true;
      input2.readOnly = true;
      input3.readOnly = true;
    
    }else if(longitudParam == 9){

      var select1 = document.getElementById(campos[2]) as HTMLSelectElement;
      var input1 = document.getElementById(campos[3]) as HTMLInputElement;
      var input2 = document.getElementById(campos[4]) as HTMLInputElement;
      var input3 = document.getElementById(campos[5]) as HTMLInputElement;
      var input4 = document.getElementById(campos[6]) as HTMLInputElement;
      var input5 = document.getElementById(campos[7]) as HTMLInputElement;
      var input6 = document.getElementById(campos[8]) as HTMLInputElement;

      select1.disabled = true;

      input1.readOnly = true;
      input2.readOnly = true;
      input3.readOnly = true;
      input4.readOnly = true;
      input5.readOnly = true;
      input6.readOnly = true;

    }
  }

  resetFiltrosBusqueda(campos:string[]): void{
    
    var longitudParam = campos.length;

    if(longitudParam == 3){
        
      var input1 = document.getElementById(campos[0]) as HTMLInputElement;
      var input2 = document.getElementById(campos[1]) as HTMLInputElement;
      var input3 = document.getElementById(campos[2]) as HTMLInputElement;
      
      input1.value = '';
      input2.value = '';
      input3.value = '';

    }else if (longitudParam == 4){

      var input1 = document.getElementById(campos[0]) as HTMLInputElement;
      var input2 = document.getElementById(campos[1]) as HTMLInputElement;
      var input3 = document.getElementById(campos[2]) as HTMLInputElement;
      var input4 = document.getElementById(campos[3]) as HTMLInputElement;

      input1.value = '';
      input2.value = '';
      input3.value = '';
      input4.value = '';
    
    }else if (longitudParam == 5){
      
      var input1 = document.getElementById(campos[0]) as HTMLInputElement;
      var input2 = document.getElementById(campos[1]) as HTMLInputElement;
      var input3 = document.getElementById(campos[2]) as HTMLInputElement;
      var input4 = document.getElementById(campos[3]) as HTMLInputElement;
      var input5 = document.getElementById(campos[4]) as HTMLInputElement;

      input1.value = '';
      input2.value = '';
      input3.value = '';
      input4.value = '';
      input5.value = '';

    }

  }

}
