import { useEffect, useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ChevronUp, ChevronDown, Search } from "lucide-react";

export default function RecipeSearch() {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [sortAsc, setSortAsc] = useState(true);
  const [tags, setTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState(null);

  useEffect(() => {
    if (query.length >= 3) {
      axios
        .get(`http://localhost:8080/api/recipes?search=${query}`)
        .then((res) => {
          setRecipes(res.data);
          setFilteredRecipes(res.data);
          const uniqueTags = [...new Set(res.data.flatMap((r) => r.tags))];
          setTags(uniqueTags);
        })
        .catch((err) => console.error(err));
    }
  }, [query]);

  const handleSort = () => {
    const sorted = [...filteredRecipes].sort((a, b) =>
      sortAsc ? a.cookTimeMinutes - b.cookTimeMinutes : b.cookTimeMinutes - a.cookTimeMinutes
    );
    setFilteredRecipes(sorted);
    setSortAsc(!sortAsc);
  };

  const handleFilter = (tag) => {
    if (selectedTag === tag) {
      setFilteredRecipes(recipes);
      setSelectedTag(null);
    } else {
      setFilteredRecipes(recipes.filter((r) => r.tags.includes(tag)));
      setSelectedTag(tag);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 text-center">
      <div className="flex items-center gap-2 mb-4">
        <Input
          placeholder="Search for recipes..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full"
        />
        <Button><Search /></Button>
      </div>

      <div className="flex justify-between items-center mb-4">
        <Button onClick={handleSort}>
          Sort by Cook Time {sortAsc ? <ChevronUp /> : <ChevronDown />}
        </Button>
      </div>

      <div className="flex gap-2 mb-4 overflow-x-auto">
        {tags.map((tag) => (
          <Button
            key={tag}
            variant={selectedTag === tag ? "default" : "outline"}
            onClick={() => handleFilter(tag)}
          >
            {tag}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredRecipes.map((recipe) => (
          <motion.div key={recipe.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Card>
              <img src={recipe.image} alt={recipe.name} className="rounded-t-xl w-full h-32 object-cover" />
              <CardContent className="p-4">
                <h3 className="font-bold text-lg">{recipe.name}</h3>
                <p className="text-gray-500">{recipe.cuisine}</p>
                <p className="text-sm">Cook Time: {recipe.cookTimeMinutes} min</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
