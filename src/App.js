import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { Census } from './components/census/Census.component';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">US Census SPA</h1>
          <p>Application should allow to select a column (amongst demographic data), then display, for each different value in this column, number of lines with this value, and "age" value average.
Values must be sorted by decreasing order. One can display only 100 first values.</p>
        </header>
        <p className="App-intro">
          <Census />
        </p>
      </div>
    );
  }
}

export default App;
