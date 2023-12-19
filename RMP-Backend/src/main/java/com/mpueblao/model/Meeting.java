package com.mpueblao.model;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;


@Entity
@Table(name = "Meeting", schema = "public")
public class Meeting {
	
	@Id
	@Column(name = "meetId")
	private String meetId;
	
	@Column(name = "date")
	private String date;
	
	@Column(name = "company")
	private String company;
	
	@Column(name = "developTeam")
	private String developTeam;
	
	@Column(name = "stage")
	private String stage;
	
	public Meeting(String meetId, String date, String company, String developTeam, String stage) {
		super();
		this.meetId = meetId;
		this.date = date;
		this.company = company;
		this.developTeam = developTeam;
		this.stage = stage;
	}
	
	public Meeting() {
		super();
	}
	
	
	public String getMeetId() {
		return meetId;
	}
	
	public void setMeetId(String meetId) {
		this.meetId=meetId;
	}
	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
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
	public String getStage() {
		return stage;
	}
	public void setStage(String stage) {
		this.stage = stage;
	}
}
