import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import TwitterHoverMarker from "./TwitterHoverMarker";

class IncidentMap extends Component {
  static defaultProps = {
    center: {
      lat: 40.6892494,
      lng: -74.0466891
    },
    zoom: 11
  };

  constructor(props) {
    super(props);

    this.state = {
      width: 0,
      height: 0
    };
  }

  updateDimensions = () => {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  };

  onChildClick = key => {
    this.props.events.forEach(event => {
      event.lock = event.id === key ? !event.lock : false;
    });
  };

  onChildMouseEnter = key => {
    const index = this.props.events.findIndex(e => e.id === key);
    this.props.events[index].show = true;
  };

  onChildMouseLeave = key => {
    const index = this.props.events.findIndex(e => e.id === key);
    this.props.events[index].show = false;
  };

  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

  render() {
    return (
      <GoogleMapReact
        style={{ width: "100%", height: this.state.height }}
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAP_API_KEY }}
        defaultCenter={this.props.center}
        defaultZoom={this.props.zoom}
        onChildMouseEnter={this.onChildMouseEnter}
        onChildMouseLeave={this.onChildMouseLeave}
        onChildClick={this.onChildClick}
        hoverDistance={15}
      >
        {this.props.events.map(event => (
          <TwitterHoverMarker
            key={event.id}
            lat={event.lat}
            lng={event.lng}
            event={event}
          />
        ))}
      </GoogleMapReact>
    );
  }
}

export default IncidentMap;
