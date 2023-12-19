package com.mpueblao.dao;


import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.mpueblao.model.Admin;



@Repository
public interface AdminRepository extends CrudRepository <Admin, String> {
	
	Admin findByEmail(String email);
	List <Admin> findAll();
	void deleteByEmail(String emailUsuario);
	Admin findByEmailIgnoreCase(String email);

}
