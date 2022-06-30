import React from 'react';
import Header from './Cmpt/Header'
import Resume from './Pages/Resume'
import { useSelector } from 'react-redux';
import "./App.scss";

function App() {
  const darkMode = useSelector((state: any) => state.darkMode.on);

  return (
    <div className={`App ${darkMode ? "App-dark" : ""}`}>
      <Header />
      <main>
        <Resume />
      </main>
    </div>
  );
}

export default App;
