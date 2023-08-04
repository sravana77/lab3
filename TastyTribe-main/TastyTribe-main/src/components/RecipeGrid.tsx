import { Grid } from "@chakra-ui/react";
import recipes from "../data/recipes";
import RecipeCard from "./RecipeCard";

export interface Recipe {
  id: number;
  name: string;
  ingredients: string[];
  description: string;
  method: string[];
  image: string;
}

const RecipeGrid = () => {
  return (
    <Grid templateColumns="repeat(auto-fit, minmax(300px, 1fr))" gap={6} p={6}>
      {recipes.map((recipe: Recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </Grid>
  );
};

export default RecipeGrid;
