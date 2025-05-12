import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Container, Flex, HStack, Text, useColorMode, Tooltip, Box, Image } from '@chakra-ui/react';
import { PlusSquareIcon } from '@chakra-ui/icons';
import { IoMoon, IoHome, IoPerson, IoLogOut, IoLogIn } from 'react-icons/io5';
import { LuSun } from 'react-icons/lu';
import { useUserStore } from '../store/user';

const Navbar = () => {
    const getProfile = useUserStore((state) => state.getProfile);
    const isLoggedIn = useUserStore((state) => state.isLoggedIn);
    const setIsLoggedIn = useUserStore((state) => state.setIsLoggedIn);
    const { colorMode, toggleColorMode } = useColorMode();
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const tokenExists = !!token;

        if (isLoggedIn !== tokenExists) {
            setIsLoggedIn(tokenExists);
            return;
        }

        if (isLoggedIn) {
            // If logged in, fetch the user's profile to determine admin status.
            const fetchProfile = async () => {
                try {
                    const response = await getProfile();
                    if (response && response.success) {
                        setIsAdmin(response.user.role === 'admin');
                    } else {
                        // Profile fetch failed or was unsuccessful (e.g., token expired/invalid)
                        console.error("Failed to fetch profile:", response ? response.message : "Profile fetch unsuccessful or API error");
                        setIsAdmin(false);
                        // If the failure is due to an authentication issue, log the user out.
                        const isAuthError = (response && response.status === 401) ||
                                            (response && response.message && response.message.toLowerCase().includes("unauthorized"));
                        if (isAuthError) {
                            localStorage.removeItem('token');
                            setIsLoggedIn(false); // This will trigger this effect again, leading to the 'else' block.
                        }
                    }
                } catch (error) {
                    console.error("Error fetching profile:", error);
                    setIsAdmin(false); 
                    if (error.response && error.response.status === 401) {
                        localStorage.removeItem('token');
                        setIsLoggedIn(false); // This will trigger this effect again.
                    }
                }
            };
            fetchProfile();
        } else {
            // If not logged in, ensure admin status is false.
            setIsAdmin(false);
            // As a safeguard, if somehow `isLoggedIn` is false but a token still exists in localStorage, remove it.
            if (token) { // `token` is the value read at the start of this effect.
                localStorage.removeItem('token');
            }
        }

        // FIX: Remove unconditional redirect to home
        // if (token) {
        //     navigate('/'); // Redirect to home after login
        // }
    }, [isLoggedIn, setIsLoggedIn, navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        navigate('/'); // Redirect to home after logout
    };

    return (
        <Container maxW={"dvw"} px={4} py={1}>
            <Flex
                h={16}
                justifyContent="space-between"
                alignItems="center"
                flexDir={{
                    base: 'column',
                    sm: 'row'
                }}>
                <Box display="flex" alignItems="center" justifyContent="center">
                    <Image
                        src="/home.svg" // Place your logo in public/ or update the path
                        alt="SVD Jobs Logo"
                        mr={2}
                        fallback={
                            <Text
                                fontSize={{ base: '22', sm: '28' }}
                                fontWeight="bold"
                                textTransform="uppercase"
                                textAlign="center"
                                bgGradient="linear(to-l, cyan.400, blue.500)"
                                bgClip="text"
                            >
                                <Link to={"/"}>SVD Jobs</Link>
                            </Text>
                        }
                    />
                </Box>

                <HStack spacing={2} alignItems="center">
                    <Tooltip label="Home" hasArrow>
                        <Link to={"/"}>
                            <Button>
                                <IoHome fontSize={20} />
                            </Button>
                        </Link>
                    </Tooltip>
                    {isAdmin && (
                        <Tooltip label="Create Job" hasArrow>
                            <Link to={"/create"}>
                                <Button>
                                    <PlusSquareIcon fontSize={20} />
                                </Button>
                            </Link>
                        </Tooltip>
                    )}
                    {isLoggedIn ? (
                        <>
                            <Tooltip label="Profile" hasArrow>
                                <Link to={"/profile"} label="Profile">
                                    <Button>
                                        <IoPerson fontSize={20} />
                                    </Button>
                                </Link>
                            </Tooltip>
                            <Tooltip label="Logout" hasArrow>
                                <Button onClick={handleLogout}>
                                    <IoLogOut fontSize={20} />
                                </Button>
                            </Tooltip>
                        </>
                    ) : (
                        <Tooltip label="Login" hasArrow>
                            <Link to={"/login"} label="Login">
                                <Button>
                                    <IoLogIn fontSize={20} />
                                </Button>
                            </Link>
                        </Tooltip>
                    )}
                    <Tooltip label={colorMode === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"} hasArrow>
                        <Button onClick={toggleColorMode} >
                            {colorMode === "light" ? <IoMoon /> : 
                            < LuSun size="20" /> }
                        </Button>
                    </Tooltip>
                </HStack>
            </Flex>
        </Container>
    );
};

export default Navbar;
