import React from 'react';
import { Route } from 'react-router-dom';
import { PrivateRoute } from './redux/utils/PrivateRoute';
import './App.css';

import Home from './views/Home';
import Register from './views/Register';
import Login from './views/Login';
import Game from './views/Game';

function App() {
  return (
    <div>
      <Route exact path="/" component={Home} />
      <Route path="/register" component={Register} />
      <Route path="/login" component={Login} />
      <PrivateRoute path="/game" component={Game} />
    </div>
  );
}

export default App;
