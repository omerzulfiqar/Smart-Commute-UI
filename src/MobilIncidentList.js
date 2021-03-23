import React, { Component } from "react";
import { Menu, Label, Dropdown, DropdownMenu } from "semantic-ui-react";

export default class MobileIncidentList extends Component {
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

  handleStationListItemClick = () => {
    this.props.onStationListClick();
  };

  handleIncidentListItemClick = () => {
    this.props.onIncidentListClick();
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
        <Menu.Item icon="twitter" onClick={this.handleIncidentListItemClick} />
        <Menu.Item icon="list ul" onClick={this.handleStationListItemClick} />
      </Menu>
    );
  }
}
