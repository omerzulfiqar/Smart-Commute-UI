import React, { Fragment, Component } from "react";
import twitter from "./ic_twitter.svg";
import roadwork from "./road-work.svg";
import event from "./event.svg";
import roadclosure from "./road-closure.svg";
import accident from "./accident.png";
import hazards from "./hazards.png";
import metro from "./metro_1.svg";

const InfoWindow = props => {
  const { event } = props;
  const infoWindowStyle = {
    display: "flex",
    position: "relative",
    left: -125,
    borderRadius: "5px",
    width: 250,
    backgroundColor: "#FFFFFF",
    boxShadow: "0 2px 7px 1px rgba(0, 0, 0, 0.3)",
    alignItems: "center",
    padding: 10,
    paddingBottom: 15,
    zIndex: 100
  };

  return (
    <div style={infoWindowStyle}>
      <div class="ui items">
        <div class="item">
          <div class="content">
            <a class="header">{event.Name}</a>
            <div class="description">WMATA</div>
            <div class="extra">
              <div class="ui label">
                <i class="check icon"></i> {event.confirmCount}
              </div>
              <div class="ui label">
                <i class="question icon"></i> {event.reviewCount}
              </div>
              <div class="ui label">
                <i class="x icon"></i> {event.fakeCount}
              </div>
            </div>
          </div>
        </div>
      </div>
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
      case "Metro":
        return metro;
      case "Roadwork/Construction":
        return roadwork;
      case "Event":
        return event;
      case "Road Closure":
        return roadclosure;
      case "Incident/Accident":
        return accident;
      case "Hazards":
        return hazards;
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
      : this.props.$hover || this.props.event.forceHover
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
