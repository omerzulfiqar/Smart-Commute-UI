import React, { Component } from "react";
import FlipMove from "react-flip-move";
import firebase from "./Firebase";

import { Collapse } from "@blueprintjs/core";

export default class RealtimeMonitor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
    };
  }

  componentDidMount() {
    const eventsRef = firebase.database().ref("tweets");
    eventsRef.on("child_added", (snapshot) => {
      let newEvents = snapshot.val();

      this.state.events.unshift(newEvents.text);
      if (this.state.events.length > 5) {
        this.state.events.pop();
      }

      this.setState({ events: this.state.events });
    });
  }

  render() {
    const windowStyle = {
      margin: 10,
      width: 400,
    };

    const collapseWindowStyle = {
      width: "inherit",
      height: "inherit",
      background: "rgba(255, 255, 255, 0.8)",
      borderRadius: "3px",
      boxShadow: "inset 0 0 0 1px rgba(16, 22, 26, 0.15)",
      fontSize: "13px",
      padding: "13px 15px 12px",
    }

    const listItemStyle = {
      margin: "0px 0px 5px 0px"
    }

    return (
      <div style={windowStyle}>
        <Collapse
          isOpen={this.props.isOpen}
          keepChildrenMounted="true"
        >
          <div style={collapseWindowStyle}>
          <FlipMove enterAnimation="fade" leaveAnimation="fade">
            {this.state.events.map((event) => (
              <div key={event} style={listItemStyle}>{event}</div>
            ))}
          </FlipMove>
          </div>
        </Collapse>
      </div>
    );
  }
}
