import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.updateData = this.updateData.bind(this);
  }

  state = {
    talks: [],
    speaker: {}
  };

  updateData() {
    localStorage.setItem("rock-the-stage", JSON.stringify(this.state));
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Rock the Stage</h1>
        </header>
        <p className="App-intro">Import JSON component</p>
        <p>Select and populate component</p>
      </div>
    );
  }
}

export default App;
