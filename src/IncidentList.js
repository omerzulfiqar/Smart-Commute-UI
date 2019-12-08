import React, { Component } from "react";
import { List, Button } from "semantic-ui-react";

class IncidentList extends Component {
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

  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

  handleCloseItemClick = () => {
      this.props.onListClose();
  }

  render() {
    const listStyle = {
      position: "absolute",
      zIndex: "10000000000",
      overflowY: "scroll",
      overflowX: "hidden",
      background: "white",
    };

    const listContentStyle = {
        paddingTop: 22,
    }

    return (
      <div style={listStyle}>
          <Button basic icon="close icon" floated="right" onClick={this.handleCloseItemClick}/>
          <List selection style={listContentStyle} >
            {this.props.events.map(event =>
              event.visible ? (
                <List.Item key={event.id}>
                  <List.Icon
                    name="marker"
                    size="large"
                    verticalAlign="middle"
                  />
                  <List.Description>{event.description}</List.Description>
                </List.Item>
              ) : null
            )}
          </List>
        
      </div>
    );
  }
}

export default IncidentList;
