package com.mpueblao.model;

import javax.persistence.*;

@Entity
@Table(name = "Issue", schema = "public")
public class Issue {
	
	@Id
	@Column(name="issId")
	private String issId;
	
	@Column(name="issDevTeam")
	private String issDevTeam;
	
	@Column(name="issDescription")
	private String issDescription;
	
	@Column(name="issKeyWord")
	private String issKeyWord;
	
	@Column(name="issFixed")
	private String issFixed;
	
	@Column(name="issSolution")
	private String issSolution;
	
	@Column(name="issLastModif")
	private String issLastModif;

	public Issue(String issId, String issDevTeam, String issDescription, String issKeyWord, String issFixed, String issSolution, String issLastModif) {
		super();
		this.issId = issId;
		this.issDevTeam = issDevTeam;
		this.issDescription = issDescription;
		this.issKeyWord = issKeyWord;
		this.issFixed = issFixed;
		this.issSolution = issSolution;
		this.issLastModif = issLastModif;
	}
	
	public Issue() {
		super();
	}

	public String getIssId() {
		return issId;
	}

	public void setIssId(String issId) {
		this.issId = issId;
	}
	
	public String getIssDevTeam() {
		return issDevTeam;
	}

	public void setIssDevTeam(String issDevTeam) {
		this.issDevTeam = issDevTeam;
	}
	
	public String getIssDescription() {
		return issDescription;
	}

	public void setIssDescription(String issDescription) {
		this.issDescription = issDescription;
	}

	public String getIssKeyWord() {
		return issKeyWord;
	}

	public void setIssKeyWord(String issKeyWord) {
		this.issKeyWord = issKeyWord;
	}

	public String getIssFixed() {
		return issFixed;
	}

	public void setIssFixed(String issFixed) {
		this.issFixed = issFixed;
	}

	public String getIssSolution() {
		return issSolution;
	}

	public void setIssSolution(String issSolution) {
		this.issSolution = issSolution;
	}
	
	public String getIssLastModif() {
		return issLastModif;
	}

	public void setIssLastModif(String issLastModif) {
		this.issLastModif = issLastModif;
	}
	
}
