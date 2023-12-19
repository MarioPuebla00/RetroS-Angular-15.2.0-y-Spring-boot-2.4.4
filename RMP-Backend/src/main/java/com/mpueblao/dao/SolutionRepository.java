package com.mpueblao.dao;


import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.mpueblao.model.Solution;

@Repository
public interface SolutionRepository extends CrudRepository <Solution, String>{

	List<Solution> findAll();
	
	List<Solution> findByIssIdIgnoreCase(String issId);

	Solution findBySolIdIgnoreCase(String solId);
}