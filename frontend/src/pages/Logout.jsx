import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';

const Logout = () => {
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    // Clear the token from localStorage
    localStorage.removeItem('token');

    // Show logout message
    toast({
      title: 'Logged out',
      description: 'You have been logged out successfully.',
      status: 'info',
      duration: 3000,
      isClosable: true,
    });

    // Redirect to the login page after a short delay
    const timer = setTimeout(() => {
      navigate('/login');
    }, 1200);
    return () => clearTimeout(timer);
  }, [navigate, toast]);

  return null;
};

export default Logout;