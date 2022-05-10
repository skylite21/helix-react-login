import { useNavigate, Link, useLocation } from 'react-router-dom';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/context';
import { signIn, signUp } from '../auth';

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, setUser } = useContext(AuthContext);
  const [loginActive, setLoginActive] = useState(true);

  const from = location.state?.from?.pathname || '/dashboard';

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const username = formData.get('email');
    const password = formData.get('password');

    if (!loginActive) {
      console.log('processing sign up...');
      const passwordConfirm = formData.get('passwordConfirm');
      console.log(password, passwordConfirm);
      if (passwordConfirm !== password) {
        window.alert('Passwords do not match!');
        return;
      }
      const data = await signUp({ username, password });
      if (data.error) return window.alert(JSON.stringify(data.error));
    }

    const data = await signIn({ username, password });
    if (data.error) return window.alert(JSON.stringify(data.error));
    // Send them back to the page they tried to visit when they were
    // redirected to the login page. Use { replace: true } so we don't create
    // another entry in the history stack for the login page.  This means that
    // when they get to the protected page and click the back button, they
    // won't end up back on the login page, which is also really nice for the
    // user experience.
    if (data.token) {
      setUser({ ...user, token: data.token, name: username });
      window.localStorage.setItem('token', data.token);
    }
    navigate(from, { replace: true });
  }
  return (
    <div>
      {from === '/' ? null : <p className='alert'>You must log in to view the page at {from}</p>}

      <form onSubmit={handleSubmit}>
        <div className='login-signup-container'>
          <div className='top-buttons'>
            <div className={`active ${loginActive ? '' : 'js-left-50'}`} />
            <div
              className='button-left'
              role='button'
              tabIndex={0}
              onClick={() => setLoginActive(!loginActive)}
              onKeyPress={() => setLoginActive(!loginActive)}>
              Login
            </div>
            <div
              className='button-right'
              role='button'
              tabIndex={0}
              onClick={() => setLoginActive(!loginActive)}
              onKeyPress={() => setLoginActive(!loginActive)}>
              Sign up
            </div>
          </div>
          {loginActive ? (
            <div className='block-log-in'>
              <h1>Log in</h1>
              <input type='text' name='email' placeholder='email' />
              <input type='password' name='password' placeholder='password' />
              <Link to='/login/forgot' className='forgot-password'>
                Forgot your password?
              </Link>
              <button type='submit' className='button log-in-button'>
                Log In
              </button>
            </div>
          ) : (
            <div className='block-sign-up'>
              <h1>Sign Up</h1>
              <input type='text' name='email' placeholder='email' />
              <input type='password' name='password' placeholder='password' />
              <input type='password' name='passwordConfirm' placeholder='verify password' />
              <button type='submit' className='button sign-up-button'>
                Sign Up
              </button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
