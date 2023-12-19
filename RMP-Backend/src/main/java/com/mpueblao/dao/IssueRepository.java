package com.mpueblao.dao;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.mpueblao.model.Issue;

@Repository
public interface IssueRepository extends CrudRepository<Issue, String> {
	
	Issue findByIssId(String issId);
	Issue findByIssIdIgnoreCase(String issId);
	List <Issue> findAll();

	List<Issue> findByIssDevTeamIgnoreCase(String issDevT);
	List<Issue> findByIssLastModifBetweenAndIssIdContainingIgnoreCaseAndIssKeyWordContainingAndIssFixedContaining(String fechaInicio, String fechaFin, String issId, String issKewyWord, String issFixed);

}
