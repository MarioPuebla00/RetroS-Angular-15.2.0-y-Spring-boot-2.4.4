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

import com.mpueblao.services.SecurityService;
import com.mpueblao.services.UserService;

@RestController
@RequestMapping("user")
public class UserController {

	@Autowired
	private UserService userService;
			
	@Autowired
	private SecurityService secService;
	
	private String email = "email";
	
	private String sinAcceso = "No tienes acceso a este servicio"; 
	

	//----------------
	//LOGIN USERS
	//----------------
	
	@CrossOrigin
	@PostMapping("/login")
	public ResponseEntity<String> login(@RequestBody Map<String, Object> info) {
		try {
				JSONObject jso = new JSONObject(info);
				String response = this.userService.login(jso);
	
				if (response.equals("nulo"))
					return new ResponseEntity<>("Usuario o password desconocidas", HttpStatus.OK);
				else {
					return new ResponseEntity<>(response, HttpStatus.OK);
				}//Devuelve el rol: ¿problema de seguridad? COMPROBAR
			} catch (Exception e) {
				throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
			}
	}
	
	@CrossOrigin
	@PostMapping("/accesoUser") 
	public ResponseEntity<String> accesoUser(@RequestBody Map<String, Object> info) {
		try {
				String response = "";
				JSONObject jso = new JSONObject(info);
				if(jso.length() == 0)
					jso.put("emailAcceso", "SinEmail");
				if (!this.secService.accesoUser(jso)) {
					return new ResponseEntity<>(this.sinAcceso, HttpStatus.OK);
				}else{
					return new ResponseEntity<>(response, HttpStatus.OK);
				}
			} catch (Exception e) {
				throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
			}
	}
	
	@CrossOrigin
	@PostMapping("/accesoAdmin") 
	public ResponseEntity<String> accesoAdmin(@RequestBody Map<String, Object> info) {
		try {
				String response = "";
				JSONObject jso = new JSONObject(info);
				if(jso.length() == 0)
					jso.put("emailAcceso", "SinEmail");
				if (!this.secService.accesoAdmin(jso)) {
					return new ResponseEntity<>(this.sinAcceso, HttpStatus.OK);
				}else{
					return new ResponseEntity<>(response, HttpStatus.OK);
				}
			} catch (Exception e) {
				throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
			}
	}
	
	
	//----------------
	//CONSULTAR USERS
	//----------------
	
	@CrossOrigin
	@GetMapping("/getUsers")
	public ResponseEntity<String> consultarUsers() {	
		try {
			String listaResponse = this.userService.consultarUsers();  //Recojo la lista en una variable.
			return new ResponseEntity<>(listaResponse, HttpStatus.OK);
		} catch (Exception e) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
		}
	}
	
	@CrossOrigin
	@PostMapping("/getUserId")
	public ResponseEntity<String> consultarUserId(@RequestBody Map<String, Object> info) {
		JSONObject jso = new JSONObject(info);
		try {
			String response = this.userService.consultarUserPorId(jso);  //Recojo la lista en una variable.
			return new ResponseEntity<>(response, HttpStatus.OK);
		} catch (Exception e) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
		}
	}
	
	@CrossOrigin
	@PostMapping("/getUsersDevT")
	public ResponseEntity<String> consultarUserDevT(@RequestBody Map<String, Object> info) {
		JSONObject jso = new JSONObject(info);
		try {
			String listaResponse = this.userService.consultarUsersDevT(jso);  //Recojo la lista en una variable.
			return new ResponseEntity<>(listaResponse, HttpStatus.OK);
		} catch (Exception e) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
		}
	}
	
	
	@CrossOrigin
	@GetMapping("/getAdmins")
	public ResponseEntity<String> consultarAdmins() {	
		try {
			String listaResponse = this.userService.consultarAdmins();  //Recojo la lista en una variable.
			return new ResponseEntity<>(listaResponse, HttpStatus.OK);
		} catch (Exception e) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
		}
	}
	
	//---------------------
	//CRUD OPERATIONS USERS
	//---------------------
	
	@CrossOrigin
	@PostMapping("/register")
	public ResponseEntity<String> register(@RequestBody Map<String, Object> info) {
		JSONObject jso = new JSONObject(info);
		try {
			String response = "";
			String [] comprobar = this.secService.comprobarPassword(jso);
			if (Boolean.TRUE.equals(Boolean.valueOf(comprobar[0])))
				response = this.userService.register(jso);
			else
				return new ResponseEntity<>(comprobar[1], HttpStatus.OK);
	
			if (response.equals(this.email))
				return new ResponseEntity<>("Ya existe un usuario con ese correo", HttpStatus.OK);
			else {
				return new ResponseEntity<>(response, HttpStatus.OK);
			}
		} catch (Exception e) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
		}
	}
	
	@CrossOrigin
	@PostMapping("/crearAdmin")
	public ResponseEntity<String> crearUsuario(@RequestBody Map<String, Object> info) {
		JSONObject jso = new JSONObject(info);
		
		if (!this.secService.accesoAdmin(jso))
			return new ResponseEntity<>(this.sinAcceso, HttpStatus.OK);
		
		try {
			String response = "";
			String [] comprobar = this.secService.comprobarPassword(jso);
			if (Boolean.TRUE.equals(Boolean.valueOf(comprobar[0])))
				response = this.userService.crearAdmin(jso);
			else
				return new ResponseEntity<>(comprobar[1], HttpStatus.OK);
			if (response.equals(this.email))
				return new ResponseEntity<>("Ya existe un administrador con ese correo", HttpStatus.OK);
			else {
				return new ResponseEntity<>(response, HttpStatus.OK);
			}
		} catch (Exception e) {
				throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
		}
	}
	
	@CrossOrigin
	@PostMapping("/updateUser")
	public ResponseEntity<String> actualizarUsuarios(@RequestBody Map<String, Object> info) {
		JSONObject json = new JSONObject(info);		
		try {
			String response = "";
			String [] comprobar = this.secService.comprobarPassword(json);
			if (Boolean.TRUE.equals(Boolean.valueOf(comprobar[0])))
				response = this.userService.actualizarUsuario(json);//Recojo la lista en una variable.
			else
				return new ResponseEntity<>(comprobar[1], HttpStatus.OK);
			
			if(response.equals("email")) {
				return new ResponseEntity<>("Error: el usuario suministrado no existe", HttpStatus.OK);
			}else {
				return new ResponseEntity<>(response, HttpStatus.OK);
			}
		} catch (Exception e) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
		}
	}
	
	@CrossOrigin
	@PostMapping("/deleteUser")
	public ResponseEntity<String> eliminarUsuarios(@RequestBody Map<String, Object> info) {
		JSONObject json = new JSONObject(info);	
		
		if (!this.secService.accesoAdmin(json))
			return new ResponseEntity<>(this.sinAcceso, HttpStatus.OK);
		
		try {
			String response = this.userService.borrarUsuario(json);  //Recojo la lista en una variable.
			if(response.equals("email")) {
				return new ResponseEntity<>("Error: el usuario suministrado no existe", HttpStatus.OK);
			}else {
				return new ResponseEntity<>(response, HttpStatus.OK);
			}
		} catch (Exception e) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
		}
	}
	
	@CrossOrigin
	@PostMapping("/updateAdmin")
	public ResponseEntity<String> actualizarAdmins(@RequestBody Map<String, Object> info) {
		JSONObject json = new JSONObject(info);	
		
		if (!this.secService.accesoAdmin(json))
			return new ResponseEntity<>(this.sinAcceso, HttpStatus.OK);
		
		try {
			String response = "";
			response = this.userService.actualizarAdmin(json);//Recojo la lista en una variable.		
			
			if(response.equals("email")) {
				return new ResponseEntity<>("Error: el administrador suministrado no existe", HttpStatus.OK);
			}else {
				return new ResponseEntity<>(response, HttpStatus.OK);
			}
		} catch (Exception e) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
		}
	}
	
	@CrossOrigin
	@PostMapping("/deleteAdmin")
	public ResponseEntity<String> eliminarAdmins(@RequestBody Map<String, Object> info) {
		JSONObject json = new JSONObject(info);	
		
		if (!this.secService.accesoAdmin(json))
			return new ResponseEntity<>(this.sinAcceso, HttpStatus.OK);
		
		try {
			String response = this.userService.borrarAdmin(json);  //Recojo la lista en una variable.
			if(response.equals("email")) {
				return new ResponseEntity<>("Error: el administrador suministrado no existe", HttpStatus.OK);
			}else {
				return new ResponseEntity<>(response, HttpStatus.OK);
			}
		} catch (Exception e) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
		}
	}
	
}
