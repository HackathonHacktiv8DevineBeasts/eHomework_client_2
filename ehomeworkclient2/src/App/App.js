import React from 'react';
import './App.css';
import Login from '../views/Login'
import Home from '../views/Home'
import { Switch, Route } from "react-router-dom";

function App() {
  
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <Login></Login>
        </Route>
        <Route path="/home">
          <Home></Home>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
