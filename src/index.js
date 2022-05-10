import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import AuthProvider from './context/AuthProvider';
import App from './App';

const root = createRoot(document.getElementById('app'));
root.render(
  <BrowserRouter>
    <AuthProvider>
      <App />
    </AuthProvider>
  </BrowserRouter>
);
