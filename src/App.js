import React, { Component } from "react";
import "./App.css";
import TalkDropdown from "./talk-dropdown";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Rock the Stage</h1>
        </header>
        <p className="App-intro">Import JSON component</p>
        <TalkDropdown />
      </div>
    );
  }
}

export default App;
