import React, { Component } from "react";
import { Feed, Icon } from "semantic-ui-react";
import twitter from "./Twitter_Social_Icon_Circle_Color.svg";

export default class Storyline extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectStation: "E02"
    };
  }

  updateStation(code) {
    this.setState({ selectStation: code });
  }

  getStatusIcon(story) {
    switch (story.status) {
      case 1:
        return (
          <div>
            <Icon color="green" name="check" />
            Confirmed
          </div>
        );
      case 2:
        return (
          <div>
            <Icon color="red" name="close" />
            Fake
          </div>
        );
      case 0:
      default:
        return (
          <div>
            <Icon color="yellow" name="question" />
            Under review
          </div>
        );
    }
  }

  getEventByStation() {
    const feedStyle = {
      padding: "10px"
    }

    const descriptionStyle = {
      width: "260px"
    }

    const emptyStyle = {
      marginTop: "20px",
      textAlign: "center"
    }
    
    var events = this.props.events
      .filter(story => story.code === this.state.selectStation)
      .map(story => (
        <Feed.Event style={feedStyle}>
          <Feed.Label image={twitter} />
          <Feed.Content>
            <Feed.Date>{story.date}</Feed.Date>
            {this.getStatusIcon(story)}
            <Feed.Extra text style={descriptionStyle}>{story.message}</Feed.Extra>
          </Feed.Content>
        </Feed.Event>
      ));

    return events.length > 0 ? (
      events
    ) : (
      <Feed.Event>
        <Feed.Content>
          <Feed.Summary  style={emptyStyle}>No incidents</Feed.Summary>
        </Feed.Content>
      </Feed.Event>
    );
  }

  render() {
    const timelineStyle = {
      position: "fixed",
      top: "0px",
      left: "0px",
      bottom: "-10px",
      zIndex: "10000000000",
      margin: "0px",
      backgroundColor: "#FFFFFF",
      width: "340px",
      overflowY: "scroll",
      overflowX: "hidden"
    };

    return (
      <Feed select style={timelineStyle} id="feed">
        {this.getEventByStation()}
      </Feed>
    );
  }
}
