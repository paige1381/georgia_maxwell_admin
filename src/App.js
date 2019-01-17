import React, { Component } from "react";
import axios from "axios";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      missingEmails: 0
    };
    this.calculateMissingEmails = this.calculateMissingEmails.bind(this);
  }

  componentWillMount() {
    axios
      .get("https://georgia-maxwell-backend.herokuapp.com/invites")
      .then(res => {
        this.setState(
          {
            data: res.data
          },
          () => {
            this.calculateMissingEmails();
          }
        );
      })
      .catch(err => {
        console.log(err);
      });
  }

  calculateMissingEmails() {
    let missingEmails = 0;
    this.state.data.map(item => {
      if (!item.email) {
        missingEmails++;
      }
      return missingEmails;
    });
    this.setState({
      missingEmails
    });
  }

  render() {
    return (
      <div className="App">
        <h1>Yay Marriage!</h1>
        <h4>
          Before you is the full and unabridged version of Georgia and Maxwell's
          guest list, enjoy.
        </h4>
        <h5>Currently waiting for {this.state.missingEmails} emails</h5>
        <table>
          <tr>
            <th>Guests</th>
            <th>Email?</th>
          </tr>
          {this.state.data.map(item => {
            return (
              <tr>
                <td className={!item.email ? "no-email" : ""}>{item.guests}</td>
                <td className={!item.email ? "no-email-red" : ""}>
                  {item.email ? "Yes" : "No"}
                </td>
              </tr>
            );
          })}
        </table>
      </div>
    );
  }
}

export default App;
