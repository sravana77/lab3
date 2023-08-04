import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { Box, Flex, FormControl, FormLabel, Input, Button, Text } from "@chakra-ui/react";

const SignupPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const onSubmit = async (e: any) => {
    e.preventDefault();

    if (password != confirmPassword) {
      setError("Password did not match");
      return;
    }

    await createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        await updateProfile(user, { displayName: name });
        navigate("/signin");
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
          <FormLabel>Full Name</FormLabel>
          <Input
            type="text"
            placeholder="Enter your name"
            onChange={(e) => {
              setName(e.target.value);
              setError("");
            }}
          />
        </FormControl>
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
        <FormControl mb={4}>
          <FormLabel>Confirm Password</FormLabel>
          <Input
            type="password"
            placeholder="Enter your password again"
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              setError("");
            }}
          />
        </FormControl>
        <Button
          backgroundColor="brand.300"
          size="lg"
          width="100%"
          color="white"
          type="submit"
          onClick={onSubmit}
        >
          Sign Up
        </Button>
        <Text mt={4} textAlign="center" fontSize="sm">
          Already signed up?{" "}
          <span className="highlighted">
            <NavLink to="/signin">Sign in</NavLink>
          </span>
        </Text>
      </Box>
    </Flex>
  );
};

export default SignupPage;
