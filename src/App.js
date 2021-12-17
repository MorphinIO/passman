import React, { Component } from 'react';
import CreateAccount from './components/createAccount';
import LoggedIn from './components/loggedIn';
import SetPassword from './components/setpassword';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router';
import './App.css'; 

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/" component={CreateAccount} />
          <Route path="/loggedin" component={LoggedIn} />
          <Route path="/setsassword" component={SetPassword} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
