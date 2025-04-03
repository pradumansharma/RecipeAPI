package com.example.recipe.controller;

import com.example.recipe.model.Recipe;
import com.example.recipe.service.RecipeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/recipes")
public class RecipeController {

    @Autowired
    private RecipeService recipeService;

    //List all recipes based on free text search
    @GetMapping("/search")
    public List<Recipe> searchRecipes(@RequestParam String query) {
        return recipeService.getAllRecipes(query);
    }

    //Find a specific recipe by ID
    @GetMapping("/{id}")
    public Optional<Recipe> getRecipeById(@PathVariable Long id) {
        return recipeService.getRecipeById(id);
    }
}
