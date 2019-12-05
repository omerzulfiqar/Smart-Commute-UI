import React, { Component } from "react";
import IncidentMap from "./IncidentMap";
import IncidentTypeWindow from "./IncidentTypeWindow";

class MainPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      events: []
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
  }

  render() {
    return (
      <div>
        <IncidentTypeWindow events={this.state.events}/>
        <IncidentMap events={this.state.events} />
      </div>
    );
  }
}

export default MainPage;
