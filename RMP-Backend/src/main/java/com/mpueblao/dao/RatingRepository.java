package com.mpueblao.dao;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.mpueblao.model.Rating;

@Repository
public interface RatingRepository extends CrudRepository <Rating, String>{

	List<Rating> findBySolIdIgnoreCase(String solId);
	
    @Query("SELECT AVG(r.scoreRating) FROM Rating r WHERE r.solId = :solId")
    Double obtenerValoracionMedia(String solId);
   
}
