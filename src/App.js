import React, { Component } from "react";
import "./App.css";
import TalkDropdown from "./talk-dropdown";
import AddInfo from "./add-info";

class App extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      fillOpen: false,
      addOpen: false
    };
  }

  toggle(e) {
    e.preventDefault();
    let update = Object.assign({}, this.state);
    const val = e.target.value;

    if (val === "fill") {
      update.fillOpen = !update.fillOpen;
      update.addOpen = false;
    }

    if (val === "add") {
      update.addOpen = !update.addOpen;
      update.fillOpen = false;
    }

    console.log(update);

    this.setState(update);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Rock the Stage</h1>
        </header>
        <main>
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <button value="fill" onClick={this.toggle}>
              Fill form
            </button>
            <button value="add" onClick={this.toggle}>
              Add talk
            </button>
          </div>
          <TalkDropdown className={this.state.fillOpen ? "show" : "hide"} />
          <AddInfo className={this.state.addOpen ? "show" : "hide"} />
        </main>
      </div>
    );
  }
}

export default App;
