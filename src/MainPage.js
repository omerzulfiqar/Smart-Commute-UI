import React, { Component } from "react";
import IncidentMap from "./IncidentMap";

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
        });
        this.setState({ events: data.events });
      });
  }

  render() {
    return <IncidentMap events={this.state.events} />;
  }
}

export default MainPage;
