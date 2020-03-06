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

  render() {

    const timelineStyle = {
      position: "fixed",
      top: "10px",
      left: "10px",
      bottom: "10px",
      zIndex: "10000000000",
      backgroundColor: "#FFFFFF",
      marginTop: 10,
      marginBottom: 10,
      paddingTop: 10,
      paddingLeft: 10,
      width: "340px",
      overflowY: "scroll",
      overflowX: "hidden"
    };

    return (
      <Feed select style={timelineStyle} id="feed">
        {this.props.events.map(story =>
          story.code === this.state.selectStation ? (
            <Feed.Event>
              <Feed.Label image={twitter} />
              <Feed.Content>
                <Feed.Date>{story.date}</Feed.Date>
                {this.getStatusIcon(story)}
                <Feed.Extra text>{story.message}</Feed.Extra>
              </Feed.Content>
            </Feed.Event>
          ) : null
        )}
      </Feed>
    );
  }
}
