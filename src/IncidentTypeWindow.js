import React, { Component } from "react";
import { Menu, Label, MenuItem, List } from "semantic-ui-react";

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
    this.props.onUpdate(this.props.events);
  };

  getListHeight() {
    if (document.getElementById("menu") === null) return 0;

    return (
      document.getElementById("menu").offsetHeight -
      document.getElementById("filter").offsetHeight -
      60
    );
  }

  render() {
    const menuStyle = {
      position: "fixed",
      top: "10px",
      left: "10px",
      zIndex: "10000000000",
      bottom: "10px"
    };

    const listStyle = {
      overflowY: "scroll",
      overflowX: "hidden",
      height: this.getListHeight(),
      marginTop: 10,
      marginBottom: 10
    };

    const iconStyle = {
      float: "left"
    };

    const contentStyle = {
      float: "right",
      width: "250px"
    };

    return (
      <Menu vertical size="massive" style={menuStyle} id="menu">
        <MenuItem id="filter">
          Filter
          <Menu.Menu>
            <Menu.Item
              name="All"
              active={this.state.activeItem === "All"}
              onClick={this.handleItemClick}
            >
              <Label>{this.props.events.length}</Label>
              All
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
              name="Roadwork/Construction"
              active={this.state.activeItem === "Roadwork/Construction"}
              onClick={this.handleItemClick}
            >
              <Label>
                {
                  this.props.events.filter(
                    event => event.category === "Roadwork/Construction"
                  ).length
                }
              </Label>
              Roadwork/Construction
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
              Closure
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
              name="Hazards"
              active={this.state.activeItem === "Hazards"}
              onClick={this.handleItemClick}
            >
              <Label>
                {
                  this.props.events.filter(
                    event => event.category === "Hazards"
                  ).length
                }
              </Label>
              Hazards
            </Menu.Item>
          </Menu.Menu>
        </MenuItem>

        <MenuItem>
          Incidents list
          <List selection style={listStyle}>
            {this.props.events.map(event =>
              event.visible ? (
                <List.Item
                  key={event.id}
                  id={event.id}
                  onClick={(event, data) => {
                    this.props.onMarkerClick(data.id);
                  }}
                >
                  <List.Icon
                    style={iconStyle}
                    name="marker"
                    size="large"
                    verticalAlign="middle"
                  />
                  <List.Description style={contentStyle}>
                    {event.description}
                  </List.Description>
                </List.Item>
              ) : null
            )}
          </List>
        </MenuItem>
      </Menu>
    );
  }
}
