import { AuthContext } from '../context/context';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { signOutFromApi } from '../auth';

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const signOut = () => {
    console.log('signing out');
    signOutFromApi();
    window.localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  const value = { user, setUser, signOut };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
