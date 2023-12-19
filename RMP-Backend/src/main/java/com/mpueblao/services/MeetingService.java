package com.mpueblao.services;

import java.util.List;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mpueblao.dao.MeetingRepository;
import com.mpueblao.dao.UserRepository;
import com.mpueblao.model.Meeting;
import com.mpueblao.model.User;

@Service
public class MeetingService {

	@Autowired
	private MeetingRepository meetDAO;
	
	@Autowired 
	private UserRepository userDAO;
	
	private String meetId = "meetId";
	private String meetDate = "meetDate";
	private String meetCompany = "meetCompany";
	private String meetDevelopTeam = "meetDevelopTeam";
	private String meetStage = "meetStage";
	private String updtMeeting = "updtMeeting";
	private String meetDateStart = "meetDateStart";
	private String meetDateEnd = "meetDateEnd";

	//-----------------
	//CONSULTAR  MEETINGS
	//-----------------
	
	public String consultarMeetings(){
		//Controlar si hay algun problema con esa key word 
		List<Meeting> listaMeetings = this.meetDAO.findAll();
		if(listaMeetings.isEmpty()){
			return "";	
		}
		
		String listaMeetingJSON = meetingList(listaMeetings);
		return listaMeetingJSON;
	}
	
	public String consultarMeetingsDevT(JSONObject jso){
		//Controlar si hay algun problema con esa key word 
		User userAux = this.userDAO.findByEmailIgnoreCase(jso.getString("email"));
		
		if(userAux != null) {
			List<Meeting> listaMeetings = this.meetDAO.findByDevelopTeamIgnoreCase(userAux.getDevelopTeam());
			
			if(listaMeetings.isEmpty()){
				return "";	
			}
		
			String listaMeetingJSON = meetingList(listaMeetings);
			return listaMeetingJSON;
		
		}else{
			return "No existe el usuario";
		}
		
	}
	
	public String consultarMeetingsFilter(JSONObject jso){
		//Controlar si hay algun problema con esa key word

		List<Meeting> listaMeetingsFilterMeetId = this.meetDAO.findByDateBetweenAndMeetIdContainingIgnoreCase(jso.getString(this.meetDateStart), jso.getString(this.meetDateEnd), jso.getString(this.meetId));
		if(listaMeetingsFilterMeetId.isEmpty()){
			return "";
		}
		
		String listaMeetingJSON = meetingList(listaMeetingsFilterMeetId);
		return listaMeetingJSON;
	}

	//----------------------
	//CRUD OPERATIONS MEETINGS
	//----------------------
	
	public String registrarNuevaMeeting(JSONObject jso) {
		
		Meeting meetingId = this.meetDAO.findByMeetIdIgnoreCase(jso.getString(this.meetId));
		
		if(meetingId != null) {
			return this.meetId;
		}
		
		Meeting newMeeting = new Meeting();
		newMeeting.setMeetId(jso.getString(this.meetId));
		newMeeting.setDate(jso.getString(this.meetDate));
		newMeeting.setCompany(jso.getString(this.meetCompany));
		newMeeting.setDevelopTeam(jso.getString(this.meetDevelopTeam));
		newMeeting.setStage(jso.getString(this.meetStage));
		this.meetDAO.save(newMeeting);
		return "Meeting registrada correctamente";
	}
	
	public String actualizarMeeting(JSONObject jso) {
		
		Meeting updtMeeting = this.meetDAO.findByMeetIdIgnoreCase(jso.getString(this.meetId));
		
		if(updtMeeting == null) {
			return this.updtMeeting;
		}
	
		updtMeeting.setDate(jso.getString(this.meetDate));
		updtMeeting.setCompany(jso.getString(this.meetCompany));
		updtMeeting.setDevelopTeam(jso.getString(this.meetDevelopTeam));
		updtMeeting.setStage(jso.getString(this.meetStage));
		
		this.meetDAO.save(updtMeeting);
		return "Meeting actualizada correctamente";
	}
	
	public String borrarMeeting(JSONObject jso) {
		
		Meeting meetAux = this.meetDAO.findByMeetId(jso.getString(this.meetId));
		
		if(meetAux == null){
			return this.meetId;
		}
		this.meetDAO.deleteById(jso.getString(this.meetId));
		return "Meeting eliminada correctamente";
	}
	
	//-----------
	//AUX METHODS
	//-----------
	
	public JSONObject meetingJSON(Meeting meet) {
		JSONObject jso = new JSONObject();
		jso.put(this.meetId, meet.getMeetId());
		jso.put(this.meetDate, meet.getDate());
		jso.put(this.meetCompany, meet.getCompany());
		jso.put(this.meetDevelopTeam, meet.getDevelopTeam());
		jso.put(this.meetStage, meet.getStage());
		return jso;    
	}
	
	public String meetingList(List<Meeting> listaMeetings) {
		StringBuilder bld = new StringBuilder();
		for (int i = 0; i<listaMeetings.size(); i++) {
			Meeting meetT = listaMeetings.get(i);
			JSONObject jso = this.meetingJSON(meetT);
			if (i == listaMeetings.size() - 1)
				bld.append(jso.toString());
			else
				bld.append(jso.toString() + ";");
		}
		return bld.toString();
	}
}
