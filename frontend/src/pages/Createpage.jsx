import { Box, Container, useColorModeValue, VStack, Button, Heading, Input, Textarea, Select, useToast } from '@chakra-ui/react';
import { useState } from 'react';
import { useJobStore } from '../store/job';
import { SeoHelmet } from '../components/SeoHelmet';

const Createpage = () => {
    const [newJob, setNewJob] = useState({
        title: '',
        company: '',
        sector: '',
        location: '',
        image: '',
        description: '',
        salary: '',
        jobType: '',
        experience: '',
        skills: [''],
        applyLink: '',
        lastDate: ''
    });

    const toast = useToast();

    const { createJob } = useJobStore();

    const handleSubmit = async () => {
        const formattedJob = {
            ...newJob,
            jobType: newJob.jobType.charAt(0).toUpperCase() + newJob.jobType.slice(1), // Capitalize jobType
            skills: newJob.skills.split(",").map(skill => skill.trim()), // Convert skills to an array of strings
            lastDate: new Date(newJob.lastDate), // Convert lastDate to a Date object
        };

        const { success, message } = await createJob(formattedJob);
        if (!success) {
            toast({
                title: "Error",
                description: message,
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        } else {
            toast({
                title: "Success",
                description: message,
                status: "success",
                duration: 5000,
                isClosable: true,
            });
        }
        setNewJob({
            title: '',
            company: '',
            sector: '',
            location: '',
            image: '',
            description: '',
            salary: '',
            jobType: '',
            experience: '',
            skills: [''],
            applyLink: '',
            lastDate: ''
        });
    };

    return (
        <>
            <SeoHelmet title="Post a Job - SVD Jobs" description="Post a new job opportunity on SVD Jobs and reach top talent." />
            <Container maxW={"container.sm"} >
                <VStack spacing={8}>
                    <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
                        Create New Job
                    </Heading>
                    <Box
                        w={"full"} bg={useColorModeValue('white', 'gray.800')}
                        p={8} rounded={"lg"} shadow={"md"}>
                        <VStack spacing={4}>
                            <Input
                                placeholder="Job Title"
                                name="title"
                                value={newJob.title}
                                onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
                            />
                            <Input
                                placeholder="Company Name"
                                name="company"
                                value={newJob.company}
                                onChange={(e) => setNewJob({ ...newJob, company: e.target.value })}
                            />
                            <Select
                                placeholder="Sector"
                                name="sector"
                                value={newJob.sector}
                                onChange={(e) => setNewJob({ ...newJob, sector: e.target.value })}
                            >
                                <option value="Government">Government</option>
                                <option value="Private">Private</option>
                            </Select>
                            <Select
                                placeholder="Location"
                                name="location"
                                value={newJob.location}
                                onChange={(e) => setNewJob({ ...newJob, location: e.target.value })}
                            >
                                <option value="Remote">Remote</option>
                                <option value="On-site">On-site</option>
                                <option value="Hybrid">Hybrid</option>
                            </Select>
                            <Input
                                placeholder="Image URL"
                                name="image"
                                value={newJob.image}
                                onChange={(e) => setNewJob({ ...newJob, image: e.target.value })}
                            />
                            <Textarea
                                placeholder="Job Description"
                                name="description"
                                value={newJob.description}
                                onChange={(e) => setNewJob({ ...newJob, description: e.target.value })}
                            />
                            <Input
                                placeholder="Salary"
                                name="salary"
                                type="number"
                                value={newJob.salary}
                                onChange={(e) => setNewJob({ ...newJob, salary: e.target.value })}
                            />
                            <Select
                                placeholder="Job Type"
                                name="jobType"
                                value={newJob.jobType}
                                onChange={(e) => setNewJob({ ...newJob, jobType: e.target.value })}
                            >
                                <option value="full-time">Full-Time</option>
                                <option value="part-time">Part-Time</option>
                                <option value="contract">Contract</option>
                                <option value="internship">Internship</option>
                            </Select>
                            <Input
                                placeholder="Experience Required"
                                name="experience"
                                value={newJob.experience}
                                onChange={(e) => setNewJob({ ...newJob, experience: e.target.value })}
                            />
                            <Input
                                placeholder="Skills Required"
                                name="skills"
                                value={newJob.skills}
                                onChange={(e) => setNewJob({ ...newJob, skills: e.target.value })}
                            />
                            <Input
                                placeholder="Apply Link"
                                name="applyLink"
                                value={newJob.applyLink}
                                onChange={(e) => setNewJob({ ...newJob, applyLink: e.target.value })}
                            />
                            <Input
                                placeholder="Last Date to Apply"
                                name="lastDate"
                                type="date"
                                value={newJob.lastDate}
                                onChange={(e) => setNewJob({ ...newJob, lastDate: e.target.value })}
                            />
                            <Button colorScheme="blue" onClick={handleSubmit}>
                                Create Job
                            </Button>
                        </VStack>
                    </Box>
                </VStack>
            </Container>
        </>
    )
}

export default Createpage;

