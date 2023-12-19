import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {Message, MessageService } from 'primeng/api';

@Component({
  selector: 'app-restablecer-pwd',
  templateUrl: './restablecer-pwd.component.html',
  styleUrls: ['./restablecer-pwd.component.css'],
  providers: [MessageService]
})
export class RestablecerPwdComponent {
  
  loading : boolean = false;
  avisos : Message[] = [];

  showPassword : boolean = false;

  constructor(private router: Router, private messageService: MessageService) {}

  ngOnInit(): void{ 
    
    var liPestanaAdm = document.getElementById("pestanaAdmin") as HTMLLIElement;
    if(window.sessionStorage.getItem("rol") == 'admin'){
      liPestanaAdm.style.display = "block";
    }else{
      liPestanaAdm.style.display = "none";
    }
  }
  
  restablecerPwd(){

  }

  mostrarPwd(){

    if(this.showPassword == true) this.showPassword = false;
    else this.showPassword = true;
    
    var campo = document.getElementById("pwd") as HTMLInputElement;

    if(campo.type == 'password') campo.type = 'text';
    else campo.type = 'password';
    
  }

}


