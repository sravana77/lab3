import React, { useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  VStack,
  Heading,
} from "@chakra-ui/react";
import recipes from "../data/recipes";

const AddRecipeForm = () => {
  const [recipeData, setRecipeData] = useState({
    id: 0,
    name: "",
    description: "",
    ingredients: ["", "", "", "", ""],
    method: ["", "", "", "", ""],
    image: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    const id = recipes.length + 1;
    setRecipeData((prevData) => ({ ...prevData, [id]: id, [name]: value }));
  };

  const handleIngredientsChange = (index: number, value: string) => {
    setRecipeData((prevData) => {
      const newIngredients = [...prevData.ingredients];
      newIngredients[index] = value;
      return { ...prevData, ingredients: newIngredients };
    });
  };

  const handleMethodChange = (index: number, value: string) => {
    setRecipeData((prevData) => {
      const newMethod = [...prevData.method];
      newMethod[index] = value;
      return { ...prevData, method: newMethod };
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // code to submit the recipe data
    console.log("Submitted Recipe Data:", recipeData);
  };

  return (
    <Box margin="auto" p={4} bg="white" borderRadius="md" boxShadow="md" color="black">
      <VStack spacing={4}>
        <Heading size="lg" color="brand.400">
          Add a New Recipe
        </Heading>
        <form onSubmit={handleSubmit}>
          <FormControl>
            <FormLabel>Recipe Name</FormLabel>
            <Input
              type="text"
              name="name"
              value={recipeData.name}
              onChange={handleChange}
              required
              _hover={{ bg: "grey.200" }}
              _focus={{ bg: "grey.200" }}
              placeholder="Enter recipe name..."
              borderRadius="md"
              color="black"
            />
          </FormControl>
          <FormControl>
            <FormLabel mt={4}>Recipe Description</FormLabel>
            <Textarea
              name="description"
              value={recipeData.description}
              onChange={handleChange}
              required
              _hover={{ bg: "grey.200" }}
              _focus={{ bg: "grey.200" }}
              placeholder="Enter recipe description..."
              borderRadius="md"
              color="black"
            />
          </FormControl>
          <FormControl>
            <FormLabel mt={4}>Recipe Ingredients</FormLabel>
            {recipeData.ingredients.map((ingredient, index) => (
              <Input
                key={index}
                type="text"
                value={ingredient}
                onChange={(e) => handleIngredientsChange(index, e.target.value)}
                required
                _hover={{ bg: "grey.200" }}
                _focus={{ bg: "grey.200" }}
                placeholder={`Ingredient ${index + 1}`}
                borderRadius="md"
                color="black"
                mb={2}
              />
            ))}
          </FormControl>
          <FormControl>
            <FormLabel mt={4}>Recipe Method</FormLabel>
            {recipeData.method.map((step, index) => (
              <Textarea
                key={index}
                value={step}
                onChange={(e) => handleMethodChange(index, e.target.value)}
                required
                _hover={{ bg: "grey.200" }}
                _focus={{ bg: "grey.200" }}
                placeholder={`Step ${index + 1}`}
                borderRadius="md"
                color="black"
                mb={2}
              />
            ))}
          </FormControl>
          <FormControl>
            <FormLabel mt={4}>Recipe Image URL</FormLabel>
            <Input
              type="text"
              name="image"
              value={recipeData.image}
              onChange={handleChange}
              required
              _hover={{ bg: "grey.200" }}
              _focus={{ bg: "grey.200" }}
              placeholder="Enter image URL..."
              borderRadius="md"
              color="black"
            />
          </FormControl>
          <Button
            type="submit"
            colorScheme="grey"
            bg="brand.400"
            mt={4}
            _hover={{ bg: "grey.500" }}
          >
            Submit Recipe
          </Button>
        </form>
      </VStack>
    </Box>
  );
};

export default AddRecipeForm;
