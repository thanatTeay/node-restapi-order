import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Homepage from './Pages/Homepage'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={Homepage}></Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
