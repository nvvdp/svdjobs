import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUsertore } from '../store/user';

const useAuth = (requiredRole) => {
  const getProfile = useUsertore((state) => state.getProfile);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.warn('No token found, redirecting to login.');
      navigate('/login');
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await getProfile();
        console.log('Profile response:', response);

        if (!response.success) {
          console.error('Failed to fetch profile:', response.message);
          navigate('/login');
          return;
        }

        const userRole = response.user.role;
        console.log(`User role: ${userRole}, Required role: ${requiredRole}`);

        if (requiredRole && userRole !== requiredRole) {
          console.warn(`User role mismatch. Required: ${requiredRole}, Found: ${userRole}`);
          navigate('/'); // Redirect to homepage if role does not match
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        navigate('/login');
      }
    };

    fetchProfile();
  }, [navigate, requiredRole]);
};

export default useAuth;