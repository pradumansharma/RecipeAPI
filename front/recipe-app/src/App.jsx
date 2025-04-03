import { useState, useEffect } from "react";

function App() {
  const [search, setSearch] = useState("");
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    if (search.length >= 3) {
      fetch(`http://localhost:8080/api/recipes/search?query=${search}`)
        .then((res) => res.json())
        .then((data) => {
          console.log("API Response:", data);
          setRecipes(data || []);
        })
        .catch((error) => console.error("Error fetching recipes:", error));
    } else {
      setRecipes([]); // Clear results if input is less than 3 characters
    }
  }, [search]);

  return (
    <div style={styles.container}>
      <div style={styles.searchBox}>
        <h1 style={styles.title}>Recipe Search</h1>
        <input
          type="text"
          placeholder="Search recipes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.searchInput}
        />
      </div>
      {recipes.length > 0 && (
        <div style={styles.recipeGrid}>
          {recipes.map((recipe) => (
            <div key={recipe.id} style={styles.recipeCard}>
              <img src={recipe.image} alt={recipe.name} style={styles.recipeImage} />
              <h2 style={styles.recipeTitle}>{recipe.name}</h2>
              <p style={styles.recipeCuisine}><strong>Cuisine:</strong> {recipe.cuisine}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#007bff", // Full blue background
    minHeight: "100vh",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  searchBox: {
    textAlign: "center",
    marginBottom: "20px",
  },
  title: {
    color: "#ffffff",
    fontSize: "2.5rem",
    marginBottom: "10px",
  },
  searchInput: {
    width: "400px",
    padding: "12px",
    fontSize: "1.2rem",
    border: "2px solid #ffffff",
    borderRadius: "10px",
    outline: "none",
    backgroundColor: "#ffffff",
    color: "#007bff",
    textAlign: "center",
  },
  recipeGrid: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "20px",
    maxWidth: "800px",
  },
  recipeCard: {
    backgroundColor: "#ffffff",
    padding: "15px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    textAlign: "center",
    width: "300px",
  },
  recipeImage: {
    width: "100%",
    height: "200px",
    objectFit: "cover",
    borderRadius: "8px",
  },
  recipeTitle: {
    color: "#007bff",
    fontSize: "1.5rem",
    margin: "10px 0",
  },
  recipeCuisine: {
    fontSize: "1rem",
    color: "#333",
  },
};

export default App;
