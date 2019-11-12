import React, { Fragment } from "react";
import marker from "./marker.svg";
import twitter from "./ic_twitter.svg";
import GoogleMapReact from "google-map-react";

const InfoWindow = props => {
  const { event } = props;
  const infoWindowStyle = {
    position: "relative",
    bottom: 120,
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

const EventMarker = props => {
  const markerStyle = {
    display: "inline-flex",
    alignItems: "center",
    height: 10,
    width: 10,
    justifyContent: "center",
    transform: "translate(-50%, -50%)"
  };

  return (
    <Fragment>
      <div style={markerStyle}>
        <img
          src={marker}
          className="maker"
          alt="marker"
          width="32px"
          height="32px"
        />
      </div>
      {props.show && <InfoWindow event={props.event} />}
    </Fragment>
  );
};

class IncidentMap extends React.Component {
  static defaultProps = {
    center: {
      lat: 40.6892494,
      lng: -74.0466891
    },
    zoom: 11,
    map: null,
    maps: null
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
      const index = state.events.findIndex(e => e.id === key);
      state.events[index].show = !state.events[index].show;
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
        onChildClick={this.onChildClick}
      >
        {events.map(event => (
          <EventMarker
            key={event.id}
            lat={event.lat}
            lng={event.lng}
            show={event.show}
            event={event}
          />
        ))}
      </GoogleMapReact>
    );
  }
}

export default IncidentMap;
