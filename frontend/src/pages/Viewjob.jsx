import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
    Box,
    Container,
    Heading,
    Image,
    Spinner,
    Text,
    Alert,
    AlertIcon,
    VStack,
    HStack,
    Badge,
    Button,
    Link as ChakraLink,
    useColorModeValue,
} from '@chakra-ui/react';
import { useJobStore } from '../store/job';
import { SeoHelmet } from '../components/SeoHelmet';

const Viewjob = () => {
    const { id } = useParams(); // Get the job ID from the URL
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { getJobByUniqueId } = useJobStore();

    // Hoist useColorModeValue calls to the top level
        const boxBg = useColorModeValue("white", "gray.800");
        const headingColor = useColorModeValue("blue.600", "blue.300");
        const textColor = useColorModeValue("gray.600", "gray.300");

    useEffect(() => {
        const fetchJob = async () => {
            const { success, job: jobDetails, message } = await getJobByUniqueId(id);
            if (success) {
                setJob(jobDetails);
            } else {
                setError(message || 'Failed to fetch job details');
            }
            setLoading(false);
        };

        fetchJob();
    }, [id, getJobByUniqueId]);

    if (loading) {
        return (
            <Container maxW="container.xl" p={4} centerContent>
                <Spinner size="xl" color="blue.500" />
            </Container>
        );
    }

    if (error) {
        return (
            <Container maxW="container.xl" p={4} centerContent>
                <Alert status="error" borderRadius="md" boxShadow="lg">
                    <AlertIcon />
                    {error}
                </Alert>
            </Container>
        );
    }

    if (error) {
            return (
                <Container maxW="container.xl" p={4} centerContent>
                    <Alert status="error" borderRadius="md" boxShadow="lg">
                        <AlertIcon />
                        {error}
                    </Alert>
                </Container>
            );
        }

    const isPastDeadline = new Date(job.lastDate) < new Date();

    return (
        <>
            <SeoHelmet title="Job Details - SVD Jobs" description="View job details and apply for your next opportunity on SVD Jobs." />
            <Container maxW="container.xl" p={4}>
                <VStack spacing={6} align="stretch">
                    <Image
                        src={job.image}
                        alt={job.title}
                        borderRadius="lg"
                        boxShadow="lg"
                        objectFit="cover"
                        w="full"
                        h={{ base: "200px", md: "400px" }}
                    />
                    <Box p={6} bg={boxBg} borderRadius="lg" boxShadow="lg">
                        <Heading as="h1" size="xl" mb={4} color={headingColor}>
                            {job.title}
                        </Heading>
                        <HStack spacing={4} mb={4}>
                            <Badge colorScheme="green">{job.jobType}</Badge>
                            <Badge colorScheme="purple">{job.experience} Experience</Badge>
                            <Badge colorScheme="blue">₹{job.salary} LPA</Badge>
                        </HStack>
                        <Text  fontSize="lg" color={textColor} mb={2}>
                            <strong>Company:</strong> {job.company}
                        </Text>
                        <Text  fontSize="lg" color={textColor} mb={2}>
                            <strong>Location:</strong> {job.location}
                        </Text>
                        <Text  fontSize="lg" color={textColor} mb={2}>
                            <strong>Skills:</strong> {Array.isArray(job.skills) ? job.skills.join(', ') : 'No skills listed'}
                        </Text>
                        <Text fontSize="lg" color={textColor} mb={4}>
                            <strong>Description:</strong> {job.description}
                        </Text>
                        <Text fontSize="lg" color={textColor} mb={4}>
                            <strong>Last Date:</strong> {new Date(job.lastDate).toLocaleDateString()}
                        </Text>
                        <HStack spacing={4}>
                            <Button
                                colorScheme="blue"
                                as={ChakraLink}
                                href={job.applyLink}
                                isExternal
                                isDisabled={isPastDeadline}
                                _hover={isPastDeadline ? {} : { textDecoration: "underline" }}
                            >
                                {isPastDeadline ? "Application Closed" : "Apply Now"}
                            </Button>
                        </HStack>
                    </Box>
                </VStack>
            </Container>
        </>
    );
};

export default Viewjob;
