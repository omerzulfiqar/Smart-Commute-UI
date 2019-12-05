import React, { Component } from "react";
import { Menu, Label } from "semantic-ui-react";

export default class IncidentTypeWindow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: "All"
    };
  }

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
    this.props.events.forEach(event => {
      if (name === "All") {
        event.visible = true;
      } else {
        event.visible = event.category === name ? true : false;
      }
    });
  };

  render() {
    const menuStyle = {
      position: "absolute",
      top: "20px",
      left: "20px",
      zIndex: "10000000000"
    };

    return (
      <Menu vertical style={menuStyle}>
        <Menu.Item
          name="All"
          active={this.state.activeItem === "All"}
          onClick={this.handleItemClick}
        >
          <Label>{this.props.events.length}</Label>
          All
        </Menu.Item>

        <Menu.Item
          name="Event"
          active={this.state.activeItem === "Event"}
          onClick={this.handleItemClick}
        >
          <Label>
            {
              this.props.events.filter(event => event.category === "Event")
                .length
            }
          </Label>
          Event
        </Menu.Item>

        <Menu.Item
          name="Incident/Accident"
          active={this.state.activeItem === "Incident/Accident"}
          onClick={this.handleItemClick}
        >
          <Label>
            {
              this.props.events.filter(
                event => event.category === "Incident/Accident"
              ).length
            }
          </Label>
          Incident/Accident
        </Menu.Item>

        <Menu.Item
          name="RoadWork/Construction"
          active={this.state.activeItem === "RoadWork/Construction"}
          onClick={this.handleItemClick}
        >
          <Label>
            {
              this.props.events.filter(
                event => event.category === "RoadWork/Construction"
              ).length
            }
          </Label>
          RoadWork/Construction
        </Menu.Item>

        <Menu.Item
          name="Road Closure"
          active={this.state.activeItem === "Road Closure"}
          onClick={this.handleItemClick}
        >
          <Label>
            {
              this.props.events.filter(
                event => event.category === "Road Closure"
              ).length
            }
          </Label>
          Road Closure
        </Menu.Item>

        <Menu.Item
          name="Non Traffic Tweet"
          active={this.state.activeItem === "Non Traffic Tweet"}
          onClick={this.handleItemClick}
        >
          <Label>
            {
              this.props.events.filter(
                event => event.category === "Non Traffic Tweet"
              ).length
            }
          </Label>
          Non Traffic Tweet
        </Menu.Item>
      </Menu>
    );
  }
}
