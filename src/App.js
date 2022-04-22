import React from 'react';
import { useSelector } from 'react-redux';
import {
  Redirect,
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import './App.css';
import CreatePlaylist from './pages/createplaylist';
import Login from './pages/login';


function App() {
  const isAuthorized = useSelector((state) => state.auth.isAuthorized);

  return (
    <Router>
      <Switch>
        <Route path="/create-playlist" exact>
          {isAuthorized ? <CreatePlaylist /> : <Redirect to="/" />}
        </Route>
        <Route path="/" exact>
          <Login />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
