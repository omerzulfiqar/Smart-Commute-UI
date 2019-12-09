import React, { Component } from "react";
import IncidentMap from "./IncidentMap";
import IncidentTypeWindow from "./IncidentTypeWindow";
import MobileIncidentTypeWindow from "./MobileIncidentTypeWindow";
import isMobile from "ismobilejs";
import IncidentList from "./IncidentList";

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      mobileShowList: false,
    };
    this.onMarkerClick = this.onMarkerClick.bind(this);
  }

  componentDidMount() {
    fetch(process.env.REACT_APP_EVENT_API)
      .then(response => response.json())
      .then(data => {
        data.events.forEach(result => {
          result.show = false;
          result.lock = false;
          result.visible = true;
          result.forceHover = false;
        });
        this.setState({ events: data.events });
      });
  }

  onListClick = () => {
    this.setState({ mobileShowList: true });
  };

  onListClose = () => {
    this.setState({ mobileShowList: false });
  };

  onMarkerClick(id) {
    this.setState(state => {
      state.events.forEach(event => {
        event.lock = event.id === id ? !event.lock : false;
        event.show = event.id === id ? !event.show : false;
        event.forceHover = event.id === id ? !event.forceHover : false;
      });
      return { mobileShowList: false, events: state.events };
    });
  }

  render() {
    return (
      <div>
        {isMobile(navigator.userAgent).any ? (
          <MobileIncidentTypeWindow
            events={this.state.events}
            onUpdate={events => this.setState({ events: events })}
            onListClick={this.onListClick}
          />
        ) : (
          <IncidentTypeWindow
            events={this.state.events}
            onMarkerClick={this.onMarkerClick}
            onUpdate={events => this.setState({ events: events })}
          />
        )}
        <IncidentMap events={this.state.events} />
        {this.state.mobileShowList && (
          <IncidentList
            events={this.state.events}
            onListClose={this.onListClose}
            onMarkerClick={this.onMarkerClick}
          />
        )}
      </div>
    );
  }
}

export default MainPage;
