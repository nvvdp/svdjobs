import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Flex, Text, Icon, Container, HStack, useColorModeValue, Tooltip } from '@chakra-ui/react';
import { FaFacebook, FaLinkedin, FaInstagram, FaGithub, FaYoutube } from 'react-icons/fa';

const Topbar = () => {
    const [currentDateTime, setCurrentDateTime] = useState('');
    const iconColor = useColorModeValue('gray.900', 'white');

    useEffect(() => {
        const updateDateTime = () => {
            const now = new Date();
            const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            const dayName = dayNames[now.getDay()];
            const dateStr = `${dayName}, ${now.getDate().toString().padStart(2, '0')}/${(
              now.getMonth() + 1
            ).toString().padStart(2, '0')}/${now.getFullYear()}`;
            const hours = now.getHours();
            const isPM = hours >= 12;
            const formattedHours = (hours % 12 || 12).toString().padStart(2, '0');
            const timeStr = `${formattedHours}:${now.getMinutes().toString().padStart(2, '0')}:${now
              .getSeconds()
              .toString()
              .padStart(2, '0')} ${isPM ? 'PM' : 'AM'}`;
            setCurrentDateTime(`${dateStr} | ${timeStr}`);
        };

        updateDateTime();
        const intervalId = setInterval(updateDateTime, 1000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <Container maxW={"dvw"} px={4} py={2}>
            <Flex
                h={16}
                justifyContent="space-between"
                alignItems="center"
                flexDir={{ base: 'column', sm: 'row' }}>
                <Text 
                    fontSize={{
                        base: "20",
                        sm: "20"
                    }} 
                    textAlign={"center"}
                    bgGradient={
                        "linear(to-l, cyan.400, blue.500)"
                    }
                    bgClip={"text"}
                >
                    {currentDateTime}
                </Text>
                <HStack spacing={2} alignItems="center">
                    <Tooltip label="Facebook" hasArrow>
                    <Link to={"https://www.facebook.com/"} target='_blank' lable="Facebook">
                        <Button target='_blank' aria-label="Facebook" lable="Facebook">
                            <Icon as={FaFacebook} boxSize={5} color={iconColor} _hover={{ color: 'blue.400' }} />
                        </Button>
                    </Link>
                    </Tooltip>
                    <Tooltip label="LinkedIn" hasArrow>
                    <Link to={"https://www.linkedin.com/"} target='_blank' lable="LinkedIn">
                        <Button target='_blank' aria-label="LinkedIn" lable="LinkedIn">
                            <Icon as={FaLinkedin} boxSize={5} color={iconColor} _hover={{ color: 'blue.400' }} />
                        </Button>
                    </Link>
                    </Tooltip>
                    <Tooltip label="Instagram" hasArrow>
                    <Link to={"https://www.instagram.com/"} target='_blank' lable="Instagram">
                        <Button target='_blank' aria-label="Instagram" lable="Instagram">
                            <Icon as={FaInstagram} boxSize={5} color={iconColor} _hover={{ color: 'pink.400' }} />
                        </Button>
                    </Link>
                    </Tooltip>
                    <Tooltip label="GitHub" hasArrow>
                    <Link to={"https://github.com/"} target='_blank' lable="GitHub">
                        <Button target='_blank' aria-label="GitHub" lable="GitHub">
                            <Icon as={FaGithub} boxSize={5} color={iconColor} _hover={{ color: 'gray.400' }} />
                        </Button>
                    </Link>
                    </Tooltip>
                    <Tooltip label="YouTube" hasArrow>
                    <Link to={"https://www.youtube.com/"} target='_blank' lable="YouTube">
                        <Button target='_blank' aria-label="YouTube"  lable="YouTube">
                            <Icon as={FaYoutube} boxSize={5} color={iconColor} _hover={{ color: 'red.400' }} />
                        </Button>
                    </Link>
                    </Tooltip>
                </HStack>
            </Flex>
        </Container>
    );
};

export default Topbar;
