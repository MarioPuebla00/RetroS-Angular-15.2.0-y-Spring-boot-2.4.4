package com.mpueblao.RMP;

import static org.junit.Assert.assertArrayEquals;
import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.ArrayList;

import org.json.JSONException;
import org.json.JSONObject;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;


import com.mpueblao.services.IssueService;
import com.mpueblao.services.MeetingService;
import com.mpueblao.services.SecurityService;
import com.mpueblao.services.UserService;

@SpringBootTest
class RmpApplicationTests {

	@Autowired
	private UserService userService;

	@Autowired
	private SecurityService secService;
	
	@Autowired
	private IssueService issService;
	
	@Autowired
	private MeetingService meetService;
	
	@Test
	void testUserService() throws JSONException {
		this.UserTests(); //Comprobado 1:15 24/04/2023		|
		this.AdminTests(); //Comprobado 1:15 24/04/2023 	|[25/04/2023]
		this.IssueTests(); //Comprobado 10:00 24/04/2023	|}_ RMP Coverage  Covered instructions  Missed instructions  Total instructions
		this.MeetingTests(); //Comprobado 11:30 24/04/2023  |}/		 78,4%		      3020                 830                 3850
		this.SecurityTests(); //Comprobado 12:50 25/04/2023 |
	}
	
	/***************************************
	 ********** TEST USER SERVICE***********
	 *************************************** */
	
	void UserTests() throws JSONException {
				
		//CrearUsuario
		
		JSONObject registro = new JSONObject();
		registro.put("email", "Prueba");
		registro.put("name", "MarioPrueba");	
		registro.put("surname", "ApellidoPrueba");
		registro.put("pwd1", "Mpueblao2000");
		registro.put("pwd2", "Mpueblao2000");
		registro.put("tlf", "234234234");
		registro.put("company", "EmpresaPrueba");
		registro.put("developTeam", "EquipoPrueba");
		registro.put("supervisor", true);
		assertEquals("Registro completado", userService.register(registro));

		JSONObject registro2 = new JSONObject();
		registro2.put("email", "Prueba");
		registro2.put("name", "MarioPrueba");	
		registro2.put("surname", "ApellidoPrueba");
		registro2.put("pwd1", "Mpueblao2000");
		registro2.put("pwd2", "Mpueblao2000");
		registro2.put("tlf", "234234234");
		registro2.put("company", "EmpresaPrueba");
		registro2.put("developTeam", "EquipoPrueba");
		registro2.put("supervisor", true);
		assertEquals("email", userService.register(registro2));

		//Login
		
		JSONObject jsoLogin = new JSONObject();
		jsoLogin.put("pwd", "Mpueblao2000");
		jsoLogin.put("email", "Prueba");
		assertEquals("user", userService.login(jsoLogin));
		
		JSONObject jsoLoginF = new JSONObject();
		jsoLoginF.put("pwd", "Mpueblao200033");
		jsoLoginF.put("email", "marioprueba1@gmail.com");
		assertEquals("nulo", userService.login(jsoLoginF));

		//Actualizar usuarios
		
		JSONObject jsoUpdate = new JSONObject();
		jsoUpdate.put("email", "Prueba");
		jsoUpdate.put("name", "MarioPrueba");	
		jsoUpdate.put("surname", "ApellidoPrueba");
		jsoUpdate.put("pwd1", "Mpueblao2000");
		jsoUpdate.put("pwd2", "Mpueblao2000");
		jsoUpdate.put("tlf", "234234333");
		jsoUpdate.put("company", "EmpresaPrueba");
		jsoUpdate.put("developTeam", "EquipoPrueba");
		jsoUpdate.put("supervisor", true);
		assertEquals("Usuario actualizado correctamente", userService.actualizarUsuario(jsoUpdate));
		
		JSONObject jsoUpdateF = new JSONObject();
		jsoUpdateF.put("email", "No existe@gmail.com");
		jsoUpdateF.put("name", "MarioPrueba");	
		jsoUpdateF.put("surname", "ApellidoPrueba");
		jsoUpdateF.put("pwd1", "Mpueblao2000");
		jsoUpdateF.put("pwd2", "Mpueblao2000");
		jsoUpdateF.put("tlf", "234234333");
		jsoUpdateF.put("company", "EmpresaPrueba");
		jsoUpdateF.put("developTeam", "EquipoPrueba");
		jsoUpdateF.put("supervisor", true);
		System.out.println(jsoUpdateF);
		assertEquals("email", userService.actualizarUsuario(jsoUpdateF));
		
		//Consulta usuarios (SI hay registrados)
		
		assertEquals(String.class, userService.consultarUsers().getClass());
		assertEquals(String.class, userService.consultarAdmins().getClass());
		
		//Borrar usuarios
		
		JSONObject jsoDelete = new JSONObject();
		jsoDelete.put("email", "Prueba");
		assertEquals("Usuario eliminado correctamente", userService.borrarUsuario(jsoDelete));
		
		JSONObject jsoDeleteF = new JSONObject();
		jsoDeleteF.put("email", "Prueba");
		assertEquals("email", userService.borrarUsuario(jsoDelete));
		
		/*Consulta usuarios (No hay registrados)

		assertEquals("", userService.consultarUsers());
		assertEquals("", userService.consultarAdmins());*/
	}
	
	/***************************************
	 ********** TEST ADMIN SERVICE***********
	 *************************************** */

	void AdminTests() throws JSONException {
		
		//CrearUsuarioAdmin
		JSONObject registro = new JSONObject();
		registro.put("email", "marioAdminPrueba2@gmail.com");
		registro.put("name", "Mario");
		registro.put("surname", "Puebla");
		registro.put("pwd1", "Mpueblao2000");
		registro.put("pwd2", "Mpueblao2000");
		registro.put("tlf", "234234234");
		assertEquals("Admin creado correctamente", userService.crearAdmin(registro));
		
		JSONObject registroF = new JSONObject();
		registroF.put("email", "marioAdminPrueba2@gmail.com");
		registroF.put("name", "Mario");
		registroF.put("surname", "Puebla");
		registroF.put("pwd1", "Mpueblao2000");
		registroF.put("pwd2", "Mpueblao2000");
		registroF.put("tlf", "234234234");
		assertEquals("email", userService.crearAdmin(registroF));
		
		//Login
		JSONObject jsoLoginAdm = new JSONObject();
		jsoLoginAdm.put("email", "marioAdminPrueba@gmail.com");
		jsoLoginAdm.put("pwd", "Mpueblao2000");
		assertEquals("admin", userService.login(jsoLoginAdm));
		
		JSONObject jsoLoginAdmF = new JSONObject();
		jsoLoginAdmF.put("email", "marioAdminPrueba@gmail.com");
		jsoLoginAdmF.put("pwd", "Mpueblao200033");
		assertEquals("nulo", userService.login(jsoLoginAdmF));
		
		//Update admin
		
		JSONObject jsoUpdateAdm = new JSONObject();
		jsoUpdateAdm.put("email", "marioAdminPrueba2@gmail.com");
		jsoUpdateAdm.put("name", "MarioPrueba");	
		jsoUpdateAdm.put("surname", "ApellidoPrueba");
		jsoUpdateAdm.put("pwd1", "Mpueblao2000");
		jsoUpdateAdm.put("pwd2", "Mpueblao2000");
		jsoUpdateAdm.put("tlf", "234234333");
		assertEquals("Admin actualizado correctamente", userService.actualizarAdmin(jsoUpdateAdm));
		
		JSONObject jsoUpdateAdmF = new JSONObject();
		jsoUpdateAdmF.put("email", "No existe@gmail.com");
		jsoUpdateAdmF.put("name", "MarioPrueba");	
		jsoUpdateAdmF.put("surname", "ApellidoPrueba");
		jsoUpdateAdmF.put("pwd1", "Mpueblao2000");
		jsoUpdateAdmF.put("pwd2", "Mpueblao2000");
		jsoUpdateAdmF.put("tlf", "234234333");
		System.out.println(jsoUpdateAdmF);
		assertEquals("email", userService.actualizarAdmin(jsoUpdateAdmF));
		
		//Borrar administrador
		
		JSONObject jsoDeleteAdm = new JSONObject();
		jsoDeleteAdm.put("email", "marioAdminPrueba2@gmail.com");
		assertEquals("Admin eliminado correctamente", userService.borrarAdmin(jsoDeleteAdm));
		
		JSONObject jsoDeleteAdmF = new JSONObject();
		jsoDeleteAdmF.put("email", "marioAdminPrueba2@gmail.com");
		assertEquals("email", userService.borrarAdmin(jsoDeleteAdmF));

	}
	
	/***************************************
	 ********** TEST ISSUE SERVICE***********
	 *************************************** */
	
	void IssueTests() throws JSONException {
				
		//Registrar Issue
		
		JSONObject jsoRegIssue = new JSONObject();
		jsoRegIssue.put("issId", "issPRUEBA");
		jsoRegIssue.put("issDescription", "issPRUEBA");
		jsoRegIssue.put("issKeyWord", "issPRUEBA");
		jsoRegIssue.put("issFixed", "true");
		jsoRegIssue.put("issSolution", "issPRUEBA");
		assertEquals("Issue registrada correctamente", issService.registrarNuevaIssue(jsoRegIssue));
		
		JSONObject jsoRegIssue2 = new JSONObject();
		jsoRegIssue2.put("issId", "issPRUEBA2");
		jsoRegIssue2.put("issDescription", "issPRUEBA");
		jsoRegIssue2.put("issKeyWord", "issPRUEBA");
		jsoRegIssue2.put("issFixed", "false");
		jsoRegIssue2.put("issSolution", "issPRUEBA");
		assertEquals("Issue registrada correctamente", issService.registrarNuevaIssue(jsoRegIssue2));
		
		JSONObject jsoRegIssueF = new JSONObject();
		jsoRegIssueF.put("issId", "issPRUEBA");
		jsoRegIssueF.put("issDescription", "issPRUEBA");
		jsoRegIssueF.put("issKeyWord", "issPRUEBA");
		jsoRegIssueF.put("issFixed", "true");
		jsoRegIssueF.put("issSolution", "issPRUEBA");
		assertEquals("issId", issService.registrarNuevaIssue(jsoRegIssueF));
		
		//Actualizar issue
		
		JSONObject jsoUpdtIssue = new JSONObject();
		jsoUpdtIssue.put("issId", "issPRUEBA");
		jsoUpdtIssue.put("issDescription", "issDESCRIPTION");
		jsoUpdtIssue.put("issKeyWord", "issPRUEBA");
		jsoUpdtIssue.put("issFixed", "false");
		jsoUpdtIssue.put("issSolution", "issPRUEBA");
		assertEquals("Issue actualizada correctamente", issService.actualizarIssue(jsoUpdtIssue));
		
		JSONObject jsoUpdtIssue2 = new JSONObject();
		jsoUpdtIssue2.put("issId", "issPRUEBA");
		jsoUpdtIssue2.put("issDescription", "issDESCRIPTION");
		jsoUpdtIssue2.put("issKeyWord", "comunication");
		jsoUpdtIssue2.put("issFixed", "true");
		jsoUpdtIssue2.put("issSolution", "issPRUEBA");
		assertEquals("Issue actualizada correctamente", issService.actualizarIssue(jsoUpdtIssue2));
		
		JSONObject jsoUpdtIssueF = new JSONObject();
		jsoUpdtIssueF.put("issId", "aaaaaaeeeee");
		jsoUpdtIssueF.put("issDescription", "issPRUEBA");
		jsoUpdtIssueF.put("issKeyWord", "issPRUEBA");
		jsoUpdtIssueF.put("issFixed", "true");
		jsoUpdtIssueF.put("issSolution", "issPRUEBA");
		assertEquals("issId", issService.actualizarIssue(jsoUpdtIssueF));
		
		//Consultar Issues (Si hay registradas)
		
		JSONObject jsoGetIssues = new JSONObject ();
		jsoGetIssues.put("issKeyWord", "comunication");
		jsoGetIssues.put("issFixed", "true");
		assertEquals(String.class, issService.consultarIssues().getClass());
		//assertEquals(String.class, issService.consultarIssuesFixed(jsoGetIssues).getClass());
		//assertEquals(String.class, issService.consultarIssuesKW(jsoGetIssues).getClass());
		
		//Borrar Issues
		
		JSONObject jsoDltIssue = new JSONObject();
		jsoDltIssue.put("issId", "issPRUEBA");
		assertEquals("Issue eliminada correctamente", issService.borrarIssue(jsoDltIssue));
		
		JSONObject jsoDltIssue2 = new JSONObject();
		jsoDltIssue2.put("issId", "issPRUEBA2");
		assertEquals("Issue eliminada correctamente", issService.borrarIssue(jsoDltIssue2));
		
		JSONObject jsoDltIssueF = new JSONObject();
		jsoDltIssueF.put("issId", "aaaaaaeeeee");
		assertEquals("issId", issService.borrarIssue(jsoDltIssueF));
		
		//Consultar Issues (No hay registradas)

		assertEquals("", issService.consultarIssues());
//		assertEquals("No existen Issues registrados", issService.consultarIssuesFixed(jsoGetIssues));
//		assertEquals("No existen Issues con esa palabra clave", issService.consultarIssuesKW(jsoGetIssues));
		
	}

	/***************************************
	 ********** TEST MEETING SERVICE*********
	 *************************************** */
	
	void MeetingTests() throws JSONException{
	
		//Registrar Meeting
	
		JSONObject jsoRegMeet = new JSONObject();
		jsoRegMeet.put("meetId", "meetPRUEBA");
		jsoRegMeet.put("meetCompany", "meetPRUEBA");
		jsoRegMeet.put("meetDate", "issPRUEBA");
		jsoRegMeet.put("meetDevelopTeam", "meetPRUEBA");
		jsoRegMeet.put("meetStage", "meetPRUEBA");
		assertEquals("Meeting registrada correctamente", meetService.registrarNuevaMeeting(jsoRegMeet));
		
		JSONObject jsoRegMeetF = new JSONObject();
		jsoRegMeetF.put("meetId", "meetPRUEBA");
		jsoRegMeetF.put("meetCompany", "meetPRUEBA");
		jsoRegMeetF.put("meetDate", "00/00/22");
		jsoRegMeetF.put("meetDevelopTeam", "meetPRUEBA");
		jsoRegMeetF.put("meetStage", "meetPRUEBA");
		assertEquals("meetId", meetService.registrarNuevaMeeting(jsoRegMeetF));
		
		//Actualizar meeting
		
		JSONObject jsoUpdtMeet = new JSONObject();
		jsoUpdtMeet.put("meetId", "meetPRUEBA");
		jsoUpdtMeet.put("meetCompany", "meetPRUEBA");
		jsoUpdtMeet.put("meetDate", "23/02/2022");
		jsoUpdtMeet.put("meetDevelopTeam", "meetPRUEBA");
		jsoUpdtMeet.put("meetStage", "meetPRUEBA");
		assertEquals("Meeting actualizada correctamente", meetService.actualizarMeeting(jsoUpdtMeet));
		
		JSONObject jsoUpdtMeetF = new JSONObject();
		jsoUpdtMeetF.put("meetId", "NOEXISTE");
		jsoUpdtMeetF.put("meetCompany", "meetPRUEBA");
		jsoUpdtMeetF.put("meetDate", "23/02/2022");
		jsoUpdtMeetF.put("meetDevelopTeam", "meetPRUEBA");
		jsoUpdtMeetF.put("meetStage", "meetPRUEBA");
		assertEquals("updtMeeting", meetService.actualizarMeeting(jsoUpdtMeetF));
		
		//Consultar Meetings (Si hay registradas)
		
		JSONObject jsoGetMeets = new JSONObject ();
		jsoGetMeets.put("meetDevelopTeam", "meetPRUEBA");
	
		assertEquals(String.class, meetService.consultarMeetings().getClass());
//		assertEquals(String.class, meetService.consultarMeetingsPorDevT(jsoGetMeets).getClass());
		
		//Borrar Issues
		
		JSONObject jsoDltMeet = new JSONObject();
		jsoDltMeet.put("meetId", "meetPRUEBA");
		assertEquals("Meeting eliminada correctamente", meetService.borrarMeeting(jsoDltMeet));
		
		JSONObject jsoDltMeetF = new JSONObject();
		jsoDltMeetF.put("meetId", "aaaaaaeeeee");
		assertEquals("meetId", meetService.borrarMeeting(jsoDltMeetF));
		
		//Consultar Meetings (No hay registradas)

		assertEquals("", meetService.consultarMeetings());
//		assertEquals("", meetService.consultarMeetingsPorDevT(jsoGetMeets));
	}

	/***************************************
	 ********** TEST SECURITY SERVICE********
	 *************************************** */

	void SecurityTests() throws JSONException{
		
		//Comprobando acceso admin
		JSONObject accesoUser = new JSONObject();
		accesoUser.put("emailAcceso", "pruebaUser2@gmail.com");
		accesoUser.put("pwdAcceso", "Mpueblao2000");
		assertEquals(true, secService.accesoUser(accesoUser));
		
		JSONObject accesoUserF = new JSONObject();
		accesoUserF.put("emailAcceso", "email3");
		accesoUserF.put("pwdAcceso", "Mpueblao2000333");
		assertEquals(false, secService.accesoUser(accesoUserF));
		
		//Comprobando acceso admin
		JSONObject accesoAdmin = new JSONObject();
		accesoAdmin.put("emailAcceso", "marioAdminPrueba@gmail.com");
		accesoAdmin.put("pwdAcceso", "Mpueblao2000");
		assertEquals(true, secService.accesoAdmin(accesoAdmin));
		
		JSONObject accesoAdminF = new JSONObject();
		accesoAdminF.put("emailAcceso", "email3");
		accesoAdminF.put("pwdAcceso", "Mpueblao2000333");
		assertEquals(false, secService.accesoAdmin(accesoAdminF));
		
		//Comprobacion de que la contraseña es válida
		
		JSONObject pwdPrueba = new JSONObject();
		pwdPrueba.put("pwd1", "Mpueblao2000");
		pwdPrueba.put("pwd2", "Mpueblao2000");
		
		String[] comprobado = new String[2];
		comprobado = secService.comprobarPassword(pwdPrueba);
		
		String[] esperado = new String[2];
		esperado[0] = "true";
		esperado[1] = "OK";
		
		assertArrayEquals(esperado, comprobado);
		
		//Primera comprobación fallida
		JSONObject pwdPruebaF1 = new JSONObject();
		pwdPruebaF1.put("pwd1", "Mpueblao2000");
		pwdPruebaF1.put("pwd2", "Mpuebbblao2000");
		
		String[] comprobadoF1 = new String[2];
		comprobadoF1 = secService.comprobarPassword(pwdPruebaF1);
		
		String[] esperadoF1 = new String[2];
		esperadoF1[0] = "false";
		esperadoF1[1] = "Las contraseñas tienen que ser iguales";
		
		assertArrayEquals(esperadoF1, comprobadoF1);
		
		//Segunda comprobación fallida
		JSONObject pwdPruebaF2 = new JSONObject();
		pwdPruebaF2.put("pwd1", "Mo2000");
		pwdPruebaF2.put("pwd2", "Mo2000");
		
		String[] comprobadoF2 = new String[2];
		comprobadoF2 = secService.comprobarPassword(pwdPruebaF2);
		
		String[] esperadoF2 = new String[2];
		esperadoF2[0] = "false";
		esperadoF2[1] = "La contraseña debe tener al menos 8 caracteres";
		
		assertArrayEquals(esperadoF2, comprobadoF2);
		
		//Tercera comprobación fallida
		JSONObject pwdPruebaF3 = new JSONObject();
		pwdPruebaF3.put("pwd1", "Mpueblaoo");
		pwdPruebaF3.put("pwd2", "Mpueblaoo");
		
		String[] comprobadoF3 = new String[2];
		comprobadoF3 = secService.comprobarPassword(pwdPruebaF3);
		
		String[] esperadoF3 = new String[2];
		esperadoF3[0] = "false";
		esperadoF3[1] = "La contraseña debe contener al menos un digito";
		
		assertArrayEquals(esperadoF3, comprobadoF3);
		
		//Cuarta comprobación fallida
		JSONObject pwdPruebaF4 = new JSONObject();
		pwdPruebaF4.put("pwd1", "mpueblao2000");
		pwdPruebaF4.put("pwd2", "mpueblao2000");
		
		String[] comprobadoF4 = new String[2];
		comprobadoF4 = secService.comprobarPassword(pwdPruebaF4);
		
		String[] esperadoF4 = new String[2];
		esperadoF4[0] = "false";
		esperadoF4[1] = "La contraseña debe tener al menos una mayúscula";
		
		assertArrayEquals(esperadoF4, comprobadoF4);
		
		//Quinta comprobación fallida
		JSONObject pwdPruebaF5 = new JSONObject();
		pwdPruebaF5.put("pwd1", "MPUEBLAO2000");
		pwdPruebaF5.put("pwd2", "MPUEBLAO2000");
		
		String[] comprobadoF5 = new String[2];
		comprobadoF5 = secService.comprobarPassword(pwdPruebaF5);
		
		String[] esperadoF5 = new String[2];
		esperadoF5[0] = "false";
		esperadoF5[1] = "La contraseña debe tener al menos una minúscula";
		
		assertArrayEquals(esperadoF5, comprobadoF5);
	}
}