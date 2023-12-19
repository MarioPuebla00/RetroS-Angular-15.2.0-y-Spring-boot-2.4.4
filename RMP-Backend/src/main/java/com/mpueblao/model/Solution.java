package com.mpueblao.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "Solution", schema = "public")	
public class Solution {

		@Id		    
		@Column(name="solId")
		private String solId;
		
		@Column(name="issId")
		private String issId;
		
	    @Column(name = "solDescript")
		private String solDescript;
	    
		@Column(name="solRatingAvg")
		private double solRatingAvg;

		public Solution(String solId, String issId, String solDescript, double solRatingAvg) {
			super();
			this.solId = solId;
			this.issId = issId;
			this.solDescript = solDescript;
			this.solRatingAvg = solRatingAvg;
		}
		
		public Solution() {
			super();
		}
		
		public String getSolId() {
			return solId;
		}

		public void setSolId(String solId) {
			this.solId = solId;
		}

		public String getIssId() {
			return issId;
		}

		public void setIssId(String issId) {
			this.issId = issId;
		}

		public String getSolDescript() {
			return solDescript;
		}

		public void setSolDescript(String solDescript) {
			this.solDescript = solDescript;
		}

		public double getSolRatingAvg() {
			return solRatingAvg;
		}

		public void setSolRatingAvg(double solRatingAvg) {
			this.solRatingAvg = solRatingAvg;
		}

}
