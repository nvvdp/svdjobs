import React, { useEffect, useState } from 'react';
import {
  Box,
  Avatar,
  Heading,
  Text,
  VStack,
  HStack,
  Button,
  Divider,
  Stack,
  useColorModeValue,
  Spinner,
} from '@chakra-ui/react';
import { useUserStore } from '../store/user';
import { SeoHelmet } from '../components/SeoHelmet';

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const getProfile = useUserStore((state) => state.getProfile);

  useEffect(() => {
    const fetchProfile = async () => {
      const response = await getProfile();
      if (response.success) {
        setUser(response.user);
      }
      setLoading(false);
    };
    fetchProfile();
  }, [getProfile]);

  const bg = useColorModeValue('white', 'gray.800');
  const color = useColorModeValue('gray.800', 'white');

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Spinner size="xl" />
      </Box>
    );
  }

  if (!user) {
    return (
      <Box textAlign="center" py={10} px={6}>
        <Heading as="h2" size="lg" mb={4}>
          Unable to fetch profile
        </Heading>
        <Text>Please try again later.</Text>
      </Box>
    );
  }

  return (
    <>
      <SeoHelmet title="Profile - SVD Jobs" description="View and update your SVD Jobs profile, see your applications, and manage your account." />
      <Box
        maxW="4xl"
        mx="auto"
        py={10}
        px={6}
        bg={bg}
        color={color}
        borderRadius="lg"
        boxShadow="lg"
      >
        <VStack spacing={6} align="center">
          <Avatar size="2xl" src={user.avatarUrl || ''} name={user.name} />
          <Heading as="h2" size="lg">
            {user.name}
          </Heading>
          <Text fontSize="md">
            Email: {user.email}
          </Text>
          <Text fontSize="md">
            Phone: {user.phone || 'N/A'}
          </Text>
          <Text fontSize="md">
            Password: {user.password ? '********' : 'N/A'}
          </Text>
          <HStack spacing={4}>
            <Button colorScheme="blue">Edit Profile</Button>
            <Button colorScheme="red" variant="outline">
              Delete Account
            </Button>
          </HStack>
        </VStack>

        <Divider my={8} />

        <Stack spacing={4}>
          <Heading as="h3" size="md">
            Recent Activity
          </Heading>
          <Text>You have not performed any recent activities.</Text>
        </Stack>
      </Box>
    </>
  );
};

export default Profile;