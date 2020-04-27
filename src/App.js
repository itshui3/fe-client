import React from 'react';
import { Route } from 'react-router-dom';
import './App.css';

import Home from './views/Home';
import Register from './views/Register';
import Login from './views/Login';

function App() {
  return (
    <div>
      <Route exact path="/" component={Home} />
      <Route path="/register" component={Register} />
      <Route path="/login" component={Login} />
    </div>
  );
}

export default App;
