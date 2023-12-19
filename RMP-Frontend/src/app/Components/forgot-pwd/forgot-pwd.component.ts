import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Message, MessageService } from 'primeng/api';

@Component({
  selector: 'app-forgot-pwd',
  templateUrl: './forgot-pwd.component.html',
  styleUrls: ['./forgot-pwd.component.css'],
  providers: [MessageService]
})
export class ForgotPwdComponent {

  loading : boolean = false;
  avisos : Message[] = [];

  constructor(private router: Router, private messageService: MessageService) {}

  ngOnInit(): void{

    var liPestanaAdm = document.getElementById("pestanaAdmin") as HTMLLIElement;
    if(window.sessionStorage.getItem("rol") == 'admin'){
      liPestanaAdm.style.display = "block";
    }else{
      liPestanaAdm.style.display = "none";
    }
    
   }

  enviarCorreo(){

  }
}



