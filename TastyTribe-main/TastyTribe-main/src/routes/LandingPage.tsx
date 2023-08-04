import { Box, HStack, Heading, Button, Text, Flex, Image } from "@chakra-ui/react";
import DummyCard from "../components/DummyCard";
import recipeBookImage from "../assets/recipe-book.svg";
import { GiChickenOven, GiStairsCake, GiHamburger } from "react-icons/gi";
import { PiBowlFoodDuotone } from "react-icons/pi";
import friedChicken from "../assets/fried-chicken.svg";
import burger from "../assets/burger.svg";
import weddingCake from "../assets/wedding cake-pana.svg";
import riceBowl from "../assets/rice-bowl.svg";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const LandingPage = () => {
  const dummyCards = [
    {
      id: 1,
      icon: GiChickenOven,
      heading: "Fried Chicken",
      image: friedChicken,
    },
    {
      id: 2,
      icon: PiBowlFoodDuotone,
      heading: "Rice Cakes",
      image: riceBowl,
    },
    {
      id: 3,
      icon: GiHamburger,
      heading: "Chicken Burger",
      image: burger,
    },
    {
      id: 4,
      icon: GiStairsCake,
      heading: "Wedding Cake",
      image: weddingCake,
    },
  ];

  return (
    <Box>
      <Navbar />
      <Box display={{ base: "block", md: "block", lg: "flex" }} my={4}>
        <Box w={{ base: "100%", md: "100%", lg: "50%" }} p={4} textAlign="center">
          <Heading fontSize={{ base: "36px", md: "36px", lg: "56px" }}>
            Join <span className="highlighted">TastyTribe</span>
            <span className="display-block">Share and Discover</span>
            <span className="highlighted">Delicious </span>Recipes!
          </Heading>
          <Text m={4}>
            Welcome to TastyTribe, the ultimate recipe sharing community! Whether you're a seasoned
            chef or a passionate home cook, TastyTribe is the place to connect, inspire, and indulge
            in a world of mouthwatering recipes
          </Text>
        </Box>
        <Box w={{ base: "100%", md: "100%", lg: "50%" }} p={4}>
          <Image mt={4} src={recipeBookImage} alt="Food Illustration" width="70%" mx="auto" />
        </Box>
      </Box>

      <Flex
        justifyContent="center"
        flexWrap="wrap"
        maxWidth="1600px"
        mx="auto"
        px={4}
        py={10}
        gap={10}
        backgroundColor="brand.300"
      >
        {dummyCards.map((card) => (
          <DummyCard key={card.id} card={card} />
        ))}
      </Flex>
      <Footer />
    </Box>
  );
};

export default LandingPage;
