import {
  Box,
  Image,
  Text,
  Stack,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  List,
  ListItem,
} from "@chakra-ui/react";
import { Recipe } from "./RecipeGrid";

interface Props {
  recipe: Recipe;
}

const RecipeCard = ({ recipe }: Props) => {
  var { name, description, image, ingredients, method } = recipe;

  return (
    <Box
      bg="white"
      borderRadius="md"
      boxShadow="md"
      overflow="hidden"
      _hover={{ transform: "scale(1.02)", transition: "transform 0.2s ease-in-out" }}
    >
      <Image src={image} alt={name} borderRadius="md" className="food-card" />
      <Box p={4}>
        <Text fontSize="xl" fontWeight="bold" mb={2} color="#ff6b4c">
          {name}
        </Text>
        <Text color="gray.600" mb={4}>
          {description}
        </Text>
        <Accordion allowMultiple>
          <AccordionItem>
            <h2>
              <AccordionButton _focus={{ boxShadow: "none" }}>
                <Box flex="1" textAlign="left" color="#ff6b4c">
                  Ingredients
                </Box>
              </AccordionButton>
            </h2>
            <AccordionPanel>
              <List styleType="circle" ml={4}>
                {ingredients.map((ingredient, index) => (
                  <ListItem key={index} mt={1}>
                    {ingredient}
                  </ListItem>
                ))}
              </List>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <h2>
              <AccordionButton _focus={{ boxShadow: "none" }}>
                <Box flex="1" textAlign="left" color="#ff6b4c">
                  Cooking Method
                </Box>
              </AccordionButton>
            </h2>
            <AccordionPanel>
              <List styleType="cirlce" ml={4}>
                {method.map((step, index) => (
                  <ListItem key={index} mt={1}>
                    {step}
                  </ListItem>
                ))}
              </List>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Box>
    </Box>
  );
};

export default RecipeCard;
