
import { useEffect, useState } from 'react';
import axios from "axios";
import  Link  from 'next/link';

const useAuthStatus = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get('/api/me');
        const data = res.data;
        setIsLoggedIn(data.isLoggedIn);
        setIsAdmin(data.isAdmin);
        setUserEmail(data.email);
        setUserId(data.id);
      } catch {
        setIsLoggedIn(false);
        setIsAdmin(false);
        setUserEmail(null);
        setUserId(null);
      }
    };

    checkAuth();
  }, []);

  const logout = async () => {
    try {
      await axios.get('/api/logout');
      setIsLoggedIn(false);
      setIsAdmin(false);
      setUserEmail(null);
      setUserId(null);
      window.location.href = '/';
    } catch (err: any) {
      console.error('Logout failed:', err.message);
    }
  };

  return { isLoggedIn, isAdmin, userEmail, userId, logout };
};

export default useAuthStatus;
