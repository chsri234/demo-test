import React from 'react';
import './App.css';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Simple React App</h1>
      </header>
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />          
          <Route path="/dashboard" component={Dashboard} />
          <Route path="*">
            <Login />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
