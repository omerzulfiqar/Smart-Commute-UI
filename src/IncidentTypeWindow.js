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

    const timelineStyle = {
      marginTop: 18,
      marginBottom: 10
    };

    const timelineItemStyle = {
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
        {/* <MenuItem id="filter">
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
        </MenuItem> */}

        <MenuItem>
          Storyline/Timeline
          <div class="ui feed" style={timelineStyle}>
            <div class="event">
              <div class="label">
                <img alt="icon" src={twitter} />
              </div>
              <div class="content">
                <div class="date">
                  2019-07-20 15:38:14
                  <div class="extra">
                    <i class="green check icon"></i>
                    Confirmed
                  </div>
                </div>
                <div class="extra text">
                  Man Arrested in Shaw-Howard University Metro Shooting
                </div>
              </div>
            </div>
          </div>
          <div class="ui feed" style={timelineItemStyle}>
            <div class="event">
              <div class="label">
                <img alt="icon" src={twitter} />
              </div>
              <div class="content">
                <div class="date">
                  2019-07-19 22:20:45
                  <div class="extra">
                    <i class="green check icon"></i>
                    Confirmed
                  </div>
                </div>
                <div class="extra text">
                  1 injured, 2 sought after shooting at Shaw-Howard U Metro
                  station | WTOP
                  https://wtop.com/dc/2019/07/1-injured-2-sought-after-shooting-at-shaw-howard-u-metro-station/
                  #SmartNews #bringit33"
                </div>
              </div>
            </div>
          </div>
          <div class="ui feed" style={timelineItemStyle}>
            <div class="event">
              <div class="label">
                <img alt="icon" src={twitter} />
              </div>
              <div class="content">
                <div class="date">
                  2019-07-19 13:34:55
                  <div class="extra">
                    <i class="green check icon"></i>
                    Confirmed
                  </div>
                </div>
                <div class="extra text">
                  #BREAKING Man shot at Shaw-Howard University Metro Station at
                  1:12pm. He is conscious and breathing. Witnesses say the
                  victim walked from the metro station to the 700 block of T st
                  NW. #MPD #MetroTransitPD
                </div>
              </div>
            </div>
          </div>
          <div class="ui feed" style={timelineItemStyle}>
            <div class="event">
              <div class="label">
                <img alt="icon" src={twitter} />
              </div>
              <div class="content">
                <div class="date">
                  2019-07-19 13:16:14
                  <div class="extra">
                    <i class="green check icon"></i>
                    Confirmed
                  </div>
                </div>
                <div class="extra text">
                  UPDATED: Yellow/Green Line Alert: Shaw-Howard's 7th St
                  entrance is closed due to a police investigation. The 8th St
                  entrance remains open
                </div>
              </div>
            </div>
          </div>
          <div class="ui feed" style={timelineItemStyle}>
            <div class="event">
              <div class="label">
                <img alt="icon" src={twitter} />
              </div>
              <div class="content">
                <div class="date">
                  2019-07-19 13:05:02
                  <div class="extra">
                    <i class="yellow question icon"></i>
                    Under review
                  </div>
                </div>
                <div class="extra text">
                  somebody just got shot at Shaw-Howard station. I ain't never
                  ran so fast in my life. It's too hot
                </div>
              </div>
            </div>
          </div>
          <div class="ui feed" style={timelineItemStyle}>
            <div class="event">
              <div class="label">
                <img alt="icon" src={twitter} />
              </div>
              <div class="content">
                <div class="date">
                  2019-07-19 12:58:32
                  <div class="extra">
                    <i class="yellow question icon"></i>
                    Under review
                  </div>
                </div>
                <div class="extra text">
                  Young I was just bout to get on the train at Shaw Howard and
                  somebody just got shot in the station.
                </div>
              </div>
            </div>
          </div>
          {/* <List selection style={listStyle}>
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
          </List> */}
        </MenuItem>
      </Menu>
    );
  }
}
