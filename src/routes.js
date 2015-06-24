import React from 'react';
import { Route } from 'react-router';
import App from './App';
import LoginPage from './pages/LoginPage';
import ListCards from './pages/ListCards';

export default (
  <Route path='/' handler={App}>
    <Route name='login' path='/login' handler={LoginPage} >
      <Route name='listCards' path='/login/:login' handler={ListCards} />
    </Route>
  </Route>
);
