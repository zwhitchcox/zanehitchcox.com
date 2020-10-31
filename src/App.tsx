import React from 'react';
import Header from './Cmpt/Header'
import Resume from './Pages/Resume'
import Refs from './Pages/Refs'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom"

import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Switch>
            <Route path="/refs">
              <Refs />
            </Route>
            <Route path="/">
              <Resume />
            </Route>
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;
