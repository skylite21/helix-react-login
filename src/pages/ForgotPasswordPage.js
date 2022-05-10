import React from 'react';
import { Link } from 'react-router-dom';

const ForgotPasswordPage = () => {
  return (
    <div className='login-signup-container'>
      <Link to='/login' className='button'>
        Go Back
      </Link>
      <div className='block-log-in'>
        <h2>Reset your password</h2>
        <input type='text' id='forgotPasswordEmail' placeholder='email' />
        <button className='button'>Reset Password</button>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
