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

import com.mpueblao.services.MeetingService;
import com.mpueblao.services.SecurityService;



@RestController
@RequestMapping("meeting")
public class MeetingController {
	
	@Autowired
	private MeetingService meetService;
	
	@Autowired
	private SecurityService secService;
	
	private String sinAcceso = "No tienes acceso a este servicio";
	//----------------
	//CONSULTAR ISSUES
	//----------------
	
	@CrossOrigin
	@GetMapping("/getMeetings")
	public ResponseEntity<String> consultarMeetings() {	
		try {
			String listaResponse = this.meetService.consultarMeetings();  //Recojo la lista en una variable.
			return new ResponseEntity<>(listaResponse, HttpStatus.OK);
		} catch (Exception e) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
		}
	}
	
	@CrossOrigin
	@PostMapping("/getMeetingsDevT")
	public ResponseEntity<String> consultarMeetingsDevT(@RequestBody Map<String, Object> info) {
		JSONObject jso = new JSONObject(info);	
		try {
			String listaResponse = this.meetService.consultarMeetingsDevT(jso); 
			return new ResponseEntity<>(listaResponse, HttpStatus.OK);
		} catch (Exception e) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
		}
	}

	@CrossOrigin
	@PostMapping("/getMeetingsFilter")
	public ResponseEntity<String> consultarMeetingsFilter(@RequestBody Map<String, Object> info) {
		JSONObject jso = new JSONObject(info);	
		try {	
			String listaResponse = this.meetService.consultarMeetingsFilter(jso);  //Recojo la lista en una variable.
			return new ResponseEntity<>(listaResponse, HttpStatus.OK);
		} catch (Exception e) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
		}
	}
	
	//----------------------
	//CRUD OPERATIONS ISSUES
	//----------------------
	
	@CrossOrigin
	@PostMapping("/registerMeeting")
	public ResponseEntity<String> crearMeeting(@RequestBody Map<String, Object> info) {
		JSONObject json = new JSONObject(info);	
		
		if (!this.secService.accesoUser(json) && !this.secService.accesoAdmin(json))
			return new ResponseEntity<>(this.sinAcceso, HttpStatus.OK);
		
		try {
			String response = this.meetService.registrarNuevaMeeting(json);  //Recojo la lista en una variable.
			if(response.equals("meetId")) {
				return new ResponseEntity<>("Error en el registro de la reunion", HttpStatus.OK);
			}else {
				return new ResponseEntity<>(response, HttpStatus.OK);
			}
		} catch (Exception e) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
		}
	}
	
	@CrossOrigin
	@PostMapping("/updateMeeting")
	public ResponseEntity<String> actualizarMeetings(@RequestBody Map<String, Object> info) {
		JSONObject json = new JSONObject(info);

		if (!this.secService.accesoUser(json) && !this.secService.accesoAdmin(json))
			return new ResponseEntity<>(this.sinAcceso, HttpStatus.OK);
		
		try {
			String response = this.meetService.actualizarMeeting(json);  //Recojo la lista en una variable.
			if(response.equals("updtMeeting")) {
				return new ResponseEntity<>("Error: el ID de reunion suministrado no existe", HttpStatus.OK);
			}else {
				return new ResponseEntity<>(response, HttpStatus.OK);
			}
		} catch (Exception e) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
		}
	}
	
	@CrossOrigin
	@PostMapping("/deleteMeeting")
	public ResponseEntity<String> eliminarMeetings(@RequestBody Map<String, Object> info) {
		JSONObject json = new JSONObject(info);	
		
		if (!this.secService.accesoUser(json) && !this.secService.accesoAdmin(json))
			return new ResponseEntity<>(this.sinAcceso, HttpStatus.OK);
		
		try {
			String response = this.meetService.borrarMeeting(json);  //Recojo la lista en una variable.
			if(response.equals("meetId")) {
				return new ResponseEntity<>("Error: el ID de reunion suministrado no existe", HttpStatus.OK);
			}else {
				return new ResponseEntity<>(response, HttpStatus.OK);
			}
		} catch (Exception e) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
		}
	}
}
