package com.mpueblao.services;

import java.util.List;
import java.util.UUID;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mpueblao.model.*;
import com.mpueblao.dao.AdminRepository;
import com.mpueblao.dao.IssueRepository;
import com.mpueblao.dao.RatingRepository;
import com.mpueblao.dao.SolutionRepository;
import com.mpueblao.dao.UserRepository;

@Service
public class IssueService {
	
	@Autowired
	private AdminRepository admDAO;
	
	@Autowired
	private IssueRepository issueDAO;
	
	@Autowired
	private UserRepository userDAO;
	
	@Autowired
	private SolutionRepository solutDAO;
	
	@Autowired
	private RatingRepository ratingDAO;
	
	private String issId = "issId";
	private String issDescription = "issDescription";
	private String issKeyWord = "issKeyWord";
	private String issFixed = "issFixed";
	private String issSolution = "issSolution";
	private String issDevTeam = "issDevTeam";
	private String issLastModif = "issLastModif";
	private String issDateStart = "issDateStart";
	private String issDateEnd = "issDateEnd";
	
	private String solId = "solId";
	private String solDescript = "solDescript";
	private String solRatingAvg = "solRatingAvg";

	private String emailAcceso = "emailAcceso";
	private String userEmail = "email";
	
	private String ratingId = "ratingId";
	private String scoreRating = "scoreRating";
	
	//-----------------
	//CONSULTAR  ISSUES
	//-----------------
	
	public String consultarIssues(){
		
		List<Issue> listaIssues = this.issueDAO.findAll();
		if(listaIssues.isEmpty()){
			return "";	
		}
		String listaIssuesJSON = issueList(listaIssues);
		return listaIssuesJSON;
	}
	
	public String consultarIssuesDevTeam(JSONObject jso){
		
		User userAux = this.userDAO.findByEmailIgnoreCase(jso.getString(this.userEmail));
		
		if(userAux != null) {
			List <Issue> listaIssues = this.issueDAO.findByIssDevTeamIgnoreCase(userAux.getDevelopTeam());
			
			if(listaIssues.isEmpty()){
				return "";	
			}
		
			String listaIssuesJSON = issueList(listaIssues);
			return listaIssuesJSON;
		
		}else{
			return "No existe las issues";
		}
	}
	
	public String consultarIssuesFilter(JSONObject jso){
		//Controlar si hay algun problema con esa key word 
		List<Issue> listaIssuesFilter = this.issueDAO.findByIssLastModifBetweenAndIssIdContainingIgnoreCaseAndIssKeyWordContainingAndIssFixedContaining(jso.getString(this.issDateStart), jso.getString(this.issDateEnd), jso.getString(this.issId), jso.getString(this.issKeyWord), jso.getString(this.issFixed));
		if(listaIssuesFilter.isEmpty()){
			return "";	
		}
		
		String listaIssuesJSON = issueList(listaIssuesFilter);
		return listaIssuesJSON;
	}
	
	//----------------------
	//CRUD OPERATIONS ISSUES
	//----------------------
	
	public String registrarNuevaIssue(JSONObject jso) {
	
		User userAux = this.userDAO.findByEmailIgnoreCase(jso.getString(this.emailAcceso));
		
		if(userAux != null) {
			Issue issueId = this.issueDAO.findByIssIdIgnoreCase(jso.getString(this.issId));
			if(issueId != null) {
				return this.issId;
			}else if(!userAux.getDevelopTeam().equalsIgnoreCase(jso.getString(this.issId).substring(9))){
				return "errorDevTeamUser";
			}else {
		
				Issue newIssue = new Issue();
				
				newIssue.setIssId(jso.getString(this.issId));
				newIssue.setIssDevTeam(jso.getString(this.issId).substring(9));
				newIssue.setIssDescription(jso.getString(this.issDescription));
				newIssue.setIssKeyWord(jso.getString(this.issKeyWord));
				newIssue.setIssFixed(jso.getString(this.issFixed));
				if(jso.getString(this.issFixed).equals("true")) {
					newIssue.setIssSolution(jso.getString(this.issSolution));
				}else if(jso.getString(this.issFixed).equals("false")){
					newIssue.setIssSolution("No solution yet");
				}
				newIssue.setIssLastModif(jso.getString(this.issLastModif));
				
				this.issueDAO.save(newIssue);
				return "Issue registrada correctamente";
			}
			
		}else {
			return "Inicia sesión con un usuario correcto";
		}		
	}
	
	public String registrarNuevaIssueAdmin(JSONObject jso) {
		
		Admin admAux = this.admDAO.findByEmailIgnoreCase(jso.getString(this.emailAcceso));

		if(admAux != null){
			
			Issue issueId = this.issueDAO.findByIssIdIgnoreCase(jso.getString(this.issId));
			
			if(issueId != null) {
				return this.issId;
			}else if(!jso.getString(this.issDevTeam).equalsIgnoreCase(jso.getString(this.issId).substring(9))){
				return "errorDevTeamUser";
			}else {
		
				Issue newIssue = new Issue();
				
				newIssue.setIssId(jso.getString(this.issId));
				newIssue.setIssDevTeam(jso.getString(this.issId).substring(9));
				newIssue.setIssDescription(jso.getString(this.issDescription));
				newIssue.setIssKeyWord(jso.getString(this.issKeyWord));
				newIssue.setIssFixed(jso.getString(this.issFixed));
				
				if(jso.getString(this.issFixed).equals("true")) {
					newIssue.setIssSolution(jso.getString(this.issSolution));
				}else if(jso.getString(this.issFixed).equals("false")){
					newIssue.setIssSolution("No solution yet");
				}
				newIssue.setIssLastModif(jso.getString(this.issLastModif));

				this.issueDAO.save(newIssue);
				return "Issue registrada correctamente"; 
			}
		}else {
			return "Inicia sesión con un usuario correcto";
		}
	}
	
	public String actualizarIssue(JSONObject jso) {
		
		Issue updtIssue = this.issueDAO.findByIssIdIgnoreCase(jso.getString(this.issId));
		
		if(updtIssue == null) {
			return this.issId;
		}
		
		updtIssue.setIssDevTeam(jso.getString(this.issDevTeam));
		updtIssue.setIssDescription(jso.getString(this.issDescription));
		updtIssue.setIssKeyWord(jso.getString(this.issKeyWord));
		updtIssue.setIssFixed(jso.getString(this.issFixed));
		if(jso.getString(this.issFixed).equals("true")) {
			updtIssue.setIssSolution(jso.getString(this.issSolution));
		}else if(jso.getString(this.issFixed).equals("false")){
			updtIssue.setIssSolution("No solution yet");
		}
		updtIssue.setIssLastModif(jso.getString(this.issLastModif));
		
		this.issueDAO.save(updtIssue);
		return "Issue actualizada correctamente";
	}
	
	public String borrarIssue(JSONObject jso) {
		
		Issue issueAux = this.issueDAO.findByIssIdIgnoreCase(jso.getString(this.issId));
		if(issueAux == null){
			return this.issId;
		}
		this.issueDAO.deleteById(jso.getString(this.issId));
		return "Issue eliminada correctamente";
	}
	
	//-------------------------------
	//-------------------------------
	//RATINGS AND REVIEWS OPERATIONS 
	//-------------------------------
	//-------------------------------
	
	//----------------
	//CONSULTAR (GET)
	//----------------
	
	public String consultarRatings(JSONObject jso){
		
		List<Rating> listaRatings = this.ratingDAO.findBySolIdIgnoreCase(jso.getString(this.solId));
		if(listaRatings.isEmpty()){
			return "";	
		}
		String listaRatingJSON = ratingList(listaRatings);
		return listaRatingJSON;
	}
	
	public String consultarSoluciones(JSONObject jso){
		List<Solution> listaSolutions = this.solutDAO.findByIssIdIgnoreCase(jso.getString(this.issId));
		if(listaSolutions.isEmpty()){
			return "";	
		}
		String listaSolutionsJSON = solutList(listaSolutions);
		return listaSolutionsJSON;
	}
	
	//----------------
	//CRUD OPERATIONS 
	//----------------
	
	public String registrarNuevaSolucion(JSONObject jso) {

		if (jso.getString(this.solDescript).isEmpty()) { 
			return "sinDescript";
		}else {
			Solution newSolution = new Solution();
			String solIdUUID = UUID.randomUUID().toString();
			newSolution.setSolId(solIdUUID);
			newSolution.setIssId(jso.getString(this.issId));
			newSolution.setSolDescript(jso.getString(this.solDescript));
			newSolution.setSolRatingAvg(0);
			
			this.solutDAO.save(newSolution);
			return "Posible solucion registrada correctamente";
		}
	}
	
	public String registrarNuevaValoracion(JSONObject jso) {


		if (jso.getString(this.scoreRating).isEmpty()) { 
			return "sinScore";
		}else {

			Rating newRating = new Rating();
			String ratingIdUUID = UUID.randomUUID().toString();
			newRating.setRatingId(ratingIdUUID);
			newRating.setSolId(jso.getString(this.solId));
			//newRating.setSolId("586acef9-f681-4c2b-9981-1246cca1b351");
			newRating.setScoreRating(jso.getDouble(this.scoreRating));
			newRating.setUserAuthor(jso.getString(this.userEmail));
			
			this.ratingDAO.save(newRating);

			this.actualizarValMedia(newRating.getSolId());
			
			return "Valoración registrada correctamente";
		}
		
	}
	
	//-----------
	//AUX METHODS
	//-----------
	
	public JSONObject issueJSON(Issue issue) {
		JSONObject jso = new JSONObject();
		jso.put(this.issId, issue.getIssId());
		jso.put(this.issDevTeam, issue.getIssDevTeam());
		jso.put(this.issDescription, issue.getIssDescription());
		jso.put(this.issFixed, issue.getIssFixed());
		jso.put(this.issKeyWord, issue.getIssKeyWord());
		jso.put(this.issSolution, issue.getIssSolution());
		jso.put(this.issLastModif, issue.getIssLastModif());
		return jso;    
	}
	
	public String issueList(List<Issue> listaIssues) {
		StringBuilder bld = new StringBuilder();
		for (int i = 0; i<listaIssues.size(); i++) {
			Issue issueT = listaIssues.get(i);
			JSONObject jso = this.issueJSON(issueT);
			if (i == listaIssues.size() - 1)
				bld.append(jso.toString());
			else
				bld.append(jso.toString() + ";");
		}
		return bld.toString();
	}
	
	public JSONObject solutJSON(Solution solut) {
		JSONObject jso = new JSONObject();
		jso.put(this.solId, solut.getSolId());
		jso.put(this.issId, solut.getIssId());
		jso.put(this.solDescript, solut.getSolDescript());
		jso.put(this.solRatingAvg, solut.getSolRatingAvg());
		return jso;    
	}
	
	public String solutList(List<Solution> listaSolutions) {
		StringBuilder bld = new StringBuilder();
		for (int i = 0; i<listaSolutions.size(); i++) {
			Solution solutT = listaSolutions.get(i);
			JSONObject jso = this.solutJSON(solutT);
			if (i == listaSolutions.size() - 1)
				bld.append(jso.toString());
			else
				bld.append(jso.toString() + ";");
		}
		return bld.toString();
	}
	
	public JSONObject ratingJSON(Rating rating) {
		JSONObject jso = new JSONObject();
		
		jso.put(this.ratingId, rating.getRatingId());
		jso.put(this.solId, rating.getSolId());
		//jso.put(this.solId, "586acef9-f681-4c2b-9981-1246cca1b351");
		jso.put(this.scoreRating, rating.getScoreRating());
		jso.put(this.userEmail, rating.getUserAuthor());
		return jso;
	}
	
	public String ratingList(List<Rating> listaRatings) {
		StringBuilder bld = new StringBuilder();
		for (int i = 0; i<listaRatings.size(); i++) {
			Rating ratingT = listaRatings.get(i);
			JSONObject jso = this.ratingJSON(ratingT);
			if (i == listaRatings.size() - 1)
				bld.append(jso.toString());
			else
				bld.append(jso.toString() + ";");
		}
		return bld.toString();
	}
	
	public void actualizarValMedia(String solId) {
		Solution actVal = this.solutDAO.findBySolIdIgnoreCase(solId);
		actVal.setSolRatingAvg(ratingDAO.obtenerValoracionMedia(actVal.getSolId()));
		this.solutDAO.save(actVal);
	}
}
