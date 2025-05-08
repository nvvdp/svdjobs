
import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  Heading,
  Text,
  Link,
  VStack,
  useToast,
  useColorModeValue,
} from '@chakra-ui/react';
import { useUserStore } from '../store/user';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const toast = useToast();
  const navigate = useNavigate();
  const getLogin = useUserStore((state) => state.getLogin);

  const bg = useColorModeValue('white', 'gray.800');
  const color = useColorModeValue('gray.800', 'white');

  const handleLogin = async () => {
    if (!email || !password) {
      toast({
        title: 'Error',
        description: 'Email and password are required.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const response = await getLogin(email, password);
    if (response.success) {
      toast({
        title: 'Login successful.',
        description: "You've successfully logged in.",
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      navigate('/');
    } else {
      toast({
        title: 'Login failed.',
        description: response.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Container maxW="md" py={10} centerContent>
      <Box
        w="100%"
        p={8}
        borderWidth={1}
        borderRadius="lg"
        boxShadow="lg"
        bg={bg}
        color={color}
      >
        <Heading as="h2" size="lg" textAlign="center" mb={6}>
          Login
        </Heading>
        <VStack spacing={4} align="stretch">
          <FormControl id="email" isRequired>
            <FormLabel>Email address</FormLabel>
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <Button colorScheme="blue" size="lg" onClick={handleLogin}>
            Login
          </Button>
        </VStack>
        <Text mt={4} textAlign="center">
          <Link color="blue.500" href="#">
            Forgot Password?
          </Link>
        </Text>
      </Box>
    </Container>
  );
};

export default Login;
