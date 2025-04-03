package com.example.recipe.model;

import java.util.List;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "recipes")
public class Recipe {
    
    @Id
    private Long id;
    private String name;
    private List<String> ingredients;
    private List<String> instructions;
    private int prepTimeMinutes;
    private int cookTimeMinutes;
    private int servings;
    private String difficulty;
    private String cuisine;
    private int caloriesPerServing;
    private List<String> tags;
    private int userId;
    private String image;
    private double rating;
    private int reviewCount;
    private List<String> mealType;
}