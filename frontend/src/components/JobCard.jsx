import { EditIcon, DeleteIcon, ViewIcon } from '@chakra-ui/icons';
import {
    Box,
    HStack,
    IconButton,
    useColorModeValue,
    Heading,
    Text,
    Image,
    useToast,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalHeader,
    VStack,
    Input,
    Textarea,
    Select,
    Button,
    ModalContent,
    ModalCloseButton,
    ModalBody,
    Badge,
    Tooltip,
    Stack,
    Divider
} from '@chakra-ui/react';
import { useJobStore } from '../store/job';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../store/user';

const JobCard = ({ job, index }) => {
    // Initialize updateJob state with job data, ensuring jobType is lowercase
    // to match Select option values. The callback form of useState ensures
    // this logic runs only on initial mount.
    const [updateJob, setUpdateJob] = useState(() => ({
        ...job,
        jobType: job.jobType ? job.jobType.toLowerCase() : ""
    }));
    const textColor = useColorModeValue("gray.600", "gray.200");
    const bg = useColorModeValue("white", "gray.800");
    const { deleteJob, updateJob: updateJobFromStore, getJobByUniqueId } = useJobStore();
    const { isLoggedIn } = useUserStore();

    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const navigate = useNavigate();

    // Effect to reset form state with current job data when modal opens
    // or if the job prop changes while the modal might be open.
    useEffect(() => {
        if (isOpen) {
            setUpdateJob({
                ...job,
                jobType: job.jobType ? job.jobType.toLowerCase() : ""
            });
        }
    }, [job, isOpen]); // Dependencies: re-run if job or isOpen changes.

    const handleDeleteJob = async (jid) => {
        const { success, message } = await deleteJob(jid);
        if (!success) {
            toast({
                title: "Error",
                description: message,
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        } else {
            toast({
                title: "Success",
                description: message,
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    const handleUpdate = async (jid, updatedJob) => {
        const { success, message } = await updateJobFromStore(jid, updatedJob);
        onClose();
        if (!success) {
            toast({
                title: "Error",
                description: message,
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        } else {
            toast({
                title: "Success",
                description: "Job updated successfully",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    const handleViewJob = async () => {
        const { success, job: jobDetails } = await getJobByUniqueId(index);
        if (success) {
            navigate(`/jobs/view/${index}`);
        } else {
            console.error("Failed to fetch job details");
        }
    };

    return (
        <Box
            shadow={"lg"}
            rounded={"lg"}
            overflow={"hidden"}
            transform={"all 0.3s"}
            _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
            bg={bg}
        >
            <Image src={job.image} alt={job.title} h={48} w='full' objectFit={"cover"} />
            <Box p={6}>
                <Stack spacing={4}>
                    <Heading as={"h3"} size={"md"} mb={2} color={textColor}>{job.title}</Heading>
                    <HStack spacing={2}>
                        <Badge colorScheme="green">{job.jobType}</Badge>
                        <Badge colorScheme="blue">{job.experience}</Badge>
                        <Badge colorScheme="purple">{job.location}</Badge>
                    </HStack>
                    <Text fontSize={"lg"} color={textColor} fontWeight="bold">Company: {job.company}</Text>
                    <Text fontSize={"lg"} color={textColor} fontWeight="bold">Salary: ₹{job.salary}/- LPA</Text>
                    <Text fontSize={"sm"} color={textColor} mb={2}>Last Date: {job.lastDate}</Text>
                </Stack>
                <Divider my={4} />
                <HStack spacing={4} justifyContent="space-between">
                    <Tooltip label="View Job Details" aria-label="View Job Tooltip">
                        <IconButton icon={<ViewIcon />} onClick={handleViewJob} colorScheme='blue' aria-label='View Job details' />
                    </Tooltip>
                    {isLoggedIn && (
                        <>
                            <Tooltip label="Edit Job" aria-label="Edit Job Tooltip">
                                <IconButton icon={<EditIcon />} onClick={onOpen} colorScheme='yellow' aria-label='Edit Job' />
                            </Tooltip>
                            <Tooltip label="Delete Job" aria-label="Delete Job Tooltip">
                                <IconButton icon={<DeleteIcon />} onClick={() => handleDeleteJob(job._id)} colorScheme='red' aria-label='Delete Job' />
                            </Tooltip>
                        </>
                    )}
                </HStack>
            </Box>
            <Modal isOpen={isOpen} onClose={onClose} size="lg">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Update Job Details</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack spacing={4}>
                            <Input
                                placeholder="Job Title"
                                name="title"
                                value={updateJob.title}
                                onChange={(e) => setUpdateJob({ ...updateJob, title: e.target.value })}
                            />
                            <Input
                                placeholder="Company Name"
                                name="company"
                                value={updateJob.company}
                                onChange={(e) => setUpdateJob({ ...updateJob, company: e.target.value })}
                            />
                            <Select
                                placeholder="Location"
                                name="location"
                                value={updateJob.location}
                                onChange={(e) => setUpdateJob({ ...updateJob, location: e.target.value })}
                            >
                                <option value="Remote">Remote</option>
                                <option value="On-site">On-site</option>
                                <option value="Hybrid">Hybrid</option>
                            </Select>
                            <Input
                                placeholder="Image URL"
                                name="image"
                                value={updateJob.image}
                                onChange={(e) => setUpdateJob({ ...updateJob, image: e.target.value })}
                            />
                            <Textarea
                                placeholder="Job Description"
                                name="description"
                                value={updateJob.description}
                                onChange={(e) => setUpdateJob({ ...updateJob, description: e.target.value })}
                            />
                            <Input
                                placeholder="Salary"
                                name="salary"
                                value={updateJob.salary}
                                onChange={(e) => setUpdateJob({ ...updateJob, salary: e.target.value })}
                            />
                            <Select
                                placeholder="Job Type"
                                name="jobType"
                                value={updateJob.jobType}
                                onChange={(e) => setUpdateJob({ ...updateJob, jobType: e.target.value })}
                            >
                                <option value="full-time">Full-Time</option>
                                <option value="part-time">Part-Time</option>
                                <option value="contract">Contract</option>
                                <option value="internship">Internship</option>
                            </Select>
                            <Input
                                placeholder="Experience Required"
                                name="experience"
                                value={updateJob.experience}
                                onChange={(e) => setUpdateJob({ ...updateJob, experience: e.target.value })}
                            />
                            <Input
                                placeholder="Skills Required"
                                name="skills"
                                value={updateJob.skills}
                                onChange={(e) => setUpdateJob({ ...updateJob, skills: e.target.value })}
                            />
                            <Input
                                placeholder="Apply Link"
                                name="applyLink"
                                value={updateJob.applyLink}
                                onChange={(e) => setUpdateJob({ ...updateJob, applyLink: e.target.value })}
                            />
                            <Input
                                placeholder="Last Date to Apply"
                                name="lastDate"
                                type="date"
                                value={updateJob.lastDate}
                                onChange={(e) => setUpdateJob({ ...updateJob, lastDate: e.target.value })}
                            />
                            <HStack spacing={2}>
                                <Button colorScheme="blue" onClick={() => handleUpdate(job._id, updateJob)}>
                                    Update
                                </Button>
                                <Button variant="ghost" onClick={onClose}>
                                    Cancel
                                </Button>
                            </HStack>
                        </VStack>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Box>
    );
};

export default JobCard;
