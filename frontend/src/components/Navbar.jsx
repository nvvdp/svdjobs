import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Container, Flex, HStack, Text, useColorMode } from '@chakra-ui/react';
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

        if (token) {
            navigate('/'); // Redirect to home after login
        }
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
                <Text 
                    fontSize={{
                        base: "22",
                        sm: "28"
                    }} 
                    fontWeight={"bold"}
                    textTransform={"uppercase"}
                    textAlign={"center"}
                    bgGradient={
                        "linear(to-l, cyan.400, blue.500)"
                    }
                    bgClip={"text"}
                    >
                    <Link to={"/"}>SVD Jobs</Link>               
                </Text>

                <HStack spacing={2} alignItems="center">
                    <Link to={"/"}>
                        <Button>
                            <IoHome fontSize={20} />
                        </Button>
                    </Link>
                    {isAdmin && (
                        <Link to={"/create"}>
                            <Button>
                                <PlusSquareIcon fontSize={20} />
                            </Button>
                        </Link>
                    )}
                    {isLoggedIn ? (
                        <>
                            <Link to={"/profile"}>
                                <Button>
                                    <IoPerson fontSize={20} />
                                </Button>
                            </Link>
                            <Button onClick={handleLogout}>
                                <IoLogOut fontSize={20} />
                            </Button>
                        </>
                    ) : (
                        <Link to={"/login"}>
                            <Button>
                                <IoLogIn fontSize={20} />
                            </Button>
                        </Link>
                    )}
                    <Button onClick={toggleColorMode}>
                        {colorMode === "light" ? <IoMoon /> : 
                        < LuSun size="20" /> }
                    </Button>
                </HStack>
            </Flex>
        </Container>
    );
};

export default Navbar;
