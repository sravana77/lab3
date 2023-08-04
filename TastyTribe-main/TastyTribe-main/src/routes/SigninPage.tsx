import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { NavLink, useNavigate } from "react-router-dom";
import { Box, Flex, FormControl, FormLabel, Input, Button, Text } from "@chakra-ui/react";

const SigninPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onLogin = (e: any) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        navigate("/home");
      })
      .catch((error) => {
        const errorMessage = error.message;
        setError(errorMessage);
      });
  };
  return (
    <Flex
      minHeight="100vh"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      bgGradient="linear(to right, #ff6b4c,#ff957e)"
    >
      {error && (
        <Box
          my={4}
          backgroundColor="brand.800"
          maxWidth="400px"
          width="100%"
          borderRadius="md"
          p={3}
          color="white"
          textAlign="center"
        >
          <Text>{error}</Text>
        </Box>
      )}
      <Box
        p={8}
        maxWidth={{ base: "300px", md: "400px", lg: "400px" }}
        width="100%"
        bg="white"
        borderRadius="md"
        boxShadow="lg"
      >
        <FormControl mb={4}>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            placeholder="Enter your email"
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
            }}
          />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            placeholder="Enter your password"
            onChange={(e) => {
              setPassword(e.target.value);
              setError("");
            }}
          />
        </FormControl>
        <Button colorScheme="orange" size="lg" width="100%" type="submit" onClick={onLogin}>
          Sign In
        </Button>
        <Text mt={4} textAlign="center" fontSize="sm">
          Not signed in yet?{" "}
          <span className="highlighted">
            <NavLink to="/signup">Sign up</NavLink>
          </span>
        </Text>
      </Box>
    </Flex>
  );
};

export default SigninPage;
