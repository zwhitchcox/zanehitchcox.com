import React, { useEffect, useState } from 'react';
import Header from './Cmpt/Header'
import Resume from './Pages/Resume'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom"

const DARK_SAVE = "DARK_SAVE"
const curHour = (new Date).getHours()
const hourDarkState = curHour < 9 || curHour > 12 + 6
const lsDarkState = localStorage.getItem(DARK_SAVE)
const initDarkState = lsDarkState ? lsDarkState === "true" : hourDarkState

function App() {
  const [darkMode, _setDarkMode] = useState(initDarkState)
  useEffect(() => {
    if (initDarkState) {
      document.body.className="body-dark"
    } else {
      document.body.className= ""
    }
  }, [])
  const setDarkMode = bool => {
    if (bool) {
      document.body.className="body-dark"
    } else {
      document.body.className= ""
    }
    localStorage.setItem(DARK_SAVE, bool)
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
