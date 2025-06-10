import { useEffect, useMemo, useState } from 'react'; // Import useMemo and useState
import { Container, VStack, Text, SimpleGrid, Select, Input, HStack, Spinner, Center } from '@chakra-ui/react'; // Import additional components
import { useJobStore } from '../store/job';
import JobCard from '../components/JobCard';
import { SeoHelmet } from '../components/SeoHelmet';

const Homepage = () => {
  const { fetchJobs, jobs } = useJobStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchJobs().finally(() => setLoading(false));
  }, [fetchJobs]); // Added fetchJobs to dependency array (Zustand actions are typically stable)

  // Sort jobs by createdAt in descending order (newest first)
  // useMemo ensures this sorting only happens when the 'jobs' array actually changes.
  const sortedJobs = useMemo(() => {
    // Create a shallow copy using spread syntax before sorting to avoid mutating the original store state
    return [...jobs].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }, [jobs]);

  const [filter, setFilter] = useState({
    jobType: '',
    location: '',
    search: ''
  });

  const filteredJobs = useMemo(() => {
    return sortedJobs.filter(job => {
      const matchesType = filter.jobType ? job.jobType.toLowerCase() === filter.jobType : true;
      const matchesSector =filter.sector ? job.sector === filter.sector : true;
      const matchesLocation = filter.location ? job.location === filter.location : true;
      const matchesSearch = filter.search
        ? job.title.toLowerCase().includes(filter.search.toLowerCase()) ||
          job.company.toLowerCase().includes(filter.search.toLowerCase())
        : true;
      return matchesType && matchesSector && matchesLocation && matchesSearch;
    });
  }, [sortedJobs, filter]);

  if (loading) {
    return (
      <Center minH="60vh">
        <Spinner size="xl" thickness="4px" color="blue.500" speed="0.65s" />
      </Center>
    );
  }

  return (
    <>
      <SeoHelmet title="SVD Jobs - Find Your Next Opportunity" description="Browse and apply for the latest jobs on SVD Jobs." />
      <Container maxW="container.xl" py={12}>
        <VStack spacing={8}>
          {/* Filter Options */}
          <HStack w="full" spacing={4} justifyContent="center">
            <Select
              placeholder="Filter by Job Type"
              value={filter.jobType}
              onChange={e => setFilter(f => ({ ...f, jobType: e.target.value }))}
              maxW="200px"
            >
              <option value="full-time">Full-Time</option>
              <option value="part-time">Part-Time</option>
              <option value="contract">Contract</option>
              <option value="internship">Internship</option>
            </Select>
            <Select
              placeholder="Filter by Sector"
              value={filter.sector}
              onChange={e => setFilter(f => ({ ...f, sector: e.target.value }))}
              maxW="200px"
            >
              <option value="Government">Government</option>
              <option value="Private">Private</option>
            </Select>
            <Select
              placeholder="Filter by Location"
              value={filter.location}
              onChange={e => setFilter(f => ({ ...f, location: e.target.value }))}
              maxW="200px"
            >
              <option value="Remote">Remote</option>
              <option value="On-site">On-site</option>
              <option value="Hybrid">Hybrid</option>
            </Select>
            <Input
              placeholder="Search by title or company"
              value={filter.search}
              onChange={e => setFilter(f => ({ ...f, search: e.target.value }))}
              maxW="250px"
            />
          </HStack>

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
              {filteredJobs.map((job, index) => (
                <JobCard key={job._id} job={job} index={index + 1} />
              ))}
          </SimpleGrid>

          {filteredJobs.length === 0 && (
            <Text fontSize={"xl"} textAlign={"center"} fontWeight={"bold"} color={"gray.500"}>
            No jobs available at the moment 😥 {""}
            
          </Text>
          )}
        </VStack>
      </Container>
    </>
  );
};

export default Homepage;
