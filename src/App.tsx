import React, { useState } from 'react';
import Header from './Cmpt/Header'
import Resume from './Pages/Resume'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom"

function App() {
  const [darkMode, _setDarkMode] = useState(true)
  const setDarkMode = bool => {
    if (bool) {
      document.body.className="body-dark"
    } else {
      document.body.className= ""
    }
    _setDarkMode(bool)
  }
  return (
    <Router>
      <div className={`App ${darkMode ? "App-dark" : ""}`}>
        <Header {...({darkMode, setDarkMode})} />
        <main>
          <Switch>
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
