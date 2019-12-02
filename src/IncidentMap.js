import React from "react";
import GoogleMapReact from "google-map-react";
import TwitterHoverMarker from "./TwitterHoverMarker";

class IncidentMap extends React.Component {
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
      events: [],
      width: 0,
      height: 0
    };
  }

  updateDimensions = () => {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  };

  onChildClick = key => {
    this.setState(state => {
      state.events.forEach( event => {
        event.lock = event.id === key ? !event.lock: false;
      })
      return { events: state.events };
    });
  };

  onChildMouseEnter = key => {
    this.setState(state => {
      const index = state.events.findIndex(e => e.id === key);
      state.events[index].show = true;
      return { events: state.events };
    });
  };

  onChildMouseLeave = key => {
    this.setState(state => {
      const index = state.events.findIndex(e => e.id === key);
      state.events[index].show = false;
      return { events: state.events };
    });
  };

  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions);

    fetch(process.env.REACT_APP_EVENT_API)
      .then(response => response.json())
      .then(data => {
        data.events.forEach(result => {
          result.show = false;
          result.lock = false;
        });
        this.setState({ events: data.events });
      });
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

  render() {
    const { events } = this.state;

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
        {events.map(event => (
          <TwitterHoverMarker
            key={event.id}
            lat={event.lat}
            lng={event.lng}
            show={event.show}
            lock={event.lock}
            event={event}
          />
        ))}
      </GoogleMapReact>
    );
  }
}

export default IncidentMap;
