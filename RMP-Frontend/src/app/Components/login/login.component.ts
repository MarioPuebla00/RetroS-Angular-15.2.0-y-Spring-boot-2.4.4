import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { FuncionesBasicasService } from 'src/app/services/funciones-basicas.service';
import { Message, MessageService } from 'primeng/api';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService],
})
export class LoginComponent implements OnInit {


  avisos : Message[] = [];

  loading: boolean = false;
  showPassword: boolean = false;

  funciones: FuncionesBasicasService;

  constructor(private router: Router, private http: HttpClient, private titleService: Title,) {
    this.titleService.setTitle('Login | RetroS');
    this.funciones = new FuncionesBasicasService();
  }

  ngOnInit(): void {
    
    var liPestanaAdm = document.getElementById("pestanaAdmin") as HTMLLIElement;
    if(window.sessionStorage.getItem("rol") == 'admin'){
      liPestanaAdm.style.display = "block";
    }else{
      liPestanaAdm.style.display = "none";
    }
  }

  acceder() {

    var camposCorrectos = 0;
    var recuerdameCampo = document.getElementById("inputRecuerdame") as HTMLInputElement;
    var formCampo = document.getElementById("formLogin") as HTMLInputElement;
    var correoCampo = document.getElementById("email") as HTMLInputElement;
    var pwdCampo = document.getElementById("password") as HTMLInputElement;

    if(recuerdameCampo.checked){
      formCampo.autocomplete = 'on';
      correoCampo.autocomplete = 'on';
      pwdCampo.autocomplete = 'on';
    }

    var errorCorreo = this.funciones.comprobarVacioSombreado(correoCampo?.value);
    if(errorCorreo){
      correoCampo.style.boxShadow = "0px 0px 6px rgba(255, 0, 0, 1.5)";
    }else{
      camposCorrectos+=1;
    }

    var errorPass = this.funciones.comprobarVacioSombreado(pwdCampo?.value);
    if(errorPass){
      pwdCampo.style.boxShadow = "0px 0px 6px rgba(255, 0, 0, 1.5)";
    }else{
      camposCorrectos+=1;
    }

    if (camposCorrectos == 2) {
      this.loading=true;
      correoCampo.style.boxShadow = "none";
      pwdCampo.style.boxShadow = "none";
      this.peticionLoginHttp(correoCampo?.value, pwdCampo?.value);
    }else if((camposCorrectos == 1) && (correoCampo?.value != '')){
      correoCampo.style.boxShadow = "none";
      this.avisos = [{ severity: 'error', summary: '', detail: 'Asegúrate de poner un usuario y una contraseña'},];
    }else if((camposCorrectos == 1) && (pwdCampo?.value != '')){
      pwdCampo.style.boxShadow = "none";
      this.avisos = [{ severity: 'error', summary: '', detail: 'Asegúrate de poner un usuario y una contraseña'},];
    }else{
      this.avisos = [{ severity: 'error', summary: '', detail: 'Asegúrate de poner un usuario y una contraseña'},];
    }
  }

  peticionLoginHttp(email: string, pwd: string): void {
    const headers = {
      'Content-Type': 'application/json'
    };
    const body = {
      "email": email,
      "pwd": pwd
    };

    const url = 'http://localhost:8080/user/login';
    this.http.post(url, body, { headers, responseType: 'text' }).subscribe({
      next: data => {
        this.loading=false;
        if (data.includes("Usuario o password desconocidas")) {
          this.avisos = [{ severity: 'error', summary: '', detail: 'Usuario o contraseña desconocidas'}];
        } else {
          window.sessionStorage.removeItem('rol');
          window.sessionStorage.setItem('rol', data);
          this.avisos = [{ severity: 'sucesss', summary: '', detail: data}];
          window.sessionStorage.removeItem('email');
          window.sessionStorage.setItem('email', email);
          window.sessionStorage.removeItem('pwd');
          window.sessionStorage.setItem('pwd', pwd);

          this.avisos = [{ severity: 'success', summary: '', detail: 'Login correcto' },];
          
       
          if(data === "user"){
            this.router.navigate(['/development-team']);
          }else if(data === "admin"){
            this.router.navigate(['/admin-opt']);
          }else
            this.router.navigate(['/inicio']);
          }
      },
      error: error => {
        this.avisos = [{ severity: 'warn', summary: '', detail: 'Ha ocurrido un error al iniciar sesión' },];
        setTimeout(() => { this.router.navigate(['/inicio']) }, 2500);
      }
    });
  }

  //***********************************************************************
  //***********************FUNCIONES AUXILIARES****************************
  //***********************************************************************

  mostrarPwd(){

    if(this.showPassword == true) this.showPassword = false;
    else this.showPassword = true;
    
    var campo = document.getElementById("password") as HTMLInputElement;

    if(campo.type == 'password') campo.type = 'text';
    else campo.type = 'password';
    
  }

}

