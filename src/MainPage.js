import React, { Component } from "react";
import IncidentMap from "./IncidentMap";
import MobileStoryline from "./MobileStoryline";
import MobileStationList from "./MobileStationList";
import MobilIncidentList from "./MobilIncidentList";
import { Table, Pagination } from "semantic-ui-react";

import {
  Alignment,
  Button,
  Navbar,
  NavbarDivider,
  NavbarGroup,
  NavbarHeading,
  Drawer,
  Position,
  Tree,
  Dialog,
  Classes,
} from "@blueprintjs/core";

import isMobile from "ismobilejs";
import _ from "lodash";
import RealtimeMonitor from "./RealtimeMonitor";

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      stories: [],
      lineNodes: {},
      mobileShowStationList: false,
      mobileShowIncidentList: false,
      selectedStation: "E02",
      isDrawerOpened: false,
      isMonitorOpened: true,
      isDialogOpened: false,
      allEvents: [],
      displayEvents: [],
    };
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onStationClick = this.onStationClick.bind(this);
    this.child = React.createRef();
  }

  componentDidMount() {
    var stories = [];
    fetch(process.env.REACT_APP_STATION_API)
      .then((response) => response.json())
      .then((data) => {
        var lines = {};
        data.Stations.forEach((result) => {
          result.show = false;
          result.lock = false;
          result.visible = true;
          result.forceHover = false;
          result.category = "Metro";

          if (result.LineCode1 != null) {
            this.addToLineMap(lines, result.LineCode1, result);
          }

          if (result.LineCode2 != null) {
            this.addToLineMap(lines, result.LineCode2, result);
          }

          if (result.LineCode3 != null) {
            this.addToLineMap(lines, result.LineCode3, result);
          }

          if (result.LineCode4 != null) {
            this.addToLineMap(lines, result.LineCode4, result);
          }
        });

        this.setState({
          events: data.Stations,
          stories: stories,
          lineNodes: this.createLineNodes(lines),
        });
      });

    fetch(process.env.REACT_APP_EVENT_API)
      .then((response) => response.json())
      .then((data) => {
        let allEvents = data.events.reverse();
        this.setState({
          allEvents: allEvents,
          displayEvents: allEvents.slice(0, 10),
        });
      });
  }

  addToLineMap(lines, lineCode, station) {
    if (lines[lineCode] === undefined) {
      lines[lineCode] = [];
    }

    lines[lineCode].push(station);
  }

  createLineNodes(lines) {
    var lineNodes = [];
    Object.keys(lines).forEach((lineCode) => {
      var line = {
        id: lineNodes.length,
        hasCaret: true,
        label: lineCode,
        childNodes: lines[lineCode].map((station) => {
          return {
            id: station.Code,
            icon: "train",
            label: station.Name,
          };
        }),
      };

      lineNodes.push(line);
    });
    return lineNodes;
  }

  handleNodeClick = (nodeData, _nodePath, e) => {
    if (nodeData.hasCaret) {
      return;
    }

    const originallySelected = nodeData.isSelected;
    if (!e.shiftKey) {
      this.forEachNode(this.state.lineNodes, (n) => (n.isSelected = false));
    }
    nodeData.isSelected =
      originallySelected == null ? true : !originallySelected;

    this.setState({ isDrawerOpened: false });
    this.onStationClick(nodeData.id);
  };

  handleNodeCollapse = (nodeData) => {
    nodeData.isExpanded = false;
    this.setState(this.state);
  };

  handleNodeExpand = (nodeData) => {
    nodeData.isExpanded = true;
    this.setState(this.state);
  };

  forEachNode(nodes, callback) {
    if (nodes == null) {
      return;
    }

    for (const node of nodes) {
      callback(node);
      this.forEachNode(node.childNodes, callback);
    }
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
      mobileShowIncidentList: false,
    });
  };

  onStationClick(stationId, moveToStation = true) {
    if (isMobile(navigator.userAgent).any) {
      this.setState({ selectedStation: stationId });
    }

    this.setState((state) => {
      state.events.forEach((event) => {
        event.lock = event.Code === stationId ? !event.lock : false;
        event.show = event.Code === stationId ? !event.show : false;
        event.forceHover = event.Code === stationId ? !event.forceHover : false;
      });
      return { mobileShowStationList: false, events: state.events };
    });

    if (moveToStation) {
      let station = _.find(this.state.events, { Code: stationId });
      this.setState({
        mapUpdate: true,
        newCenter: {
          Lat: station.Lat,
          Lon: station.Lon,
          lat: station.Lat,
          lng: station.Lon,
        },
      });
    }
  }

  onMarkerClick(id) {
    this.setState((state) => {
      state.events.forEach((event) => {
        event.lock = event.id === id ? !event.lock : false;
        event.show = event.id === id ? !event.show : false;
        event.forceHover = event.id === id ? !event.forceHover : false;
      });
      return { mobileShowIncidentList: false, events: state.events };
    });
  }

  getFormatedDate(event) {
    if ("created_at" in event) {
      return new Date(parseInt(event.created_at)).toLocaleString("en-US");
    } else {
      return event.date;
    }
  }

  handlePageChange(page) {
    let startIndex = (page - 1) * 10;
    this.setState({
      displayEvents: this.state.allEvents.slice(
        startIndex,
        startIndex + 10
      ),
    });
  }

  render() {
    const drawerState = {
      autoFocus: true,
      canEscapeKeyClose: true,
      canOutsideClickClose: true,
      enforceFocus: true,
      hasBackdrop: true,
      isOpen: this.state.isDrawerOpened,
      position: Position.RIGHT,
      size: Drawer.SIZE_SMALL,
      usePortal: true,
    };

    const dialogStyle = {
      width: "80%",
    };

    const layout = (
      <div>
        <IncidentMap
          events={this.state.events}
          onStationClick={this.onStationClick}
          newCenter={this.state.newCenter}
          onUpdate={(events) => this.setState({ center: events })}
        />

        <Dialog
          icon="info-sign"
          title="All events"
          isOpen={this.state.isDialogOpened}
          usePortal={true}
          style={dialogStyle}
          onClose={() => this.setState({ isDialogOpened: false })}
        >
          <div className={Classes.DIALOG_BODY}>
            <Table celled>
              <Table.Header>
                <Table.HeaderCell>Date</Table.HeaderCell>
                <Table.HeaderCell>Category</Table.HeaderCell>
                <Table.HeaderCell>Text</Table.HeaderCell>
              </Table.Header>
              {this.state.displayEvents.map((e) => (
                <Table.Row>
                  <Table.Cell>{this.getFormatedDate(e)}</Table.Cell>
                  <Table.Cell>{e.label}</Table.Cell>
                  <Table.Cell>{e.message}</Table.Cell>
                </Table.Row>
              ))}
              <Table.Footer>
                <Table.Row>
                  <Table.HeaderCell colSpan="3">
                    <Pagination
                      floated="right"
                      defaultActivePage={1}
                      onPageChange={(e, { activePage }) => {
                        this.handlePageChange(activePage);
                      }}
                      totalPages={Math.floor(
                        this.state.allEvents.length / 10
                      )}
                    />
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Footer>
            </Table>
          </div>
        </Dialog>

        <Navbar>
          <NavbarGroup align={Alignment.LEFT}>
            <NavbarHeading>WMATA</NavbarHeading>
            <NavbarDivider />
            <Button
              className="bp3-minimal"
              icon="desktop"
              text="Real-time incidents"
              onClick={() =>
                this.setState({ isMonitorOpened: !this.state.isMonitorOpened })
              }
            />
            <Button
              className="bp3-minimal"
              icon="panel-table"
              text="All events"
              onClick={() =>
                this.setState({ isDialogOpened: !this.state.isDialogOpened })
              }
            />
            <Button
              className="bp3-minimal"
              icon="train"
              text="Stations"
              onClick={() => this.setState({ isDrawerOpened: true })}
            />
          </NavbarGroup>
        </Navbar>

        <Drawer
          title="Stations"
          {...drawerState}
          onClose={() => this.setState({ isDrawerOpened: false })}
        >
          <Tree
            contents={this.state.lineNodes}
            onNodeClick={this.handleNodeClick}
            onNodeCollapse={this.handleNodeCollapse}
            onNodeExpand={this.handleNodeExpand}
          />
        </Drawer>
        <RealtimeMonitor isOpen={this.state.isMonitorOpened}></RealtimeMonitor>
      </div>
    );

    const mobileLayout = (
      <div>
        <MobilIncidentList
          events={this.state.events}
          stories={this.state.stories}
          onUpdate={(events) => this.setState({ events: events })}
          onStationListClick={this.onStationListClick}
          onIncidentListClick={this.onIncidentListClick}
        />
        <IncidentMap
          events={this.state.events}
          onStationClick={this.onStationClick}
          newCenter={this.state.newCenter}
          onUpdate={(events) => this.setState({ center: events })}
        />
        {this.state.mobileShowIncidentList && (
          <MobileStoryline
            selectedStation={this.state.selectedStation}
            events={this.state.events}
            ref={this.child}
            onListClose={this.onListClose}
          />
        )}
        {this.state.mobileShowStationList && (
          <MobileStationList
            events={this.state.events}
            onMarkerClick={this.onMarkerClick}
            onUpdate={(events) => this.setState({ events: events })}
            onStationClick={this.onStationClick}
            onListClose={this.onListClose}
          />
        )}
      </div>
    );

    return isMobile(navigator.userAgent).any ? mobileLayout : layout;
  }
}

export default MainPage;
