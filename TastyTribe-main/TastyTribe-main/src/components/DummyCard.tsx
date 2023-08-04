import { Box, Text, Image, Icon } from "@chakra-ui/react";
import { IconType } from "react-icons";

interface Card {
  id: number;
  icon: IconType;
  heading: string;
  image: string;
}

interface Props {
  card: Card;
}

const DummyCard = ({ card: { icon, heading, image } }: Props) => {
  return (
    <Box
      width="300px"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={4}
      boxShadow="md"
      backgroundColor={"white"}
      className="food-card"
    >
      <Box textAlign="center">
        <Icon as={icon} boxSize={10} color="brand.800" />
      </Box>
      <Text
        mt={4}
        fontSize="2xl"
        borderBottom="1px solid grey"
        fontWeight="bold"
        textAlign="center"
        color="brand.800"
        paddingBottom={2}
      >
        {heading}
      </Text>
      <Image mt={4} src={image} alt="Food Illustration" />
    </Box>
  );
};

export default DummyCard;
