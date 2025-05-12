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
import { SeoHelmet } from '../components/SeoHelmet';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showForgot, setShowForgot] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotLoading, setForgotLoading] = useState(false);
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

  const handleForgotPassword = async () => {
    if (!forgotEmail) {
      toast({
        title: 'Error',
        description: 'Please enter your email address.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    setForgotLoading(true);
    try {
      const res = await fetch('/api/users/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: forgotEmail }),
      });
      const data = await res.json();
      if (data.success) {
        toast({
          title: 'Reset Link Sent',
          description: data.message || 'Check your email for reset instructions.',
          status: 'success',
          duration: 4000,
          isClosable: true,
        });
        setShowForgot(false);
        setForgotEmail('');
      } else {
        toast({
          title: 'Error',
          description: data.message || 'Failed to send reset link.',
          status: 'error',
          duration: 4000,
          isClosable: true,
        });
      }
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Something went wrong. Please try again.',
        status: 'error',
        duration: 4000,
        isClosable: true,
      });
    }
    setForgotLoading(false);
  };

  return (
    <>
      <SeoHelmet title="Login - SVD Jobs" description="Login to your SVD Jobs account to manage your profile and apply for jobs." />
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
          {showForgot ? (
            <VStack spacing={4} align="stretch">
              <FormControl id="forgot-email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                />
              </FormControl>
              <Button
                colorScheme="blue"
                size="lg"
                isLoading={forgotLoading}
                onClick={handleForgotPassword}
              >
                Send Reset Link
              </Button>
              <Button variant="link" onClick={() => setShowForgot(false)}>
                Back to Login
              </Button>
            </VStack>
          ) : (
            <>
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
                <Button variant="link" color="blue.500" onClick={() => setShowForgot(true)}>
                  Forgot Password?
                </Button>
              </Text>
            </>
          )}
        </Box>
      </Container>
    </>
  );
};

export default Login;
