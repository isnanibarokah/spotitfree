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
import { RootState } from './redux/store';


function App() {
  const isAuthorized: boolean = useSelector(
    (state: RootState) => state.auth.isAuthorized
  );

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
