import { Box, useColorModeValue } from '@chakra-ui/react';
import { Route, Routes } from 'react-router-dom';

import Navbar from './components/Navbar';
import Topbar from './components/Topbar';
import Createpage from './pages/Createpage';
import Homepage from './pages/Homepage';
import Viewjob from './pages/Viewjob';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Logout from './pages/Logout';

function App() {

  return (
    <Box minH={"100vh"}  bg={useColorModeValue('gray.100', 'gray.900')}>
      <Topbar />
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/create" element={<Createpage />} />
        <Route path="/jobs/view/:id" element={<Viewjob />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </Box>
  );
}

export default App;
