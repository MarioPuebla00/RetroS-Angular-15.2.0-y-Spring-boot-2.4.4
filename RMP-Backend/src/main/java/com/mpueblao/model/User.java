package com.mpueblao.model;

import javax.persistence.*;

@Entity
@Table(name = "User", schema = "public") // Indicamos el nombre de la tabla en la BD
public class User {
		
		@Id	
		@Column(name = "email")
		private String email;
	    
		@Column(name = "name")
		private String name;
		
	    @Column(name = "surname")
		private String surname;
		
	    @Column(name = "pwd")
		private String pwd;
	    
	    @Column(name = "tlf")
		private int tlf;
	    
		@Column(name = "company")
		private String company;
		
		@Column(name = "developTeam")
		private String developTeam;
		
		@Column(name = "supervisor")
		private boolean supervisor;
		
		@Column(name = "rol")
		private String rol;
		
		public User(String name, String surname, String email, String pwd, int tlf, String company, String developTeam, boolean supervisor, String rol){
			this.email = email;
			this.name = name;
			this.surname = surname;
			this.pwd = pwd;
			this.tlf = tlf;
			this.company = company;
			this.developTeam = developTeam;
			this.supervisor = supervisor;
			this.rol = rol;
			
		}
		
		public User() {
			super();
		}
				
		public String getEmail() {
			return email;
		}
		
		public void setEmail(String email) {
			this.email = email;
		}
		
		public String getName() {
			return name;
		}
		
		public void setName(String name) {
			this.name = name;
		}
		
		public String getSurname() {
			return surname;
		}
		
		public void setSurname(String surname) {
			this.surname = surname;
		}
		
		public String getPwd() {
			return pwd;
		}
		
		public void setPwd(String pwd) {
			this.pwd = pwd;
		}
				
		public int getTlf() {
			return tlf;
		}
		
		public void setTlf(int tlf) {
			this.tlf = tlf;
		}
		
		public String getCompany() {
			return company;
		}

		public void setCompany(String company) {
			this.company = company;
		}

		public String getDevelopTeam() {
			return developTeam;
		}

		public void setDevelopTeam(String developTeam) {
			this.developTeam = developTeam;
		}

		public boolean isSupervisor() {
			return supervisor;
		}

		public void setSupervisor(boolean supervisor) {
			this.supervisor = supervisor;
		}
		
		public String getRol() {
			return rol;
		}
		
		public void setRol(String rol) {
			this.rol = rol;
		}

}
