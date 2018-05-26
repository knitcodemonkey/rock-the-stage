/*global chrome*/
import React, { Component } from "react";
import "./App.css";

const styles = {
  label: {
    display: "block"
  }
};

class TalkDropdown extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.fillOutForm = this.fillOutForm.bind(this);
  }

  state = {
    talks: [
      {
        title: "Styling React for Reuse",
        abstract: "The abstract",
        details: "The description and details"
      }
    ],
    speaker: {
      name: "Jen Luker",
      email: "knittingcodemonkey@gmail.com",
      twitter: "knitcodemonkey",
      github: "knitcodemonkey"
    },
    selectedTalk: -1
  };

  componentDidMount() {
    // Get data from local storage
    const storedState = localStorage.getItem("rock-the-stage");
    if (storedState) {
      let newState = JSON.parse(storedState);
      this.setState(newState);
    }
  }

  handleChange(e) {
    this.setState({ selectedTalk: e.target.value });
  }

  fillOutForm(e) {
    e.preventDefault();
    const speaker = this.state.speaker;
    const talk = this.state.talks[
      this.state.selectedTalk >= 0 ? this.state.selectedTalk : false
    ];
    console.log(e.target.value, talk);
    chrome.tabs.executeScript(
      {
        code:
          "(" +
          function(data) {
            document.querySelectorAll("input").forEach(function(field) {
              //console.log(field.getAttribute("aria-label"));
              switch (field.getAttribute("aria-label")) {
                case "Full name":
                  field.value = data.speaker.name || "";
                  break;
                case "Your email":
                  field.value = data.speaker.email || "";
                  break;
                case "Twitter":
                  field.value = data.speaker.twitter || "";
                  break;
                case "Github":
                  field.value = data.speaker.github || "";
                  break;
                case "Speaker photo (URL)":
                  field.value = data.speaker.photo || "";
                  break;
                case "Talk title":
                  field.value = data.talk.title || "";
                  break;
                default:
                  field.value = "";
              }
            });

            document.querySelectorAll("textarea").forEach(function(field) {
              console.log(field.getAttribute("aria-label"));
              switch (field.getAttribute("aria-label")) {
                default:
                  field.value = "";
              }
            });
            return { success: true, html: document.body.innerHTML };
          } +
          ")(" +
          JSON.stringify({ speaker, talk }) +
          ");"
      },
      function(results) {
        console.log(results[0], speaker);
      }
    );
  }

  render() {
    return (
      <form>
        <div className="form-container">
          <label htmlFor="selectTalk" style={styles.label}>
            Please choose a talk
          </label>
          <select
            id="selectTalk"
            name="select-talk"
            aria-labelledby="select a talk"
            onChange={this.handleChange}
          >
            <option value={-1} key={`talk_none`}>
              Please select a talk
            </option>
            {this.state.talks.map((talk, index) => {
              return (
                <option value={index} key={`talk_${index}`}>
                  {talk.title}
                </option>
              );
            })}
          </select>
        </div>

        <div className="form-container">
          <button value="submit" onClick={this.fillOutForm}>
            Fill out form
          </button>
        </div>
      </form>
    );
  }
}

export default TalkDropdown;
