import React from "react";
import marker from "./marker.svg";
import GoogleMapReact from "google-map-react";

const EventMarker = ({ text }) => (
  <div
    style={{
      padding: "15px 10px",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      transform: "translate(-50%, -50%)"
    }}
  >
    <img
      src={marker}
      className="App-logo"
      alt="marker"
      width="48px"
      height="48px"
    />
  </div>
);

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
      events: null,
      width: 0,
      height: 0
    };
  }

  updateDimensions = () => {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  };

  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions);

    fetch(process.env.REACT_APP_EVENT_API)
      .then(response => response.json())
      .then(data =>
        this.setState({
          events: data.events.map(event => {
            const { name, lat, lng } = event;

            return <EventMarker lat={lat} lng={lng} text={name} />;
          })
        })
      );
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
      >
        {events}
      </GoogleMapReact>
    );
  }
}

export default IncidentMap;
