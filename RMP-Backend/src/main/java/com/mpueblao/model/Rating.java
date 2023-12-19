package com.mpueblao.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "Rating", schema = "public")
public class Rating {
	
	@Id	
	@Column(name = "ratingId")    
	private String ratingId;
    
    @Column(name = "solId")
    private String solId;
	
    @Column(name = "scoreRating")
	private double scoreRating;
    
	@Column(name="userAuthor")
	private String userAuthor;

	public Rating(String ratingId, String solId, int scoreRating, String userAuthor) {
		super();
		this.ratingId = ratingId;
		this.solId = solId;
		this.scoreRating = scoreRating;
		this.userAuthor = userAuthor;
	}
	
	public Rating() {
		super();
	}

	public String getRatingId() {
		return ratingId;
	}

	public void setRatingId(String ratingId) {
		this.ratingId = ratingId;
	}

	public String getSolId() {
		return solId;
	}

	public void setSolId(String solId) {
		this.solId = solId;
	}

	public double getScoreRating() {
		return scoreRating;
	}

	public void setScoreRating(double scoreRating) {
		this.scoreRating = scoreRating;
	}

	public String getUserAuthor() {
		return userAuthor;
	}

	public void setUserAuthor(String userAuthor) {
		this.userAuthor = userAuthor;
	}
    
	
	
    
}
