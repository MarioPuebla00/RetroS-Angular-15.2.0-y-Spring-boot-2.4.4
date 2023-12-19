package com.mpueblao.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "Admin", schema = "public")
public class Admin {
	
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

    @Column(name = "rol")
    private String rol;
	
	
	public Admin(String email, String rol) {
		super();
		this.email = email;
		this.rol = rol;
	}
	
	public Admin() {
		super();
	}
	//prue
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

	public String getRol() {
		return rol;
	}
	
	public void setRol(String rol) {
		this.rol = rol;
	}
	
}
