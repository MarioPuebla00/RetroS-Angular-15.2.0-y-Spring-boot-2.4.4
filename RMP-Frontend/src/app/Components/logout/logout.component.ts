import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmEventType, ConfirmationService, Message, MessageService } from 'primeng/api';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class LogoutComponent {

  avisos : Message[] = [];

  constructor(private router: Router, private confirmationService: ConfirmationService, private messageService: MessageService) {}

  ngOnInit(): void{

    var liPestanaAdm = document.getElementById("pestanaAdmin") as HTMLLIElement;
    if(window.sessionStorage.getItem("rol") == 'admin'){
      liPestanaAdm.style.display = "block";
    }else{
      liPestanaAdm.style.display = "none";
    }
    
    if(window.sessionStorage.length == 0){
      this.avisos = [{ severity: 'warn', summary: '', detail: 'No has iniciado sesión aún. Redireccionando a Inicio de sesión...'}];
      setTimeout(() => { this.router.navigate(['/login'])  }, 2500);   
    }else{
      this.logOut(); 
    }
   
  }

  logOut() {
      this.confirmationService.confirm({
          message: 'Vas a cerrar sesión, ¿quieres continuar?',
          header: 'Advertencia',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
            window.sessionStorage.removeItem('rol');
            window.sessionStorage.removeItem('email');
            window.sessionStorage.removeItem('pwd');    
            var liPestanaAdm = document.getElementById("pestanaAdmin") as HTMLLIElement;
            liPestanaAdm.style.display = "none";
            
            this.avisos = [{ severity: 'info', summary: '', detail: 'Cerraste sesión'}];
            setTimeout(() => { this.router.navigate(['/login'])  }, 2000);      
          },
          reject: (type: any) => {
              switch (type) {
                  case ConfirmEventType.REJECT:
                    this.avisos = [{ severity: 'info', summary: '', detail: 'Volviendo a Equipo'}];
                    setTimeout(() => { this.router.navigate(['/development-team'])  }, 2000);      
                    break;

                  case ConfirmEventType.CANCEL:
                    this.avisos = [{ severity: 'info', summary: '', detail: 'Volviendo a Equipo'}];
                    setTimeout(() => { this.router.navigate(['/development-team'])  }, 2000); 
                    break;
              }
          }
      });
  }
}
