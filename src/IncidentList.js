import React, { Component } from "react";
import { List, Button, Header } from "semantic-ui-react";


class IncidentList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      width: 0,
      height: 0
    };
  }

  updateDimensions = () => {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  };

  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

  handleCloseItemClick = () => {
    this.props.onListClose();
  };

  render() {
    const listStyle = {
      position: "absolute",
      zIndex: "10000000000",
      overflowY: "hidden",
      overflowX: "hidden",
      background: "white"
    };

    const listContentStyle = {
      paddingTop: 22,
      paddingLeft: 15,
      paddingRight: 15
    };

    const headerStyle = {
      paddingTop: 10,
      paddingLeft: 15,
      margin: 0
    };

    return (
      <div style={listStyle}>
        <Header size="medium" floated="left" style={headerStyle}>
          Storyline/Timeline
        </Header>
        <Button
          basic
          icon="close"
          floated="right"
          onClick={this.handleCloseItemClick}
        />

        <List selection style={listContentStyle}>
          {this.props.events.map(event =>
            event.visible ? (
              <List.Item
                key={event.Code}
                id={event.Code}
                onClick={(event, data) => {
                  this.props.onMarkerClick(data.id);
                }}
              >
                <List.Icon name="marker" size="large" verticalAlign="middle" />
                <List.Content>
                  <List.Header>{event.Name}</List.Header>
                  <List.Description>{event.description}</List.Description>
                </List.Content>
              </List.Item>
            ) : null
          )}
        </List>
      </div>
    );
  }
}

export default IncidentList;
