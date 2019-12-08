import React, { Fragment, Component } from "react";
import twitter from "./ic_twitter.svg";
import roadwork from "./road-work.svg";
import event from "./event.svg";
import roadclosure from "./road-closure.svg";
import accident from "./accident.png";

const InfoWindow = props => {
  const { event } = props;
  const infoWindowStyle = {
    display: "flex",
    position: "relative",
    left: "-110px",
    borderRadius: "5px",
    width: 220,
    backgroundColor: "#333333",
    boxShadow: "0 2px 7px 1px rgba(0, 0, 0, 0.3)",
    alignItems: "center",
    padding: 10,
    paddingBottom: 15,
    fontSize: 14,
    zIndex: 100
  };

  return (
    <div style={infoWindowStyle}>
      <div style={{ fontSize: 12, color: "#969696" }}>{event.description}</div>
    </div>
  );
};

export default class TwitterHoverMarker extends Component {
  isPWA() {
    return window.matchMedia("(display-mode: standalone)").matches;
  }

  showInfoWindow() {
    if (!this.props.event.visible) return false;
    return this.isPWA() ? this.props.event.lock : this.props.event.show;
  }

  getIcon() {
    switch (this.props.event.category) {
      case "RoadWork/Construction":
        return roadwork;
      case "Event":
        return event;
      case "Road Closure":
        return roadclosure;
      case "Incident/Accident":
        return accident;
      default:
        return twitter;
    }
  }

  render() {
    const markerStyle = {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      transform: "translate(-50%, -50%)"
    };

    const imageStyle = {
      visibility: "visible",
      width: "32px",
      height: "32px"
    };

    const imageHoverStyle = {
      visibility: "visible",
      width: "48px",
      height: "48px"
    };

    const invisibleStyle = {
      visibility: "hidden"
    };

    const markerstyle = !this.props.event.visible
      ? invisibleStyle
      : this.props.$hover
      ? imageHoverStyle
      : imageStyle;

    return (
      <Fragment>
        <div style={markerStyle}>
          <img
            style={markerstyle}
            src={this.getIcon()}
            className="maker"
            alt="marker"
          />
        </div>
        {this.showInfoWindow() && <InfoWindow event={this.props.event} />}
      </Fragment>
    );
  }
}