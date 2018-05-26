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

  componentDidMount() {
    // Get data from local storage
    const storedState = localStorage.getItem("rock-the-stage");
    if (storedState) {
      let newState = JSON.parse(storedState);
      let talks = newState.talks || [];
      let speaker = newState.speaker || {};
      this.setState({ talks, speaker });
    }
  }

  updateData(data) {
    localStorage.setItem("rock-the-stage", JSON.stringify(data));
  }

  editSpeaker() {}

  addTalk() {
    let newTalk = {
      title: document.getElementById("title").value,
      abstract: document.getElementById("abstract").value,
      details: document.getElementById("details").value
    };

    let allData = {
      speaker: this.state.speaker,
      talks: [...this.state.talks, newTalk]
    };
    this.updateData(allData);

    this.setState(allData);
  }

  deleteTalk() {}

  render() {
    return (
      <div className={this.props.className}>
        <h2 className="App-intro">Speaker Info</h2>

        <h2 className="App-intro">Talks Info</h2>
        {this.state.talks.map((talk, index) => {
          return (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <h3 style={{ display: "inline" }}>{talk.title}</h3>
              <button value="edit" onClick="this.editTalk">
                Edit
              </button>
            </div>
          );
        })}

        <h2 className="App-intro">Add New Talk</h2>
        <div>
          <form>
            <div className="form-container">
              <label htmlFor="title">Talk title</label>
              <input type="text" id="title" />
            </div>
            <div className="form-container">
              <label htmlFor="abstract">Talk abstract</label>
              <textarea id="abstract" />
            </div>
            <div className="form-container">
              <label htmlFor="details">Talk details</label>
              <textarea id="details" />
            </div>
            <div className="form-container">
              <button value="submit" onClick={this.addTalk}>
                Add talk
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default App;
