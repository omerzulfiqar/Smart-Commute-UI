import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import TwitterHoverMarker from "./TwitterHoverMarker";

class IncidentMap extends Component {
  static defaultProps = {
    center: {
      lat: 38.8968325,
      lng: -77.1916702
    },
    zoom: 14
  };

  constructor(props) {
    super(props);

    this.state = {
      width: 0,
      height: 0
    };
  }

  onChildClick = key => {
    this.props.onStationClick(key, false);
    // this.props.events.forEach(event => {
    //   event.lock = event.Code === key ? !event.lock : false;
    // });
  };

  onChildMouseEnter = key => {
    this.props.events.forEach( event => {
      if (event.Code === key) {
        event.show = true;
      } else {
        event.lock = false;
        event.show = false;
        event.forceHover = false;
      }
    });
  };

  onChildMouseLeave = key => {
    const index = this.props.events.findIndex(e => e.Code === key);
    this.props.events[index].show = false;
  };

  render() {
    return (
      <GoogleMapReact
        style={{ width: "100%", height: this.state.height }}
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAP_API_KEY }}
        defaultCenter={this.props.center}
        center={this.props.newCenter}
        defaultZoom={this.props.zoom}
        onChildMouseEnter={this.onChildMouseEnter}
        onChildMouseLeave={this.onChildMouseLeave}
        onChildClick={this.onChildClick}
        hoverDistance={15}
        layerTypes={['TransitLayer']}
      >
        {this.props.events.map(event => (
          <TwitterHoverMarker
            key={event.Code}
            lat={event.Lat}
            lng={event.Lon}
            event={event}
          />
        ))}
      </GoogleMapReact>
    );
  }
}

export default IncidentMap;
