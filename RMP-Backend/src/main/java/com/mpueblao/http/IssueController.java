package com.mpueblao.http;


import java.util.Map;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.web.server.ResponseStatusException;

import com.mpueblao.services.IssueService;
import com.mpueblao.services.SecurityService;

@RestController
@RequestMapping("issue")
public class IssueController {

	@Autowired
	private IssueService issueService;
	
	@Autowired
	private SecurityService secService;
	
	private String sinAcceso = "No tienes acceso a este servicio";
	
	//----------------
	//CONSULTAR ISSUES
	//----------------
	
	@CrossOrigin
	@GetMapping("/getIssues")
	public ResponseEntity<String> consultarIssues() {	
		try {
			String listaResponse = this.issueService.consultarIssues();  //Recojo la lista en una variable.
			return new ResponseEntity<>(listaResponse, HttpStatus.OK);
		} catch (Exception e) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
		}
	}
	
	@CrossOrigin
	@PostMapping("/getIssuesDevTeam")
	public ResponseEntity<String> consultarIssuesDevT(@RequestBody Map<String, Object> info) {
		JSONObject json = new JSONObject(info);		
		try {
			String listaResponse = this.issueService.consultarIssuesDevTeam(json);  //Recojo la lista en una variable.
			return new ResponseEntity<>(listaResponse, HttpStatus.OK);
		} catch (Exception e) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
		}
	}

	@CrossOrigin
	@PostMapping("/getIssuesFilter")
	public ResponseEntity<String> consultarIssuesFilter(@RequestBody Map<String, Object> info) {
		JSONObject json = new JSONObject(info);		
		try {
			String listaResponse = this.issueService.consultarIssuesFilter(json);  //Recojo la lista en una variable.
			return new ResponseEntity<>(listaResponse, HttpStatus.OK);
		} catch (Exception e) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
		}
	}
	
	//----------------------
	//CRUD OPERATIONS ISSUES
	//----------------------
	
	@CrossOrigin
	@PostMapping("/registerIssue")
	public ResponseEntity<String> crearIssues(@RequestBody Map<String, Object> info) {
		JSONObject json = new JSONObject(info);	
		
		if (!this.secService.accesoUser(json))
			return new ResponseEntity<>(this.sinAcceso, HttpStatus.OK);

		try {
			String response = this.issueService.registrarNuevaIssue(json);  //Recojo la lista en una variable.
			if(response.equals("issId")) {
				return new ResponseEntity<>("Ya existe una Issue con ese ID", HttpStatus.OK);
			}else if(response.equals("errorDevTeamUser")) {
				return new ResponseEntity<>("errorDevTeamUser", HttpStatus.OK);
			}else {
				return new ResponseEntity<>(response, HttpStatus.OK);
			}
		} catch (Exception e) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
		}
	}
	
	@CrossOrigin
	@PostMapping("/registerIssueAdm")
	public ResponseEntity<String> crearIssuesAdm(@RequestBody Map<String, Object> info) {
		JSONObject json = new JSONObject(info);	
		
		if (!this.secService.accesoAdmin(json))
			return new ResponseEntity<>(this.sinAcceso, HttpStatus.OK);

		try {
			String response = this.issueService.registrarNuevaIssueAdmin(json);  //Recojo la lista en una variable.
			if(response.equals("issId")) {
				return new ResponseEntity<>("Ya existe una Issue con ese ID", HttpStatus.OK);
			}else if(response.equals("errorDevTeamUser")) {
				return new ResponseEntity<>("errorDevTeamUser", HttpStatus.OK);
			}else {
				return new ResponseEntity<>(response, HttpStatus.OK);
			}
		} catch (Exception e) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
		}
	}
	
	@CrossOrigin
	@PostMapping("/updateIssue")
	public ResponseEntity<String> actualizarIssues(@RequestBody Map<String, Object> info) {
		JSONObject json = new JSONObject(info);	
		
		if (!this.secService.accesoAdmin(json))
			return new ResponseEntity<>(this.sinAcceso, HttpStatus.OK);
		
		try {
			String response = this.issueService.actualizarIssue(json);  //Recojo la lista en una variable.
			if(response.equals("issId")) {
				return new ResponseEntity<>("Error: el ID de Issue suministrado no existe", HttpStatus.OK);
			}else {
				return new ResponseEntity<>(response, HttpStatus.OK);
			}
		} catch (Exception e) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
		}
	}
	
	@CrossOrigin
	@PostMapping("/deleteIssue")
	public ResponseEntity<String> eliminarIssues(@RequestBody Map<String, Object> info) {
		JSONObject json = new JSONObject(info);		
		
		if (!this.secService.accesoAdmin(json))
			return new ResponseEntity<>(this.sinAcceso, HttpStatus.OK);
		
		try {
			String response = this.issueService.borrarIssue(json);  //Recojo la lista en una variable.
			if(response.equals("issId")) {
				return new ResponseEntity<>("Error: el ID de Issue suministrado no existe", HttpStatus.OK);
			}else {
				return new ResponseEntity<>(response, HttpStatus.OK);
			}
		} catch (Exception e) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
		}
	}
	
	//-------------------------------
	//-------------------------------
	//RATINGS AND REVIEWS OPERATIONS 
	//-------------------------------
	//-------------------------------

	//----------------
	//CONSULTAR (GET)
	//----------------
	
	@CrossOrigin
	@PostMapping("/getRatings")
	public ResponseEntity<String> consultarValoraciones(@RequestBody Map<String, Object> info) {
		JSONObject json = new JSONObject(info);	
		
		if (!this.secService.accesoUser(json) && !this.secService.accesoAdmin(json))
			return new ResponseEntity<>(this.sinAcceso, HttpStatus.OK);
		
		try {
			String listaResponse = this.issueService.consultarRatings(json);  //Recojo la lista en una variable.
			return new ResponseEntity<>(listaResponse, HttpStatus.OK);
		} catch (Exception e) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
		}
	}
	
	@CrossOrigin
	@PostMapping("/getSolutions")
	public ResponseEntity<String> consultarSoluciones(@RequestBody Map<String, Object> info) {	
		JSONObject json = new JSONObject(info);	
		
		try {
			String listaResponse = this.issueService.consultarSoluciones(json);  //Recojo la lista en una variable.
			return new ResponseEntity<>(listaResponse, HttpStatus.OK);
		} catch (Exception e) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
		}
	}
	
	//----------------
	//CRUD OPERATIONS 
	//----------------

	@CrossOrigin
	@PostMapping("/registerSolution")
	public ResponseEntity<String> registrarSolucion(@RequestBody Map<String, Object> info) {
		JSONObject json = new JSONObject(info);	
		
		if (!this.secService.accesoUser(json) && !this.secService.accesoAdmin(json))
			return new ResponseEntity<>(this.sinAcceso, HttpStatus.OK);

		try {
			String response = this.issueService.registrarNuevaSolucion(json);  //Recojo la lista en una variable.
			if(response.equals("sinDescript")) {
				return new ResponseEntity<>("sinDescript", HttpStatus.OK);
			}else {
				return new ResponseEntity<>(response, HttpStatus.OK);
			}
		} catch (Exception e) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
		}
	}
	
	@CrossOrigin
	@PostMapping("/registerRating")
	public ResponseEntity<String> registrarValoracion(@RequestBody Map<String, Object> info) {
		JSONObject json = new JSONObject(info);	
		
		if (!this.secService.accesoUser(json) && !this.secService.accesoAdmin(json))
			return new ResponseEntity<>(this.sinAcceso, HttpStatus.OK);

		try {
			String response = this.issueService.registrarNuevaValoracion(json);  //Recojo la lista en una variable.
			if(response.equals("sinScore")) {
				return new ResponseEntity<>("sinScore", HttpStatus.OK);
			}else {
				return new ResponseEntity<>(response, HttpStatus.OK);
			}
		} catch (Exception e) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
		}
	}
}
