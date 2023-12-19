package com.mpueblao.services;

import java.util.List;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mpueblao.dao.AdminRepository;
//import com.mpueblao.dao.MeetingRepository;
import com.mpueblao.dao.UserRepository;

import com.mpueblao.model.Admin;
import com.mpueblao.model.Meeting;

import com.mpueblao.model.User;

@Service
public class UserService {

	@Autowired
	private UserRepository userDAO;

//	@Autowired
//	private MeetingRepository meetDAO;

	@Autowired
	private AdminRepository admDAO;
	
	private String email = "email";
	private String user = "user";
	private String admin = "admin";
	private String tlf = "tlf";
	private String name = "name";
	private String surname = "surname";
	private String pwd1 = "pwd1";
	private String company = "company";
	private String developTeam = "developTeam";
	private String supervisor = "supervisor";
	private String rol = "rol";

	@Autowired
	private SecurityService secService;
	
	//-----------------
	//LOGIN  USERS
	//-----------------
	
	public String login(JSONObject jso){
		String rol = "nulo";
		User userLogin = this.userDAO.findByEmailIgnoreCase(jso.getString(this.email));
		Admin admLogin = this.admDAO.findByEmailIgnoreCase(jso.getString(this.email));
		if (userLogin != null) {
			String pwdUser = this.secService.desencriptar(userLogin.getPwd());
			if (pwdUser.equals(jso.getString("pwd"))) {
				if (userLogin.getRol().equals(this.user))
					rol = this.user;
			}
			
		}else if(admLogin != null){
			String pwdAdm = this.secService.desencriptar(admLogin.getPwd());
			if (pwdAdm.equals(jso.getString("pwd"))) {
				if(admLogin.getRol().equals(this.admin))
					rol = this.admin;
			}
	
		}
		return rol;
	}
	
	//-----------------
	//CONSULTAR  USERS
	//-----------------
	
	public String consultarUsers(){
		//Controlar si hay algun problema con esa key word 
		List<User> listaUsers = this.userDAO.findAll();
		if(listaUsers.isEmpty()){
			return "";	
		}
		
		String listaUsersJSON = usersList(listaUsers);
		return listaUsersJSON;
	}
		
	public String consultarUserPorId(JSONObject jso){
		//Controlar si hay algun problema con esa key word 
		
		User userAux = this.userDAO.findByEmailIgnoreCase(jso.getString(this.email));
		Admin admAux = this.admDAO.findByEmail(jso.getString(this.email));
		
		if(userAux != null) {
			
			String userJSON = userJSON(userAux).toString();
			return userJSON;
		
		}else if(admAux != null){
			
			String admJSON = adminJSON(admAux).toString();
			return admJSON;
		}else{
			return "No existe el usuario";
		}
	}
	
	public String consultarUsersDevT(JSONObject jso){
		//Controlar si hay algun problema con esa key word 
		
		User userAux = this.userDAO.findByEmailIgnoreCase(jso.getString(this.email));
		
		if(userAux != null) {
			List<User> listaUsers = this.userDAO.findByDevelopTeamIgnoreCase(userAux.getDevelopTeam());
			
			if(listaUsers.isEmpty()){
				return "";	
			}
		
			String listaUsersJSON = usersList(listaUsers);
			return listaUsersJSON;
		
		}else{
			return "No existe el usuario";
		}
	}
	
	public String consultarAdmins(){
		//Controlar si hay algun problema con esa key word 
		List<Admin> listaAdmins = this.admDAO.findAll();
		if(listaAdmins.isEmpty()){
			return "";	
		}
		
		String listaAdminJSON = adminList(listaAdmins);
		return listaAdminJSON;
	}

	//----------------------
	//CRUD OPERATIONS ISSUES
	//----------------------
	
	public String register(JSONObject jso) {

		User userEmail = this.userDAO.findByEmailIgnoreCase(jso.getString(this.email));
		if (userEmail != null) 
			return this.email;

		User newUser = crearUsuarioAux(jso);
		this.userDAO.save(newUser);
		
		return "Registro completado";
	}

	public String crearAdmin(JSONObject jso){ //Puede que evolucione a que el admin ambien cree usuarios si le dan los datos correspodientes

		Admin admEmail = this.admDAO.findByEmailIgnoreCase(jso.getString(this.email));
		if (admEmail != null)
			return this.email;
				
		Admin newAdm = crearAdminAux(jso);
		this.admDAO.save(newAdm);
		
		return "Admin creado correctamente";
	}
		
	public String actualizarUsuario(JSONObject jso) {
		
		User updtUser = this.userDAO.findByEmailIgnoreCase(jso.getString(this.email));

		if(updtUser == null) {
			return this.email;
		}
		
		updtUser.setName(jso.getString(this.name));
		updtUser.setSurname(jso.getString(this.surname));
		updtUser.setPwd(this.secService.encriptar(jso.getString(this.pwd1)));
		updtUser.setTlf(jso.getInt(this.tlf));
		updtUser.setCompany(jso.getString(this.company));
		updtUser.setDevelopTeam(jso.getString(this.developTeam));
		updtUser.setSupervisor(jso.getBoolean(this.supervisor));

		this.userDAO.save(updtUser);
		return "Usuario actualizado correctamente";
	}
	
	public String borrarUsuario(JSONObject jso) {

		User userAux = this.userDAO.findByEmailIgnoreCase(jso.getString(this.email));

		if(userAux == null) {
			return this.email;
		}
		
		this.userDAO.deleteById(jso.getString(this.email));
		return "Usuario eliminado correctamente";
	}
	
	public String actualizarAdmin(JSONObject jso) {
		
		Admin updtAdm = this.admDAO.findByEmailIgnoreCase(jso.getString(this.email));
		
		if(updtAdm == null) {
			return this.email;
		}
		
		updtAdm.setName(jso.getString(this.name));
		updtAdm.setSurname(jso.getString(this.surname));
		//updtAdm.setPwd(this.secService.encriptar(jso.getString(this.pwd1)));
		updtAdm.setTlf(jso.getInt(this.tlf));
		
		this.admDAO.save(updtAdm);
		return "Admin actualizado correctamente";
	}
	
	public String borrarAdmin(JSONObject jso) {
		
		Admin dltAdm = this.admDAO.findByEmailIgnoreCase(jso.getString(this.email));

		if(dltAdm == null) {
			return this.email;
		}
		
		this.admDAO.deleteById(jso.getString(this.email));
		return "Admin eliminado correctamente";
	}
	
	//-----------
	//AUX METHODS
	//-----------
	
	public JSONObject userJSON(User user) {
		JSONObject jso = new JSONObject();
		jso.put(this.email, user.getEmail());
		jso.put(this.name, user.getName());
		jso.put(this.pwd1, user.getPwd());
		jso.put(this.surname, user.getSurname());
		jso.put(this.tlf, user.getTlf());
		jso.put(this.company, user.getCompany());
		jso.put(this.developTeam, user.getDevelopTeam());
		jso.put(this.supervisor, user.isSupervisor());
		jso.put(this.rol, user.getRol());
		return jso;    
	}
		
	public JSONObject adminJSON(Admin adm) {
		JSONObject jso = new JSONObject();
		jso.put(this.email, adm.getEmail());
		jso.put(this.name, adm.getName());
		jso.put(this.pwd1, adm.getPwd());
		jso.put(this.surname, adm.getSurname());
		jso.put(this.tlf, adm.getTlf());
		jso.put(this.rol, adm.getRol());
		return jso;    
	}
	
	public String usersList(List<User> listaUsers) {
		StringBuilder bld = new StringBuilder();
		for (int i = 0; i<listaUsers.size(); i++) {
			User userT = listaUsers.get(i);
			JSONObject jso = this.userJSON(userT);
			if (i == listaUsers.size() - 1)
				bld.append(jso.toString());
			else
				bld.append(jso.toString() + ";");
		}
		return bld.toString();
	}
		
	public String adminList(List<Admin> listaAdmin) {
		StringBuilder bld = new StringBuilder();
		for (int i = 0; i<listaAdmin.size(); i++) {
			Admin admT = listaAdmin.get(i);
			JSONObject jso = this.adminJSON(admT);
			if (i == listaAdmin.size() - 1)
				bld.append(jso.toString());
			else
				bld.append(jso.toString() + ";");
		}
		return bld.toString();
	}
	
	public User crearUsuarioAux(JSONObject jso) {
		User newUser = new User();
		newUser.setName(jso.getString(this.name));
		newUser.setSurname(jso.getString(this.surname));
		newUser.setEmail(jso.getString(this.email));
		newUser.setPwd(this.secService.encriptar(jso.getString(this.pwd1)));
		newUser.setTlf(jso.getInt(this.tlf));
		newUser.setCompany(jso.getString(this.company));
		newUser.setDevelopTeam(jso.getString(this.developTeam));
		newUser.setSupervisor(jso.getBoolean(this.supervisor));
		newUser.setRol("user");
		return newUser;
	}
	
	public Admin crearAdminAux(JSONObject jso) {
		Admin newAdm = new Admin();
		newAdm.setEmail(jso.getString(this.email));
		newAdm.setName(jso.getString(this.name));
		newAdm.setSurname(jso.getString(this.surname));
		newAdm.setPwd(this.secService.encriptar(jso.getString(this.pwd1)));
		newAdm.setTlf(jso.getInt(this.tlf));
		newAdm.setRol("admin");
		return newAdm;
	}
}
