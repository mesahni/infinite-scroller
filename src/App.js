import React from 'react';
import logo from './logo.svg';
import './App.css';
import Dropdown from "./components/Dropdown";


function App() {
  return (
    <div className="App">
      <h1>Select the theme</h1>
      <Dropdown />
    </div>
  );
}

export default App;
