import React, { useContext, useEffect, useState } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AuthContext } from './context/context';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import IndexPage from './pages/IndexPage';
import './scss/index.scss';
import { checkToken } from './auth';
import PreLoader from './components/PreLoader';
import ForgotPasswordPage from './pages/ForgotPasswordPage';

export default function App() {
  const { setUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = window.localStorage.getItem('token');
    if (token) {
      console.log('token found: ', token);
      checkToken(token).then((userFromApi) => {
        userFromApi && setUser({ ...userFromApi, token });
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <>
      {loading ? (
        <PreLoader />
      ) : (
        <Routes>
          <Route path='/' element={<IndexPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/login/forgot' element={<ForgotPasswordPage />} />
          <Route
            path='/dashboard'
            element={
              <RequireAuth>
                <DashboardPage />
              </RequireAuth>
            }
          />
          <Route path='*' element={<h1> Page not found </h1>} />
        </Routes>
      )}
    </>
  );
}

function RequireAuth({ children }) {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  console.log('user in requireAuth', user);

  if (!user) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.

    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  return children;
}
