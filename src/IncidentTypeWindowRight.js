import React, { Component } from "react";
import { Menu, Label, MenuItem, List } from "semantic-ui-react";
import twitter from "./Twitter_Social_Icon_Circle_Color.svg";

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
      // document.getElementById("filter").offsetHeight -
      60
    );
  }

  render() {
    const menuStyle = {
      position: "fixed",
      top: "-14px",
      right: "0px",
      zIndex: "10000000000",
      backgroundColor: "#FFFFFF",
      bottom: "-14px"
    };

    const listStyle = {
      overflowY: "scroll",
      overflowX: "hidden",
      height: this.getListHeight(),
      marginTop: 10,
      marginBottom: 10
    };

    const timelineStyle = {
      marginTop: 18,
      marginBottom: 10
    };

    const itemStyle = {
      margin: 5
    };

    const iconStyle = {
      float: "left"
    };

    const contentStyle = {
      float: "right",
      width: "250px"
    };

    return (
      <List selection style={menuStyle}>
        {this.props.events.map(event => (
          <List.Item
            style={itemStyle}
            // key={event.id}
            id={event.Code}
            onClick={(event, {id}) => {
              this.props.onStationClick(id);
            }}
          >
            <List.Icon
              style={iconStyle}
              name="subway"
              size="large"
              verticalAlign="middle"
            />
            <List.Content>
              <List.Header>{event.Name}</List.Header>
              <List.Description>{event.Address.Street}</List.Description>
            </List.Content>
          </List.Item>
        ))}
      </List>
    );
  }
}
