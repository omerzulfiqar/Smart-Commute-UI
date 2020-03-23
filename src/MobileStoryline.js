import React, { Component } from "react";
import { Button, Header, Feed, Icon } from "semantic-ui-react";
import twitter from "./Twitter_Social_Icon_Circle_Color.svg";

export default class MobileStoryline extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectStation: props.selectedStation
    };
  }

  handleCloseItemClick = () => {
    this.props.onListClose();
  };

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
    };

    const emptyStyle = {
      marginTop: "20px",
      textAlign: "center"
    };

    var stations = this.props.events.filter(station => station.Code === this.state.selectStation);
    var stories = [];

    if (stations.length > 0) {
      stories = stations[0].stories.map(story => (
        <Feed.Event style={feedStyle}>
          <Feed.Label image={twitter} />
          <Feed.Content>
            <Feed.Date>{story.date}</Feed.Date>
            {this.getStatusIcon(story)}
            <Feed.Extra text>{story.message}</Feed.Extra>
          </Feed.Content>
        </Feed.Event>
      ));
    }

    stories.unshift(<Feed.Event>
        <Feed.Content>
        <Header size="medium" floated="left" style={feedStyle}>
          Storyline/Timeline
        </Header>
        <Button
          basic
          icon="close"
          floated="right"
          onClick={this.handleCloseItemClick}
        />
        </Feed.Content>
      </Feed.Event>)

      if (stories.length <= 1) {
        stories.push(<Feed.Event>
          <Feed.Content>
            <Feed.Summary style={emptyStyle}>No incidents</Feed.Summary>
          </Feed.Content>
        </Feed.Event>)
      }
      return stories;
  }

  render() {
    const timelineStyle = {
      position: "fixed",
      top: "0px",
      left: "0px",
      right: "0px",
      bottom: "-10px",
      zIndex: "10000000000",
      margin: "0px",
      backgroundColor: "#FFFFFF",
      overflowY: "scroll",
      overflowX: "hidden"
    };

    return (
        <Feed select id="feed" style={timelineStyle}>
          {this.getEventByStation()}
        </Feed>
    );
  }
}
