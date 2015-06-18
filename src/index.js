import React from 'react';
import router from './router';
import WebsocketClient from './WebsocketClient';

const wsClient = new WebsocketClient();
console.log(wsClient);
const rootEl = document.getElementById('root');
router.run((Handler, state) =>
  React.render(<Handler {...state} />, rootEl)
);
