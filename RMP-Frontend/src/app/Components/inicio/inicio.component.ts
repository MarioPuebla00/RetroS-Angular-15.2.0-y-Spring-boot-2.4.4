import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})

export class InicioComponent {
  avisoEmail: string = "";
  avisoPwd: string = "";
  tipoUser: string = "";
  feedback: string = "";


  URL: string = "http://localhost:8080/";

  constructor(private router: Router, private http: HttpClient, private titleService: Title) {
    this.titleService.setTitle('Inicio | RetroS');
  }

  ngOnInit(): void {
    
    var liPestanaAdm = document.getElementById("pestanaAdmin") as HTMLLIElement;
    if(window.sessionStorage.getItem("rol") == 'admin'){
      liPestanaAdm.style.display = "block";
    }else{
      liPestanaAdm.style.display = "none";
    }
  
  }

  login(){
    this.router.navigate(['/login']);
  }

  registro(){
    this.router.navigate(['/registro']);
  }
}