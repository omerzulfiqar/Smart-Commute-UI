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
  ControlGroup,
  Toaster,
} from "@blueprintjs/core";

import { DateInput } from "@blueprintjs/datetime";

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
      filterData: [],
      displayEvents: [],
    };
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onStationClick = this.onStationClick.bind(this);
    this.child = React.createRef();
  }

  toaster;
  refHandlers = {
    toaster: (ref) => (this.toaster = ref),
  };

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
          result.stories.forEach((story) => {
            if ("created_at" in story) {
              story.date = new Date(parseInt(story.created_at));
            } else {
              story.date = new Date(story.date);
            }
          });

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
        data.events.forEach((event) => {
          if ("created_at" in event) {
            event.date = new Date(parseInt(event.created_at));
          } else {
            event.date = new Date(event.date);
          }
        });
        let allEvents = data.events.reverse();
        this.setState({
          allEvents: allEvents,
          filterData: allEvents,
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
      displayEvents: this.state.filterData.slice(startIndex, startIndex + 10),
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

    const filterGroupStyle = {
      marginTop: 20,
      marginLeft: 20,
      marginRight: 20,
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
          onClose={() =>
            this.setState({
              isDialogOpened: false,
              filterData: this.state.allEvents,
              displayEvents: this.state.allEvents.slice(0, 10),
            })
          }
        >
          <div style={filterGroupStyle}>
            <ControlGroup>
              <DateInput
                formatDate={(date) => date.toLocaleDateString()}
                parseDate={(str) => new Date(str)}
                shortcuts={true}
                onChange={(date, isUserChange) => {
                  var filterData;
                  if (date === null) {
                    filterData = this.state.allEvents;
                  } else {
                    filterData = this.state.allEvents.filter((a) => {
                      return (
                        a.date.toLocaleDateString() ===
                        date.toLocaleDateString()
                      );
                    });
                  }

                  this.setState({
                    filterData: filterData,
                    displayEvents: filterData.slice(0, 10),
                  });
                }}
                placeholder="Filter by date"
              />
            </ControlGroup>
          </div>
          <div className={Classes.DIALOG_BODY}>
            <Table celled>
              <Table.Header>
                <Table.HeaderCell>Date</Table.HeaderCell>
                <Table.HeaderCell>Category</Table.HeaderCell>
                <Table.HeaderCell>Text</Table.HeaderCell>
                <Table.HeaderCell>Link</Table.HeaderCell>
              </Table.Header>
              {this.state.displayEvents.map((e) => (
                <Table.Row>
                  <Table.Cell>{e.date.toLocaleString("en-US")}</Table.Cell>
                  <Table.Cell>{e.label}</Table.Cell>
                  <Table.Cell>{e.message}</Table.Cell>
                  <Table.Cell>
                    {e.url === null ? (
                      ""
                    ) : (
                      <a href={e.url} rel="noopener noreferrer" target="_blank">
                        {" "}
                        Source
                      </a>
                    )}
                  </Table.Cell>
                </Table.Row>
              ))}
              <Table.Footer>
                <Table.Row>
                  <Table.HeaderCell colSpan="4">
                    <Pagination
                      floated="right"
                      defaultActivePage={1}
                      onPageChange={(e, { activePage }) => {
                        this.handlePageChange(activePage);
                      }}
                      totalPages={Math.floor(this.state.filterData.length / 10)}
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
        <RealtimeMonitor
          isOpen={this.state.isMonitorOpened}
          toaster={this.toaster}
          onStationClick={this.onStationClick}
          onNewEvent={(event) => {
            this.state.allEvents.unshift(event);
            this.state.events
              .filter((station) => {
                return (
                  station.Code === event.code ||
                  (event.affectedArea !== undefined &&
                    event.affectedArea.indexOf(station.Code) > -1)
                );
              })
              .forEach((station) => {
                station.stories.unshift(event);
              });

            this.setState({
              filterData: this.state.allEvents,
              displayEvents: this.state.allEvents.slice(0, 10),
            });
          }}
        />

        <Toaster
          {...this.state}
          ref={this.refHandlers.toaster}
          position={Position.BOTTOM_RIGHT}
        />
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
