import React from 'react';
import logo from './logo.svg';
import './App.scss';
import MainTable from './MainTable';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Profit Calculator
        </p>
      </header>
      <MainTable/>
    </div>
  );
}

export default App;
