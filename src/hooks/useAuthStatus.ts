import { useEffect, useState } from 'react';

const useAuthStatus = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkUserStatus = () => {
      const user = localStorage.getItem('user');
      if (user) {
        const userData = JSON.parse(user);
        setIsAdmin(userData.role === 'admin');
        setIsLoggedIn(true);
      } else {
        setIsAdmin(false);
        setIsLoggedIn(false);
      }
    };

    checkUserStatus();
    window.addEventListener('storage', checkUserStatus);

    return () => {
      window.removeEventListener('storage', checkUserStatus);
    };
  }, []);

  const logout = () => {
    localStorage.removeItem('user');
    setIsAdmin(false);
    setIsLoggedIn(false);
    window.location.href = '/';
  };

  return { isLoggedIn, isAdmin, logout };
};

export default useAuthStatus;