import React from 'react';
import { Route } from 'react-router';
import App from './App';
import LoginPage from './pages/LoginPage';

export default (
  <Route path='/' handler={App}>
    <Route name='login' path='login' handler={LoginPage} />
  </Route>
);
