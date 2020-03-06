import React, { Component } from "react";
import { Button, Menu, Label, MenuItem, List } from "semantic-ui-react";
import twitter from "./Twitter_Social_Icon_Circle_Color.svg";

export default class MobileStationList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: "All"
    };
  }

  handleCloseItemClick = () => {
    this.props.onListClose();
  };

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

  getStations() {

    const itemStyle = {
      margin: 5
    };

    const iconStyle = {
      float: "left"
    };
    var stations = this.props.events.map(event => (
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
    ))

    stations.unshift(<List.Item>
        <Button
          basic
          icon="close"
          floated="right"
          onClick={this.handleCloseItemClick}
        />
      </List.Item>)
      return stations
  }

  render() {
    const menuStyle = {
      position: "fixed",
      top: "0px",
      bottom: "0px",
      right: "0px",
      zIndex: "10000000000",
      backgroundColor: "#FFFFFF",
      overflowY: "scroll",
      overflowX: "hidden",
      margin: "0px"
    };

    return (
      <List selection style={menuStyle} size="large">
        {this.getStations()}
      </List>
    );
  }
}
