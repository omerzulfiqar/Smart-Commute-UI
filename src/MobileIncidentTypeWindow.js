import React, { Component } from "react";
import { Menu, Label, Dropdown, DropdownMenu } from "semantic-ui-react";

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

  handleListItemClick = () => {
    this.props.onListClick();
  };

  render() {
    const menuStyle = {
      position: "fixed",
      top: "10px",
      left: "10px",
      zIndex: "10000000000"
    };

    return (
      <Menu compact style={menuStyle}>
        <Dropdown item icon="filter">
          <DropdownMenu>
            <Dropdown.Header
              icon="tags"
              content="Filter by incident category"
            />
            <Dropdown.Item
              name="All"
              active={this.state.activeItem === "All"}
              onClick={this.handleItemClick}
            >
              <Label>{this.props.events.length}</Label>
              All
            </Dropdown.Item>

            

            <Dropdown.Item
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
            </Dropdown.Item>

            <Dropdown.Item
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
            </Dropdown.Item>

            <Dropdown.Item
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
            </Dropdown.Item>

            <Dropdown.Item
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
            </Dropdown.Item>

            <Dropdown.Item
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
            </Dropdown.Item>
          </DropdownMenu>
        </Dropdown>

        <Menu.Item icon="list ul" onClick={this.handleListItemClick} />
      </Menu>
    );
  }
}
