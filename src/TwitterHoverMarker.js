import React, { Fragment, Component } from "react";
import twitter from "./ic_twitter.svg";
import roadwork from "./road-work.svg";
import event from "./event.svg";
import roadclosure from "./road-closure.svg";
import accident from "./accident.png";
import hazards from "./hazards.png";
import metro from "./metro.png";
import metroThreat from "./metro_threat.png"
import { Timeline } from 'antd';

const InfoWindow = props => {
  const { event } = props;
  const infoWindowStyle = {
    display: "flex",
    position: "relative",
    left: -125,
    borderRadius: "5px",
    height: 300,
    width: 250,
    backgroundColor: "#FFFFFF",
    boxShadow: "0 2px 7px 1px rgba(0, 0, 0, 0.3)",
    overflowY: "scroll",
    padding: 10,
    paddingBottom: 15,
    zIndex: 100
  };

  var stories = event.stories;
  
  var timelineItems = []
  if (stories.length > 0) {
    timelineItems = stories.map((story) => {
    return <Timeline.Item> {story.message} {story.date}</Timeline.Item>
    })
  } else {
    timelineItems.push(
      <Timeline.Item> No incidents </Timeline.Item>
    )
  }
  

  // if (events.length > 0) {
  //   stories = events[0].stories.map(story => (
  //     <Feed.Event style={feedStyle}>
  //       <Feed.Label image={twitter} />
  //       <Feed.Content>
  //         <Feed.Date>{story.date}</Feed.Date>
  //         {this.getStatusIcon(story)}
  //         <Feed.Extra text style={descriptionStyle}>{story.message}</Feed.Extra>
  //       </Feed.Content>
  //     </Feed.Event>
  //   ));
  // }

  // return stories.length > 0 ? (
  //   stories
  // ) : (
  //   <Feed.Event>
  //     <Feed.Content>
  //       <Feed.Summary  style={emptyStyle}>No incidents</Feed.Summary>
  //     </Feed.Content>
  //   </Feed.Event>
  // );

  return (
    <div style={infoWindowStyle}>
      <Timeline>
        {timelineItems}
      </Timeline>
    </div>
    
    // <div style={infoWindowStyle}>
    //   <div class="ui items">
    //     <div class="item">
    //       <div class="content">
    //         <a class="header">{event.Name}</a>
    //         <div class="description">WMATA</div>
    //         <div class="extra">
    //           <div class="ui label">
    //             <i class="check icon"></i> {event.confirmCount}
    //           </div>
    //           <div class="ui label">
    //             <i class="question icon"></i> {event.reviewCount}
    //           </div>
    //           <div class="ui label">
    //             <i class="x icon"></i> {event.fakeCount}
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default class TwitterHoverMarker extends Component {
  isPWA() {
    return window.matchMedia("(display-mode: standalone)").matches;
  }

  showInfoWindow() {
    if (!this.props.event.visible) return false;
    return this.isPWA() ? this.props.event.lock : this.props.event.show || this.props.event.lock;
  }

  getIcon() {
    switch (this.props.event.category) {
      case "Metro":
        if (this.props.event.stories.length === 0) {
          return metro
        } else {
          return metroThreat
        }
      case "Roadwork/Construction":
        return roadwork;
      case "Event":
        return event;
      case "Road Closure":
        return roadclosure;
      case "Incident/Accident":
        return accident;
      case "Hazards":
        return hazards;
      default:
        return twitter;
    }
  }

  render() {
    const markerStyle = {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      transform: "translate(-50%, -50%)"
    };

    const imageStyle = {
      visibility: "visible",
      width: "32px",
      height: "32px"
    };

    const imageHoverStyle = {
      visibility: "visible",
      width: "48px",
      height: "48px"
    };

    const invisibleStyle = {
      visibility: "hidden"
    };

    const markerstyle = !this.props.event.visible
      ? invisibleStyle
      : this.props.$hover || this.props.event.forceHover
      ? imageHoverStyle
      : imageStyle;

    return (
      <Fragment>
        <div style={markerStyle}>
          <img
            style={markerstyle}
            src={this.getIcon()}
            className="maker"
            alt="marker"
          />
        </div>
        {this.showInfoWindow() && <InfoWindow event={this.props.event} />}
      </Fragment>
    );
  }
}
