package com.mpueblao.dao;


import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.mpueblao.model.User;

@Repository
public interface UserRepository extends CrudRepository <User, String>{

	User findByEmail(String email);
	void deleteByEmail(String email);
	List <User> findAll();
	User findByEmailIgnoreCase(String email);
	List <User> findByDevelopTeamIgnoreCase(String devTeam);
	List <User> findAllByEmail(String email);
	
}
