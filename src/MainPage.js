import React, { Component } from "react";
import IncidentMap from "./IncidentMap";
import Stroyline from "./Storyline";
import MobileStoryline from "./MobileStoryline";
import StationList from "./StationList";
import MobileStationList from "./MobileStationList";
import MobilIncidentList from "./MobilIncidentList";
import isMobile from "ismobilejs";
import _ from "lodash";

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      stories: [],
      mobileShowStationList: false,
      mobileShowIncidentList: false,
      selectedStation: "E02"
    };
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onStationClick = this.onStationClick.bind(this);
    this.child = React.createRef();
  }

  componentDidMount() {
    var stories = [];
    fetch(process.env.REACT_APP_EVENT_API)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        data.Stations.forEach(result => {
          result.show = false;
          result.lock = false;
          result.visible = true;
          result.forceHover = false;
          result.category = "Metro";
          result.confirmCount = result.stories.filter(
            story => story.status === 1
          ).length;
          result.reviewCount = result.stories.filter(
            story => story.status === 0
          ).length;
          result.fakeCount = result.stories.filter(
            story => story.status === 2
          ).length;
        });
        this.setState({ events: data.Stations, stories: stories });
      });
  }

  onStationListClick = () => {
    this.setState({ mobileShowStationList: true });
  };

  onIncidentListClick = () => {
    this.setState({ mobileShowIncidentList: true });
  };

  // onListClick = () => {
  //   this.setState({ mobileShowList: true });
  // };

  onListClose = () => {
    this.setState({
      mobileShowStationList: false,
      mobileShowIncidentList: false
    });
  };

  onStationClick(stationId) {
    if (!isMobile(navigator.userAgent).any) {
      this.child.current.updateStation(stationId);
    } else {
      this.setState({ selectedStation: stationId });
    }

    this.setState(state => {
      state.events.forEach(event => {
        event.lock = event.Code === stationId ? !event.lock : false;
        event.show = event.Code === stationId ? !event.show : false;
        event.forceHover = event.Code === stationId ? !event.forceHover : false;
      });
      return { mobileShowStationList: false, events: state.events };
    });

    let station = _.find(this.state.events, { Code: stationId });
    this.setState({
      mapUpdate: true,
      newCenter: {
        Lat: station.Lat,
        Lon: station.Lon,
        lat: station.Lat,
        lng: station.Lon
      }
    });
  }

  onMarkerClick(id) {
    this.setState(state => {
      state.events.forEach(event => {
        event.lock = event.id === id ? !event.lock : false;
        event.show = event.id === id ? !event.show : false;
        event.forceHover = event.id === id ? !event.forceHover : false;
      });
      return { mobileShowIncidentList: false, events: state.events };
    });
  }

  render() {
    const listStyle = {
      position: "absolute",
      zIndex: "10000000000",
      overflowY: "hidden",
      overflowX: "hidden",
      background: "white"
    };

    return (
      <div>
        {isMobile(navigator.userAgent).any ? (
          <MobilIncidentList
            events={this.state.events}
            stories={this.state.stories}
            onUpdate={events => this.setState({ events: events })}
            onStationListClick={this.onStationListClick}
            onIncidentListClick={this.onIncidentListClick}
          />
        ) : (
          <div>
            <Stroyline events={this.state.events} ref={this.child} />
            <StationList
              events={this.state.events}
              onMarkerClick={this.onMarkerClick}
              onUpdate={events => this.setState({ events: events })}
              onStationClick={this.onStationClick}
            />
          </div>
        )}

        <IncidentMap
          events={this.state.events}
          onStationClick={this.onStationClick}
          newCenter={this.state.newCenter}
          onUpdate={events => this.setState({ center: events })}
        />
        {this.state.mobileShowIncidentList && (
          <MobileStoryline
            selectedStation={this.state.selectedStation}
            events={this.state.stories}
            ref={this.child}
            onListClose={this.onListClose}
          />
        )}
        {this.state.mobileShowStationList && (
          <MobileStationList
            events={this.state.events}
            onMarkerClick={this.onMarkerClick}
            onUpdate={events => this.setState({ events: events })}
            onStationClick={this.onStationClick}
            onListClose={this.onListClose}
          />
        )}
      </div>
    );
  }
}

export default MainPage;
