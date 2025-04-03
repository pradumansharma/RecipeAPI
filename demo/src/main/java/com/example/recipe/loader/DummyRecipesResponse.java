package com.example.recipe.loader;

import lombok.Data;

import java.util.List;

@Data
public class DummyRecipesResponse {
    private List<DummyRecipeDTO> recipes;
    private Integer total;
    private Integer skip;
    private Integer limit;
}
