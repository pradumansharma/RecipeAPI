package com.example.recipe.repository;

import com.example.recipe.model.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface RecipeRepository extends JpaRepository<Recipe, Long> {
    
    @Query("SELECT r FROM Recipe r WHERE LOWER(r.name) LIKE LOWER(CONCAT('%', :query, '%')) " +
           "OR LOWER(r.cuisine) LIKE LOWER(CONCAT('%', :query, '%'))")
    List<Recipe> searchRecipes(@Param("query") String query);
}
