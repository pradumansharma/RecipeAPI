package com.example.recipe.loader;

import com.example.recipe.model.Recipe;
import com.example.recipe.repository.RecipeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component
public class DataLoader implements CommandLineRunner {

    private static final String RECIPES_API_URL = "https://dummyjson.com/recipes";

    @Autowired
    private RecipeRepository recipeRepository;

    @Override
    public void run(String... args) throws Exception {
        RestTemplate restTemplate = new RestTemplate();
        DummyRecipesResponse response = restTemplate.getForObject(RECIPES_API_URL, DummyRecipesResponse.class);
        if (response != null && response.getRecipes() != null) {
            response.getRecipes().forEach(dto -> {
                Recipe recipe = new Recipe();
                recipe.setId(dto.getId());
                recipe.setName(dto.getName());
                recipe.setCuisine(dto.getCuisine());
                recipe.setIngredients(dto.getIngredients());
                recipe.setInstructions(dto.getInstructions());
                recipeRepository.save(recipe);
            });
            System.out.println("Loaded " + response.getRecipes().size() + " recipes from external API.");
        } else {
            System.out.println("No recipes were loaded. Please check the external API response.");
        }
    }
}
