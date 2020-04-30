import React from 'react';
import { Route } from 'react-router-dom';
import './App.css';

import Home from './views/Home';
import Register from './views/Register';
import Login from './views/Login';
import Game from './views/Game';
import ChatRoom from './common/ChatRoom';

function App() {
  return (
    <div>
      <Route exact path="/" component={Home} />
      <Route path="/register" component={Register} />
      <Route path="/login" component={Login} />
      <Route path="/game" component={Game} />
      <Route path="/chat" component={ChatRoom} />
    </div>
  );
}

export default App;
