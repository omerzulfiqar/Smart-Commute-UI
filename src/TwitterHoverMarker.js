import React, { Fragment, Component } from "react";
import twitter from "./ic_twitter.svg";

const InfoWindow = props => {
  const { event } = props;
  const infoWindowStyle = {
    position: "relative",
    left: "-45px",
    width: 220,
    backgroundColor: "white",
    boxShadow: "0 2px 7px 1px rgba(0, 0, 0, 0.3)",
    alignItems: "left",
    padding: 10,
    fontSize: 14,
    zIndex: 100
  };

  return (
    <div style={infoWindowStyle}>
      <img
        src={twitter}
        alt="twitter"
        style={{ witdh: "32px", height: "32px", float: "left" }}
      />
      <div style={{ fontSize: 16 }}>{event.name}</div>
      <div style={{ fontSize: 12, color: "grey" }}>{event.description}</div>
    </div>
  );
};

export default class TwitterHoverMarker extends Component {
  render() {
    const markerStyle = {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      transform: "translate(-50%, -50%)"
    };

    const imageStyle = {
      width: "32px",
      height: "32px"
    };

    const imageHoverStyle = {
      width: "48px",
      height: "48px"
    };

    const markerstyle = this.props.$hover ? imageHoverStyle : imageStyle;

    return (
      <Fragment>
        <div style={markerStyle}>
          <img
            style={markerstyle}
            src={twitter}
            className="maker"
            alt="marker"
          />
        </div>
        {this.props.show && <InfoWindow event={this.props.event} />}
      </Fragment>
    );
  }
}
