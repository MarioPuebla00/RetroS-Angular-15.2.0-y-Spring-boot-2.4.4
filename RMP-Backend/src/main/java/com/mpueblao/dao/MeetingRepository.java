package com.mpueblao.dao;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.mpueblao.model.Meeting;

@Repository
public interface MeetingRepository extends CrudRepository <Meeting, String>{
	
	Meeting findByMeetIdIgnoreCase(String meetId);
	Meeting findByMeetId(String meetId);
	List<Meeting> findByDevelopTeamIgnoreCase(String developTeam);
	List <Meeting> findAll();
    List <Meeting> findByDateBetweenAndCompanyContaining(String fechaInicio, String fechaFin, String company);
    List <Meeting> findByDateBetweenAndMeetIdContainingIgnoreCase(String fechaInicio, String fechaFin, String meetId);

}
