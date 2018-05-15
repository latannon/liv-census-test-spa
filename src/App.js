import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

import Census from "./components/census/Census.component";

/**
 * Application main component
 *
 * @class App
 * @extends {Component}
 */
class App extends Component {
  render() {
    console.log("REACT_APP_API_ROOT : ", process.env.REACT_APP_API_ROOT_URL);
    console.log("NODE_ENV : ", process.env.NODE_ENV);
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">US Census SPA</h1>
          <p>
            Select a variable (amongst demographic data), then display, for each
            different value in this column, number of lines with this value, and
            "age" value average.
          </p>
        </header>
        <div className="App-intro">
          <Census />
        </div>
      </div>
    );
  }
}

export default App;
