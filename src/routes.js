import React from 'react';
import { Route } from 'react-router';
import App from './App';
import AppClone from './AppClone';

export default (
  <Route name='explore' path='/' handler={App}>
    <Route name='EntryClone' path='/:clone' handler={AppClone} />
  </Route>
);
