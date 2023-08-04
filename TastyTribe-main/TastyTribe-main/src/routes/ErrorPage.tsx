import { useRouteError } from "react-router-dom";
import { Flex, Heading, Text, Box } from "@chakra-ui/react";

const ErrorPage = () => {
  const error: any = useRouteError();

  return (
    <Box height="100vh">
      <Flex height="100%" justifyContent="center" alignItems="center" flexDirection="column">
        <Heading>Oops!</Heading>
        <Text>Sorry, an unexpected error has occurred.</Text>
        <Text>
          <i>{error.statusText || error.message}</i>
        </Text>
      </Flex>
    </Box>
  );
};

export default ErrorPage;
