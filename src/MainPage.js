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
      mobileShowList: false
    };
  }

  componentDidMount() {
    fetch(process.env.REACT_APP_EVENT_API)
      .then(response => response.json())
      .then(data => {
        data.events.forEach(result => {
          result.show = false;
          result.lock = false;
          result.visible = true;
        });
        this.setState({ events: data.events });
      });
    console.log(typeof isMobile(navigator.userAgent).any);
  }

  onListClick = () => {
    this.setState({ mobileShowList: !this.state.mobileShowList });
  };

  onListClose = () => {
    this.setState({ mobileShowList: false });
  };

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
            onUpdate={events => this.setState({ events: events })}
          />
        )}
        <IncidentMap events={this.state.events} />
        {this.state.mobileShowList && (
          <IncidentList
            events={this.state.events}
            onListClose={this.onListClose}
          />
        )}
      </div>
    );
  }
}

export default MainPage;
