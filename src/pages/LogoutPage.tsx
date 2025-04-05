
import { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

const LogoutPage = () => {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const performLogout = async () => {
      try {
        await signOut();
        navigate('/');
      } catch (error) {
        console.error("Logout error:", error);
        navigate('/');
      }
    };
    
    performLogout();
  }, [signOut, navigate]);

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <Loader2 className="h-16 w-16 animate-spin text-purple-700 mb-4" />
      <h1 className="text-2xl font-semibold">Logging you out...</h1>
      <p className="text-gray-500 mt-2">You'll be redirected to the home page shortly.</p>
    </div>
  );
};

export default LogoutPage;
