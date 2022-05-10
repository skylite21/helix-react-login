import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/context';

const IndexPage = () => {
  const user = useContext(AuthContext);

  if (!user) {
    return <Navigate to='/login' replace />;
  }

  return <Navigate to='/dashboard' replace />;
};

export default IndexPage;
