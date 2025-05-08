import { useEffect, useMemo } from 'react'; // Import useMemo
import { Container, VStack, Text, SimpleGrid } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { useJobStore } from '../store/job'
import JobCard from '../components/JobCard';

const Homepage = () => {
  const {fetchJobs, jobs} = useJobStore();

  useEffect(() => {
    // Fetch jobs when the component mounts or fetchJobs changes
    fetchJobs();
  }, [fetchJobs]); // Added fetchJobs to dependency array (Zustand actions are typically stable)

  // Sort jobs by createdAt in descending order (newest first)
  // useMemo ensures this sorting only happens when the 'jobs' array actually changes.
  const sortedJobs = useMemo(() => {
    // Create a shallow copy using spread syntax before sorting to avoid mutating the original store state
    return [...jobs].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }, [jobs]);

  
  return (
    <Container maxW="container.xl" py={12}>
      <VStack spacing={8}>
        <Text
          fontSize={"30"}
          fontWeight={"bold"}
          bgGradient={"linear(to-r, cyan.400, blue.500)"}
          bgClip={"text"}
          textAlign={"center"}>
            Current Jobs
        </Text>

        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 3 }}
          spacing={10}
          w={"full"}>
            {sortedJobs.map((job, index) => ( // Use sortedJobs for mapping
              <JobCard key={job._id} job={job} index={index + 1} /> // Pass index as a prop, starting from 1
            ))}
        </SimpleGrid>

        {sortedJobs.length === 0 && ( // Check sortedJobs length
          <Text fontSize={"xl"} textAlign={"center"} fontWeight={"bold"} color={"gray.500"}>
          No jobs available at the moment 😥 {""}
          <Link to={"/create"}>
            <Text as={"span"}  color={"blue.500"} _hover={{ textDecoration: "underline" }}>
              Create a job
            </Text>
          </Link>
        </Text>
        )}
      </VStack>
    </Container>
  )
}

export default Homepage
