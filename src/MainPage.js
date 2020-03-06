import React, { Component } from "react";
import IncidentMap from "./IncidentMap";
import Stroyline from "./Storyline";
import IncidentTypeWindow from "./IncidentTypeWindow";
import IncidentTypeWindowRight from "./IncidentTypeWindowRight";
import MobileIncidentTypeWindow from "./MobileIncidentTypeWindow";
import isMobile from "ismobilejs";
import IncidentList from "./IncidentList";
import _ from "lodash";


class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      stories: [],
      mobileShowList: false
    };
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onStationClick = this.onStationClick.bind(this);
  }

  componentDidMount() {
    var stations = JSON.parse(JSON.stringify(data))[0].Stations;
    console.log(stations);
    stations.forEach(result => {
      console.log(result.stories);
      result.show = false;
      result.lock = false;
      result.visible = true;
      result.forceHover = false;
      result.category = "Metro";
    });
    this.setState({ events: stations, stories: stories});

    // fetch(process.env.REACT_APP_EVENT_API)
    //   .then(response => response.json())
    //   .then(data => {
    //     data.events.forEach(result => {
    //       result.show = false;
    //       result.lock = false;
    //       result.visible = true;
    //       result.forceHover = false;
    //     });
    //     this.setState({ events: data.events });
    //   });
  }

  onListClick = () => {
    this.setState({ mobileShowList: true });
  };

  onListClose = () => {
    this.setState({ mobileShowList: false });
  };

  onStationClick(stationId) {
    console.log(stationId);
    let station = _.find(this.state.events, { 'Code': stationId});
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
      return { mobileShowList: false, events: state.events };
    });
  }

  render() {
    return (
      <div>
        {/* {isMobile(navigator.userAgent).any ? (
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
        )} */}
        <Stroyline events={this.state.stories}/>
        (
          <IncidentTypeWindowRight
            events={this.state.events}
            onMarkerClick={this.onMarkerClick}
            onUpdate={events => this.setState({ events: events })}
            onStationClick={this.onStationClick}
          />
        )
        <IncidentMap events={this.state.events} 
          onStationClick={this.onStationClick}
          newCenter = {this.state.newCenter}
          onUpdate={events => this.setState({ center: events })}
        />
        {this.state.mobileShowList && (
          <IncidentList
            events={this.state.events}
            onListClose={this.onListClose}
            onUpdate={events => this.setState({ center: events })}
            onMarkerClick={this.onMarkerClick}
          />
        )}
        
      </div>
    );
  }
}

var stories = [
  {
    "code": "E02",
    "message": "Man Arrested in Shaw-Howard University Metro Shooting",
    "status": 1,
    "date": "2019-07-20 15:38:14"
  }, 
  {
    "code": "E02",
    "message": "1 injured, 2 sought after shooting at Shaw-Howard U Metro station| WTO https://wtop.com/dc/2019/07/1-injured-2-sought-after-shooting-at-shaw-howard-u-metro-station/          #SmartNews #bringit33",
    "status": 1,
    "date": "2019-07-19 22:20:45"
  },
  {
    "code": "E02",
    "message": "#BREAKING Man shot at Shaw-Howard University Metro Station at 1:12pm. He is conscious and breathing. Witnesses say the victim walked from the metro station to the 700 block of T st NW. #MPD #MetroTransitPD",
    "status": 1,
    "date": "2019-07-19 13:34:55"
  },
  {
    "code": "E02",
    "message": "UPDATED: Yellow/Green Line Alert: Shaw-Howard's 7th St entrance is closed due to a police investigation. The 8th St entrance remains open",
    "status": 1,
    "date": "2019-07-19 13:16:14"
  },
  {
    "code": "E02",
    "message": "somebody just got shot at Shaw-Howard station. I ain't never ran so fast in my life. It's too hot",
    "status": 0,
    "date": "2019-07-19 13:05:02"
  },
  {
    "code": "E02",
    "message": "Young I was just bout to get on the train at Shaw Howard and somebody just got shot in the station.",
    "status": 0,
    "date": "2019-07-19 12:58:32"
  }
]

var data = [
  {
    "Stations": [{
      "Code": "A01",
      "Name": "Metro Center",
      "StationTogether1": "C01",
      "StationTogether2": "",
      "LineCode1": "RD",
      "LineCode2": null,
      "LineCode3": null,
      "LineCode4": null,
      "Lat": 38.898303,
      "Lon": -77.028099,
      "Address": {
        "Street": "607 13th St. NW",
        "City": "Washington",
        "State": "DC",
        "Zip": "20005"
      },
      "stories": []
    }, {
      "Code": "A02",
      "Name": "Farragut North",
      "StationTogether1": "",
      "StationTogether2": "",
      "LineCode1": "RD",
      "LineCode2": null,
      "LineCode3": null,
      "LineCode4": null,
      "Lat": 38.903192,
      "Lon": -77.039766,
      "Address": {
        "Street": "1001 Connecticut Avenue NW",
        "City": "Washington",
        "State": "DC",
        "Zip": "20036"
      },
      "stories": []
    }, {
      "Code": "A03",
      "Name": "Dupont Circle",
      "StationTogether1": "",
      "StationTogether2": "",
      "LineCode1": "RD",
      "LineCode2": null,
      "LineCode3": null,
      "LineCode4": null,
      "Lat": 38.909499,
      "Lon": -77.04362,
      "Address": {
        "Street": "1525 20th St. NW",
        "City": "Washington",
        "State": "DC",
        "Zip": "20036"
      },
      "stories": []
    }, {
      "Code": "A04",
      "Name": "Woodley Park-Zoo/Adams Morgan",
      "StationTogether1": "",
      "StationTogether2": "",
      "LineCode1": "RD",
      "LineCode2": null,
      "LineCode3": null,
      "LineCode4": null,
      "Lat": 38.924999,
      "Lon": -77.052648,
      "Address": {
        "Street": "2700 Connecticut Ave., NW",
        "City": "Washington",
        "State": "DC",
        "Zip": "20008"
      },
      "stories": []
    }, {
      "Code": "A05",
      "Name": "Cleveland Park",
      "StationTogether1": "",
      "StationTogether2": "",
      "LineCode1": "RD",
      "LineCode2": null,
      "LineCode3": null,
      "LineCode4": null,
      "Lat": 38.934703,
      "Lon": -77.058226,
      "Address": {
        "Street": "3599 Connecticut Avenue NW",
        "City": "Washington",
        "State": "DC",
        "Zip": "20008"
      },
      "stories": []
    }, {
      "Code": "A06",
      "Name": "Van Ness-UDC",
      "StationTogether1": "",
      "StationTogether2": "",
      "LineCode1": "RD",
      "LineCode2": null,
      "LineCode3": null,
      "LineCode4": null,
      "Lat": 38.94362,
      "Lon": -77.063511,
      "Address": {
        "Street": "4200 Connecticut Avenue NW",
        "City": "Washington",
        "State": "DC",
        "Zip": "20008"
      },
      "stories": []
    }, {
      "Code": "A07",
      "Name": "Tenleytown-AU",
      "StationTogether1": "",
      "StationTogether2": "",
      "LineCode1": "RD",
      "LineCode2": null,
      "LineCode3": null,
      "LineCode4": null,
      "Lat": 38.947808,
      "Lon": -77.079615,
      "Address": {
        "Street": "4501 Wisconsin Avenue NW",
        "City": "Washington",
        "State": "DC",
        "Zip": "20016"
      },
      "stories": []
    }, {
      "Code": "A08",
      "Name": "Friendship Heights",
      "StationTogether1": "",
      "StationTogether2": "",
      "LineCode1": "RD",
      "LineCode2": null,
      "LineCode3": null,
      "LineCode4": null,
      "Lat": 38.960744,
      "Lon": -77.085969,
      "Address": {
        "Street": "5337 Wisconsin Avenue NW",
        "City": "Washington",
        "State": "DC",
        "Zip": "20015"
      },
      "stories": []
    }, {
      "Code": "A09",
      "Name": "Bethesda",
      "StationTogether1": "",
      "StationTogether2": "",
      "LineCode1": "RD",
      "LineCode2": null,
      "LineCode3": null,
      "LineCode4": null,
      "Lat": 38.984282,
      "Lon": -77.094431,
      "Address": {
        "Street": "7450 Wisconsin Avenue",
        "City": "Bethesda",
        "State": "MD",
        "Zip": "20814"
      },
      "stories": []
    }, {
      "Code": "A10",
      "Name": "Medical Center",
      "StationTogether1": "",
      "StationTogether2": "",
      "LineCode1": "RD",
      "LineCode2": null,
      "LineCode3": null,
      "LineCode4": null,
      "Lat": 38.999947,
      "Lon": -77.097253,
      "Address": {
        "Street": "8810 Rockville Pike",
        "City": "Bethesda",
        "State": "MD",
        "Zip": "20814"
      },
      "stories": []
    }, {
      "Code": "A11",
      "Name": "Grosvenor-Strathmore",
      "StationTogether1": "",
      "StationTogether2": "",
      "LineCode1": "RD",
      "LineCode2": null,
      "LineCode3": null,
      "LineCode4": null,
      "Lat": 39.029158,
      "Lon": -77.10415,
      "Address": {
        "Street": "10300 Rockville Pike",
        "City": "Bethesda",
        "State": "MD",
        "Zip": "20852"
      },
      "stories": []
    }, {
      "Code": "A12",
      "Name": "White Flint",
      "StationTogether1": "",
      "StationTogether2": "",
      "LineCode1": "RD",
      "LineCode2": null,
      "LineCode3": null,
      "LineCode4": null,
      "Lat": 39.048043,
      "Lon": -77.113131,
      "Address": {
        "Street": "5500 Marinelli Road",
        "City": "Rockville",
        "State": "MD",
        "Zip": "20852"
      },
      "stories": []
    }, {
      "Code": "A13",
      "Name": "Twinbrook",
      "StationTogether1": "",
      "StationTogether2": "",
      "LineCode1": "RD",
      "LineCode2": null,
      "LineCode3": null,
      "LineCode4": null,
      "Lat": 39.062359,
      "Lon": -77.121113,
      "Address": {
        "Street": "1600 Chapman Avenue",
        "City": "Rockville",
        "State": "MD",
        "Zip": "20852"
      },
      "stories": []
    }, {
      "Code": "A14",
      "Name": "Rockville",
      "StationTogether1": "",
      "StationTogether2": "",
      "LineCode1": "RD",
      "LineCode2": null,
      "LineCode3": null,
      "LineCode4": null,
      "Lat": 39.084215,
      "Lon": -77.146424,
      "Address": {
        "Street": "251 Hungerford Drive",
        "City": "Rockville",
        "State": "MD",
        "Zip": "20850"
      },
      "stories": []
    }, {
      "Code": "A15",
      "Name": "Shady Grove",
      "StationTogether1": "",
      "StationTogether2": "",
      "LineCode1": "RD",
      "LineCode2": null,
      "LineCode3": null,
      "LineCode4": null,
      "Lat": 39.119819,
      "Lon": -77.164921,
      "Address": {
        "Street": "15903 Somerville Drive",
        "City": "Rockville",
        "State": "MD",
        "Zip": "20855"
      },
      "stories": []
    }, {
      "Code": "B01",
      "Name": "Gallery Pl-Chinatown",
      "StationTogether1": "F01",
      "StationTogether2": "",
      "LineCode1": "RD",
      "LineCode2": null,
      "LineCode3": null,
      "LineCode4": null,
      "Lat": 38.89834,
      "Lon": -77.021851,
      "Address": {
        "Street": "630 H St. NW",
        "City": "Washington",
        "State": "DC",
        "Zip": "20001"
      },
      "stories": []
    }, {
      "Code": "B02",
      "Name": "Judiciary Square",
      "StationTogether1": "",
      "StationTogether2": "",
      "LineCode1": "RD",
      "LineCode2": null,
      "LineCode3": null,
      "LineCode4": null,
      "Lat": 38.896084,
      "Lon": -77.016643,
      "Address": {
        "Street": "450 F Street NW",
        "City": "Washington",
        "State": "DC",
        "Zip": "20001"
      },
      "stories": []
    }, {
      "Code": "B03",
      "Name": "Union Station",
      "StationTogether1": "",
      "StationTogether2": "",
      "LineCode1": "RD",
      "LineCode2": null,
      "LineCode3": null,
      "LineCode4": null,
      "Lat": 38.897723,
      "Lon": -77.006745,
      "Address": {
        "Street": "701 First St. NE",
        "City": "Washington",
        "State": "DC",
        "Zip": "20002"
      },
      "stories": []
    }, {
      "Code": "B04",
      "Name": "Rhode Island Ave-Brentwood",
      "StationTogether1": "",
      "StationTogether2": "",
      "LineCode1": "RD",
      "LineCode2": null,
      "LineCode3": null,
      "LineCode4": null,
      "Lat": 38.920741,
      "Lon": -76.995984,
      "Address": {
        "Street": "919 Rhode Island Avenue NE",
        "City": "Washington",
        "State": "DC",
        "Zip": "20018"
      },
      "stories": []
    }, {
      "Code": "B05",
      "Name": "Brookland-CUA",
      "StationTogether1": "",
      "StationTogether2": "",
      "LineCode1": "RD",
      "LineCode2": null,
      "LineCode3": null,
      "LineCode4": null,
      "Lat": 38.933234,
      "Lon": -76.994544,
      "Address": {
        "Street": "801 Michigan Avenue NE",
        "City": "Washington",
        "State": "DC",
        "Zip": "20017"
      },
      "stories": []
    }, {
      "Code": "B06",
      "Name": "Fort Totten",
      "StationTogether1": "E06",
      "StationTogether2": "",
      "LineCode1": "RD",
      "LineCode2": null,
      "LineCode3": null,
      "LineCode4": null,
      "Lat": 38.951777,
      "Lon": -77.002174,
      "Address": {
        "Street": "550 Galloway Street NE",
        "City": "Washington",
        "State": "DC",
        "Zip": "20011"
      },
      "stories": []
    }, {
      "Code": "B07",
      "Name": "Takoma",
      "StationTogether1": "",
      "StationTogether2": "",
      "LineCode1": "RD",
      "LineCode2": null,
      "LineCode3": null,
      "LineCode4": null,
      "Lat": 38.975532,
      "Lon": -77.017834,
      "Address": {
        "Street": "327 Cedar Street NW",
        "City": "Washington",
        "State": "DC",
        "Zip": "20012"
      },
      "stories": []
    }, {
      "Code": "B08",
      "Name": "Silver Spring",
      "StationTogether1": "",
      "StationTogether2": "",
      "LineCode1": "RD",
      "LineCode2": null,
      "LineCode3": null,
      "LineCode4": null,
      "Lat": 38.993841,
      "Lon": -77.031321,
      "Address": {
        "Street": "8400 Colesville Road",
        "City": "Silver Spring",
        "State": "MD",
        "Zip": "20910"
      },
      "stories": []
    }, {
      "Code": "B09",
      "Name": "Forest Glen",
      "StationTogether1": "",
      "StationTogether2": "",
      "LineCode1": "RD",
      "LineCode2": null,
      "LineCode3": null,
      "LineCode4": null,
      "Lat": 39.015413,
      "Lon": -77.042953,
      "Address": {
        "Street": "9730 Georgia Avenue",
        "City": "Forest Glen",
        "State": "MD",
        "Zip": "20910"
      },
      "stories": []
    }, {
      "Code": "B10",
      "Name": "Wheaton",
      "StationTogether1": "",
      "StationTogether2": "",
      "LineCode1": "RD",
      "LineCode2": null,
      "LineCode3": null,
      "LineCode4": null,
      "Lat": 39.038558,
      "Lon": -77.051098,
      "Address": {
        "Street": "11171 Georgia Avenue",
        "City": "Silver Spring",
        "State": "MD",
        "Zip": "20902"
      },
      "stories": []
    }, {
      "Code": "B11",
      "Name": "Glenmont",
      "StationTogether1": "",
      "StationTogether2": "",
      "LineCode1": "RD",
      "LineCode2": null,
      "LineCode3": null,
      "LineCode4": null,
      "Lat": 39.061713,
      "Lon": -77.05341,
      "Address": {
        "Street": "12501 Georgia Avenue",
        "City": "Silver Spring",
        "State": "MD",
        "Zip": "20906"
      },
      "stories": []
    }, {
      "Code": "B35",
      "Name": "NoMa-Gallaudet U",
      "StationTogether1": "",
      "StationTogether2": "",
      "LineCode1": "RD",
      "LineCode2": null,
      "LineCode3": null,
      "LineCode4": null,
      "Lat": 38.907407,
      "Lon": -77.002961,
      "Address": {
        "Street": "200 Florida Ave N.E.",
        "City": "Washington",
        "State": "DC",
        "Zip": "20002"
      },
      "stories": []
    }, {
      "Code": "C01",
      "Name": "Metro Center",
      "StationTogether1": "A01",
      "StationTogether2": "",
      "LineCode1": "BL",
      "LineCode2": "OR",
      "LineCode3": "SV",
      "LineCode4": null,
      "Lat": 38.898303,
      "Lon": -77.028099,
      "Address": {
        "Street": "607 13th St. NW",
        "City": "Washington",
        "State": "DC",
        "Zip": "20005"
      },
      "stories": []
    }, {
      "Code": "C02",
      "Name": "McPherson Square",
      "StationTogether1": "",
      "StationTogether2": "",
      "LineCode1": "BL",
      "LineCode2": "OR",
      "LineCode3": "SV",
      "LineCode4": null,
      "Lat": 38.901316,
      "Lon": -77.033652,
      "Address": {
        "Street": "1400 I St. NW",
        "City": "Washington",
        "State": "DC",
        "Zip": "20005"
      },
      "stories": []
    }, {
      "Code": "C03",
      "Name": "Farragut West",
      "StationTogether1": "",
      "StationTogether2": "",
      "LineCode1": "BL",
      "LineCode2": "OR",
      "LineCode3": "SV",
      "LineCode4": null,
      "Lat": 38.901311,
      "Lon": -77.03981,
      "Address": {
        "Street": "900 18th St. NW",
        "City": "Washington",
        "State": "DC",
        "Zip": "20006"
      },
      "stories": []
    }, {
      "Code": "C04",
      "Name": "Foggy Bottom-GWU",
      "StationTogether1": "",
      "StationTogether2": "",
      "LineCode1": "BL",
      "LineCode2": "OR",
      "LineCode3": "SV",
      "LineCode4": null,
      "Lat": 38.900599,
      "Lon": -77.050273,
      "Address": {
        "Street": "2301 I St. NW",
        "City": "Washington",
        "State": "DC",
        "Zip": "20037"
      },
      "stories": []
    }, {
      "Code": "C05",
      "Name": "Rosslyn",
      "StationTogether1": "",
      "StationTogether2": "",
      "LineCode1": "BL",
      "LineCode2": "OR",
      "LineCode3": "SV",
      "LineCode4": null,
      "Lat": 38.896595,
      "Lon": -77.07146,
      "Address": {
        "Street": "1850 N. Moore Street",
        "City": "Arlington",
        "State": "VA",
        "Zip": "22209"
      },
      "stories": []
    }, {
      "Code": "C06",
      "Name": "Arlington Cemetery",
      "StationTogether1": "",
      "StationTogether2": "",
      "LineCode1": "BL",
      "LineCode2": null,
      "LineCode3": null,
      "LineCode4": null,
      "Lat": 38.884574,
      "Lon": -77.063108,
      "Address": {
        "Street": "1000 North Memorial Drive",
        "City": "Arlington",
        "State": "VA",
        "Zip": "22211"
      },
      "stories": []
    }, {
      "Code": "C07",
      "Name": "Pentagon",
      "StationTogether1": "",
      "StationTogether2": "",
      "LineCode1": "BL",
      "LineCode2": "YL",
      "LineCode3": null,
      "LineCode4": null,
      "Lat": 38.869349,
      "Lon": -77.054013,
      "Address": {
        "Street": "2 South Rotary Road",
        "City": "Arlington",
        "State": "VA",
        "Zip": "22202"
      },
      "stories": []
    }, {
      "Code": "C08",
      "Name": "Pentagon City",
      "StationTogether1": "",
      "StationTogether2": "",
      "LineCode1": "BL",
      "LineCode2": "YL",
      "LineCode3": null,
      "LineCode4": null,
      "Lat": 38.863045,
      "Lon": -77.059507,
      "Address": {
        "Street": "1250 South Hayes St.",
        "City": "Arlington",
        "State": "VA",
        "Zip": "22202"
      },
      "stories": []
    }, {
      "Code": "C09",
      "Name": "Crystal City",
      "StationTogether1": "",
      "StationTogether2": "",
      "LineCode1": "BL",
      "LineCode2": "YL",
      "LineCode3": null,
      "LineCode4": null,
      "Lat": 38.85779,
      "Lon": -77.050589,
      "Address": {
        "Street": "1750 South Clark St.",
        "City": "Arlington",
        "State": "VA",
        "Zip": "22202"
      },
      "stories": []
    }, {
      "Code": "C10",
      "Name": "Ronald Reagan Washington National Airport",
      "StationTogether1": "",
      "StationTogether2": "",
      "LineCode1": "BL",
      "LineCode2": "YL",
      "LineCode3": null,
      "LineCode4": null,
      "Lat": 38.852985,
      "Lon": -77.043805,
      "Address": {
        "Street": "2400 S. Smith Blvd.",
        "City": "Arlington",
        "State": "VA",
        "Zip": "22202"
      },
      "stories": []
    }, {
      "Code": "C12",
      "Name": "Braddock Road",
      "StationTogether1": "",
      "StationTogether2": "",
      "LineCode1": "BL",
      "LineCode2": "YL",
      "LineCode3": null,
      "LineCode4": null,
      "Lat": 38.814009,
      "Lon": -77.053763,
      "Address": {
        "Street": "700 N. West St.",
        "City": "Alexandria",
        "State": "VA",
        "Zip": "22301"
      },
      "stories": []
    }, {
      "Code": "C13",
      "Name": "King St-Old Town",
      "StationTogether1": "",
      "StationTogether2": "",
      "LineCode1": "BL",
      "LineCode2": "YL",
      "LineCode3": null,
      "LineCode4": null,
      "Lat": 38.806474,
      "Lon": -77.061115,
      "Address": {
        "Street": "1900 King Street",
        "City": "Alexandria",
        "State": "VA",
        "Zip": "22301"
      },
      "stories": []
    }, {
      "Code": "C14",
      "Name": "Eisenhower Avenue",
      "StationTogether1": "",
      "StationTogether2": "",
      "LineCode1": "YL",
      "LineCode2": null,
      "LineCode3": null,
      "LineCode4": null,
      "Lat": 38.800313,
      "Lon": -77.071173,
      "Address": {
        "Street": "2400 Eisenhower Avenue",
        "City": "Alexandria",
        "State": "VA",
        "Zip": "22314"
      },
      "stories": []
    }, {
      "Code": "C15",
      "Name": "Huntington",
      "StationTogether1": "",
      "StationTogether2": "",
      "LineCode1": "YL",
      "LineCode2": null,
      "LineCode3": null,
      "LineCode4": null,
      "Lat": 38.793841,
      "Lon": -77.075301,
      "Address": {
        "Street": "2501 Huntington Ave",
        "City": "Huntington",
        "State": "VA",
        "Zip": "22303"
      },
      "stories": []
    }, {
      "Code": "D01",
      "Name": "Federal Triangle",
      "StationTogether1": "",
      "StationTogether2": "",
      "LineCode1": "BL",
      "LineCode2": "OR",
      "LineCode3": "SV",
      "LineCode4": null,
      "Lat": 38.893757,
      "Lon": -77.028218,
      "Address": {
        "Street": "302 12th St. NW",
        "City": "Washington",
        "State": "DC",
        "Zip": "20004"
      },
      "stories": []
    }, {
      "Code": "D02",
      "Name": "Smithsonian",
      "StationTogether1": "",
      "StationTogether2": "",
      "LineCode1": "BL",
      "LineCode2": "OR",
      "LineCode3": "SV",
      "LineCode4": null,
      "Lat": 38.888022,
      "Lon": -77.028232,
      "Address": {
        "Street": "1200 Independence Avenue SW",
        "City": "Washington",
        "State": "DC",
        "Zip": "20004"
      },
      "stories": []
    }, {
      "Code": "D03",
      "Name": "L'Enfant Plaza",
      "StationTogether1": "F03",
      "StationTogether2": "",
      "LineCode1": "BL",
      "LineCode2": "OR",
      "LineCode3": "SV",
      "LineCode4": null,
      "Lat": 38.884775,
      "Lon": -77.021964,
      "Address": {
        "Street": "600 Maryland Avenue SW",
        "City": "Washington",
        "State": "DC",
        "Zip": "20024"
      },
      "stories": []
    }, {
      "Code": "D04",
      "Name": "Federal Center SW",
      "StationTogether1": "",
      "StationTogether2": "",
      "LineCode1": "BL",
      "LineCode2": "OR",
      "LineCode3": "SV",
      "LineCode4": null,
      "Lat": 38.884958,
      "Lon": -77.01586,
      "Address": {
        "Street": "401 3rd Street SW",
        "City": "Washington",
        "State": "DC",
        "Zip": "20024"
      },
      "stories": []
    }, {
      "Code": "D05",
      "Name": "Capitol South",
      "StationTogether1": "",
      "StationTogether2": "",
      "LineCode1": "BL",
      "LineCode2": "OR",
      "LineCode3": "SV",
      "LineCode4": null,
      "Lat": 38.884968,
      "Lon": -77.005137,
      "Address": {
        "Street": "355 First Street SE",
        "City": "Washington",
        "State": "DC",
        "Zip": "20003"
      },
      "stories": []
    }, {
      "Code": "D06",
      "Name": "Eastern Market",
      "StationTogether1": "",
      "StationTogether2": "",
      "LineCode1": "BL",
      "LineCode2": "OR",
      "LineCode3": "SV",
      "LineCode4": null,
      "Lat": 38.884124,
      "Lon": -76.995334,
      "Address": {
        "Street": "701 Pennsylvania Avenue SE",
        "City": "Washington",
        "State": "DC",
        "Zip": "20003"
      },
      "stories": []
    }, {
      "Code": "D07",
      "Name": "Potomac Ave",
      "StationTogether1": "",
      "StationTogether2": "",
      "LineCode1": "BL",
      "LineCode2": "OR",
      "LineCode3": "SV",
      "LineCode4": null,
      "Lat": 38.880841,
      "Lon": -76.985721,
      "Address": {
        "Street": "700 14th Street SE",
        "City": "Washington",
        "State": "DC",
        "Zip": "20003"
      },
      "stories": []
    }, {
      "Code": "D08",
      "Name": "Stadium-Armory",
      "StationTogether1": "",
      "StationTogether2": "",
      "LineCode1": "BL",
      "LineCode2": "OR",
      "LineCode3": "SV",
      "LineCode4": null,
      "Lat": 38.88594,
      "Lon": -76.977485,
      "Address": {
        "Street": "192 19th St. SE",
        "City": "Washington",
        "State": "DC",
        "Zip": "20003"
      },
      "stories": []
    }, {
      "Code": "D09",
      "Name": "Minnesota Ave",
      "StationTogether1": "",
      "StationTogether2": "",
      "LineCode1": "OR",
      "LineCode2": null,
      "LineCode3": null,
      "LineCode4": null,
      "Lat": 38.898284,
      "Lon": -76.948042,
      "Address": {
        "Street": "4000 Minnesota Avenue NE",
        "City": "Washington",
        "State": "DC",
        "Zip": "20019"
      },
      "stories": []
    }, {
      "Code": "D10",
      "Name": "Deanwood",
      "StationTogether1": "",
      "StationTogether2": "",
      "LineCode1": "OR",
      "LineCode2": null,
      "LineCode3": null,
      "LineCode4": null,
      "Lat": 38.907734,
      "Lon": -76.936177,
      "Address": {
        "Street": "4720 Minnesota Avenue NE",
        "City": "Washington",
        "State": "DC",
        "Zip": "20019"
      },
      "stories": []
    }, {
      "Code": "D11",
      "Name": "Cheverly",
      "StationTogether1": "",
      "StationTogether2": "",
      "LineCode1": "OR",
      "LineCode2": null,
      "LineCode3": null,
      "LineCode4": null,
      "Lat": 38.91652,
      "Lon": -76.915427,
      "Address": {
        "Street": "5501 Columbia Park",
        "City": "Cheverly",
        "State": "MD",
        "Zip": "20785"
      },
      "stories": []
    }, {
      "Code": "D12",
      "Name": "Landover",
      "StationTogether1": "",
      "StationTogether2": "",
      "LineCode1": "OR",
      "LineCode2": null,
      "LineCode3": null,
      "LineCode4": null,
      "Lat": 38.934411,
      "Lon": -76.890988,
      "Address": {
        "Street": "3000 Pennsy Drive",
        "City": "Hyattsville",
        "State": "MD",
        "Zip": "20785"
      },
      "stories": []
    }, {
      "Code": "D13",
      "Name": "New Carrollton",
      "StationTogether1": "",
      "StationTogether2": "",
      "LineCode1": "OR",
      "LineCode2": null,
      "LineCode3": null,
      "LineCode4": null,
      "Lat": 38.947674,
      "Lon": -76.872144,
      "Address": {
        "Street": "4700 Garden City Drive",
        "City": "New Carrollton",
        "State": "MD",
        "Zip": "20784"
      },
      "stories": []
    }, {
      "Code": "E01",
      "Name": "Mt Vernon Sq 7th St-Convention Center",
      "StationTogether1": "",
      "StationTogether2": "",
      "LineCode1": "GR",
      "LineCode2": "YL",
      "LineCode3": null,
      "LineCode4": null,
      "Lat": 38.905604,
      "Lon": -77.022256,
      "Address": {
        "Street": "700 M St. NW",
        "City": "Washington",
        "State": "DC",
        "Zip": "20001"
      },
      "stories": []
    }, {
      "Code": "E02",
      "Name": "Shaw-Howard U",
      "StationTogether1": "",
      "StationTogether2": "",
      "LineCode1": "GR",
      "LineCode2": "YL",
      "LineCode3": null,
      "LineCode4": null,
      "Lat": 38.912919,
      "Lon": -77.022194,
      "Address": {
        "Street": "1701 8th St. NW",
        "City": "Washington",
        "State": "DC",
        "Zip": "20001"
      },
      "stories": [
        {
          "message": "Man Arrested in Shaw-Howard University Metro Shooting",
          "status": 1,
          "date": "2019-07-20 15:38:14"
        }, 
        {
          "message": "1 injured, 2 sought after shooting at Shaw-Howard U Metro station| WTO https://wtop.com/dc/2019/07/1-injured-2-sought-after-shooting-at-shaw-howard-u-metro-station/          #SmartNews #bringit33",
          "status": 1,
          "date": "2019-07-20 15:38:14"
        }
      ]
    }, {
      "Code": "E03",
      "Name": "U Street/African-Amer Civil War Memorial/Cardozo",
      "StationTogether1": "",
      "StationTogether2": "",
      "LineCode1": "GR",
      "LineCode2": "YL",
      "LineCode3": null,
      "LineCode4": null,
      "Lat": 38.916489,
      "Lon": -77.028938,
      "Address": {
        "Street": "1240 U Street NW",
        "City": "Washington",
        "State": "DC",
        "Zip": "20009"
      },
      "stories": []
    }, {
      "Code": "E04",
      "Name": "Columbia Heights",
      "StationTogether1": "",
      "StationTogether2": "",
      "LineCode1": "GR",
      "LineCode2": "YL",
      "LineCode3": null,
      "LineCode4": null,
      "Lat": 38.928672,
      "Lon": -77.032775,
      "Address": {
        "Street": "3030 14th St. NW",
        "City": "Washington",
        "State": "DC",
        "Zip": "20009"
      },
      "stories": []
    }, {
      "Code": "E05",
      "Name": "Georgia Ave-Petworth",
      "StationTogether1": "",
      "StationTogether2": "",
      "LineCode1": "GR",
      "LineCode2": "YL",
      "LineCode3": null,
      "LineCode4": null,
      "Lat": 38.936077,
      "Lon": -77.024728,
      "Address": {
        "Street": "3700 Georgia Avenue NW",
        "City": "Washington",
        "State": "DC",
        "Zip": "20010"
      },
      "stories": []
    }, {
      "Code": "E06",
      "Name": "Fort Totten",
      "StationTogether1": "B06",
      "StationTogether2": "",
      "LineCode1": "GR",
      "LineCode2": "YL",
      "LineCode3": null,
      "LineCode4": null,
      "Lat": 38.951777,
      "Lon": -77.002174,
      "Address": {
        "Street": "550 Galloway Street NE",
        "City": "Washington",
        "State": "DC",
        "Zip": "20011"
      },
      "stories": []
    }, {
      "Code": "E07",
      "Name": "West Hyattsville",
      "StationTogether1": "",
      "StationTogether2": "",
      "LineCode1": "GR",
      "LineCode2": null,
      "LineCode3": null,
      "LineCode4": null,
      "Lat": 38.954931,
      "Lon": -76.969881,
      "Address": {
        "Street": "2700 Hamilton St.",
        "City": "Hyattsville",
        "State": "MD",
        "Zip": "20782"
      },
      "stories": []
    }, {
      "Code": "E08",
      "Name": "Prince George's Plaza",
      "StationTogether1": "",
      "StationTogether2": "",
      "LineCode1": "GR",
      "LineCode2": null,
      "LineCode3": null,
      "LineCode4": null,
      "Lat": 38.965276,
      "Lon": -76.956182,
      "Address": {
        "Street": "3575 East West Highway",
        "City": "Hyattsville",
        "State": "MD",
        "Zip": "20782"
      },
      "stories": []
    }, {
      "Code": "E09",
      "Name": "College Park-U of Md",
      "StationTogether1": "",
      "StationTogether2": "",
      "LineCode1": "GR",
      "LineCode2": null,
      "LineCode3": null,
      "LineCode4": null,
      "Lat": 38.978523,
      "Lon": -76.928432,
      "Address": {
        "Street": "4931 Calvert Road",
        "City": "College Park",
        "State": "MD",
        "Zip": "20740"
      },
      "stories": []
    }, {
      "Code": "E10",
      "Name": "Greenbelt",
      "StationTogether1": "",
      "StationTogether2": "",
      "LineCode1": "GR",
      "LineCode2": null,
      "LineCode3": null,
      "LineCode4": null,
      "Lat": 39.011036,
      "Lon": -76.911362,
      "Address": {
        "Street": "5717 Greenbelt Metro Drive",
        "City": "Greenbelt",
        "State": "MD",
        "Zip": "20740"
      },
      "stories": []
    }, {
      "Code": "F01",
      "Name": "Gallery Pl-Chinatown",
      "StationTogether1": "B01",
      "StationTogether2": "",
      "LineCode1": "GR",
      "LineCode2": "YL",
      "LineCode3": null,
      "LineCode4": null,
      "Lat": 38.89834,
      "Lon": -77.021851,
      "Address": {
        "Street": "630 H St. NW",
        "City": "Washington",
        "State": "DC",
        "Zip": "20001"
      },
      "stories": []
    }, {
      "Code": "F02",
      "Name": "Archives-Navy Memorial-Penn Quarter",
      "StationTogether1": "",
      "StationTogether2": "",
      "LineCode1": "GR",
      "LineCode2": "YL",
      "LineCode3": null,
      "LineCode4": null,
      "Lat": 38.893893,
      "Lon": -77.021902,
      "Address": {
        "Street": "701 Pennsylvania Avenue NW",
        "City": "Washington",
        "State": "DC",
        "Zip": "20004"
      },
      "stories": []
    }, {
      "Code": "F03",
      "Name": "L'Enfant Plaza",
      "StationTogether1": "D03",
      "StationTogether2": "",
      "LineCode1": "GR",
      "LineCode2": "YL",
      "LineCode3": null,
      "LineCode4": null,
      "Lat": 38.884775,
      "Lon": -77.021964,
      "Address": {
        "Street": "600 Maryland Avenue SW",
        "City": "Washington",
        "State": "DC",
        "Zip": "20024"
      },
      "stories": []
    }, {
      "Code": "F04",
      "Name": "Waterfront",
      "StationTogether1": "",
      "StationTogether2": "",
      "LineCode1": "GR",
      "LineCode2": null,
      "LineCode3": null,
      "LineCode4": null,
      "Lat": 38.876221,
      "Lon": -77.017491,
      "Address": {
        "Street": "399 M Street SW",
        "City": "Washington",
        "State": "DC",
        "Zip": "20024"
      },
      "stories": []
    }, {
      "Code": "F05",
      "Name": "Navy Yard-Ballpark",
      "StationTogether1": "",
      "StationTogether2": "",
      "LineCode1": "GR",
      "LineCode2": null,
      "LineCode3": null,
      "LineCode4": null,
      "Lat": 38.876588,
      "Lon": -77.005086,
      "Address": {
        "Street": "200 M Street SE",
        "City": "Washington",
        "State": "DC",
        "Zip": "20003"
      },
      "stories": []
    }, {
      "Code": "F06",
      "Name": "Anacostia",
      "StationTogether1": "",
      "StationTogether2": "",
      "LineCode1": "GR",
      "LineCode2": null,
      "LineCode3": null,
      "LineCode4": null,
      "Lat": 38.862072,
      "Lon": -76.995648,
      "Address": {
        "Street": "1101 Howard Road SE",
        "City": "Washington",
        "State": "DC",
        "Zip": "20020"
      },
      "stories": []
    }, {
      "Code": "F07",
      "Name": "Congress Heights",
      "StationTogether1": "",
      "StationTogether2": "",
      "LineCode1": "GR",
      "LineCode2": null,
      "LineCode3": null,
      "LineCode4": null,
      "Lat": 38.845334,
      "Lon": -76.98817,
      "Address": {
        "Street": "1290 Alabama Avenue SE",
        "City": "Washington",
        "State": "DC",
        "Zip": "20020"
      },
      "stories": []
    }, {
      "Code": "F08",
      "Name": "Southern Avenue",
      "StationTogether1": "",
      "StationTogether2": "",
      "LineCode1": "GR",
      "LineCode2": null,
      "LineCode3": null,
      "LineCode4": null,
      "Lat": 38.840974,
      "Lon": -76.97536,
      "Address": {
        "Street": "1411 Southern Avenue",
        "City": "Temple Hills",
        "State": "MD",
        "Zip": "20748"
      },
      "stories": []
    }, {
      "Code": "F09",
      "Name": "Naylor Road",
      "StationTogether1": "",
      "StationTogether2": "",
      "LineCode1": "GR",
      "LineCode2": null,
      "LineCode3": null,
      "LineCode4": null,
      "Lat": 38.851187,
      "Lon": -76.956565,
      "Address": {
        "Street": "3101 Branch Avenue",
        "City": "Temple Hills",
        "State": "MD",
        "Zip": "20748"
      },
      "stories": []
    }, {
      "Code": "F10",
      "Name": "Suitland",
      "StationTogether1": "",
      "StationTogether2": "",
      "LineCode1": "GR",
      "LineCode2": null,
      "LineCode3": null,
      "LineCode4": null,
      "Lat": 38.843891,
      "Lon": -76.932022,
      "Address": {
        "Street": "4500 Silver Hill Road",
        "City": "Suitland",
        "State": "MD",
        "Zip": "20746"
      },
      "stories": []
    }, {
      "Code": "F11",
      "Name": "Branch Ave",
      "StationTogether1": "",
      "StationTogether2": "",
      "LineCode1": "GR",
      "LineCode2": null,
      "LineCode3": null,
      "LineCode4": null,
      "Lat": 38.826995,
      "Lon": -76.912134,
      "Address": {
        "Street": "4704 Old Soper Road",
        "City": "Suitland",
        "State": "MD",
        "Zip": "20746"
      },
      "stories": []
    }, {
      "Code": "G01",
      "Name": "Benning Road",
      "StationTogether1": "",
      "StationTogether2": "",
      "LineCode1": "BL",
      "LineCode2": "SV",
      "LineCode3": null,
      "LineCode4": null,
      "Lat": 38.890488,
      "Lon": -76.938291,
      "Address": {
        "Street": "4500 Benning Road",
        "City": "Washington",
        "State": "DC",
        "Zip": "20019"
      },
      "stories": []
    }, {
      "Code": "G02",
      "Name": "Capitol Heights",
      "StationTogether1": "",
      "StationTogether2": "",
      "LineCode1": "BL",
      "LineCode2": "SV",
      "LineCode3": null,
      "LineCode4": null,
      "Lat": 38.889757,
      "Lon": -76.913382,
      "Address": {
        "Street": "133 Central Avenue",
        "City": "Capitol Heights",
        "State": "MD",
        "Zip": "20743"
      },
      "stories": []
    }, {
      "Code": "G03",
      "Name": "Addison Road-Seat Pleasant",
      "StationTogether1": "",
      "StationTogether2": "",
      "LineCode1": "BL",
      "LineCode2": "SV",
      "LineCode3": null,
      "LineCode4": null,
      "Lat": 38.886713,
      "Lon": -76.893592,
      "Address": {
        "Street": "100 Addison Road S.",
        "City": "Capitol Heights",
        "State": "MD",
        "Zip": "20743"
      },
      "stories": []
    }, {
      "Code": "G04",
      "Name": "Morgan Boulevard",
      "StationTogether1": "",
      "StationTogether2": "",
      "LineCode1": "BL",
      "LineCode2": "SV",
      "LineCode3": null,
      "LineCode4": null,
      "Lat": 38.8913,
      "Lon": -76.8682,
      "Address": {
        "Street": "300 Garrett Morgan Blvd.",
        "City": "Landover",
        "State": "MD",
        "Zip": "20785"
      },
      "stories": []
    }, {
      "Code": "G05",
      "Name": "Largo Town Center",
      "StationTogether1": "",
      "StationTogether2": "",
      "LineCode1": "BL",
      "LineCode2": "SV",
      "LineCode3": null,
      "LineCode4": null,
      "Lat": 38.9008,
      "Lon": -76.8449,
      "Address": {
        "Street": "Largo Town Center 9000 Lottsford Road",
        "City": "Largo",
        "State": "MD",
        "Zip": "20774"
      },
      "stories": []
    }, {
      "Code": "J02",
      "Name": "Van Dorn Street",
      "StationTogether1": "",
      "StationTogether2": "",
      "LineCode1": "BL",
      "LineCode2": null,
      "LineCode3": null,
      "LineCode4": null,
      "Lat": 38.799193,
      "Lon": -77.129407,
      "Address": {
        "Street": "5690 Eisenhower Avenue",
        "City": "Alexandria",
        "State": "VA",
        "Zip": "22310"
      },
      "stories": []
    }, {
      "Code": "J03",
      "Name": "Franconia-Springfield",
      "StationTogether1": "",
      "StationTogether2": "",
      "LineCode1": "BL",
      "LineCode2": null,
      "LineCode3": null,
      "LineCode4": null,
      "Lat": 38.766129,
      "Lon": -77.168797,
      "Address": {
        "Street": "6880 Frontier Drive",
        "City": "Springfield",
        "State": "VA",
        "Zip": "22150"
      },
      "stories": []
    }, {
      "Code": "K01",
      "Name": "Court House",
      "StationTogether1": "",
      "StationTogether2": "",
      "LineCode1": "OR",
      "LineCode2": "SV",
      "LineCode3": null,
      "LineCode4": null,
      "Lat": 38.891499,
      "Lon": -77.08391,
      "Address": {
        "Street": "2100 Wilson Blvd",
        "City": "Arlington",
        "State": "VA",
        "Zip": "22201"
      },
      "stories": []
    }, {
      "Code": "K02",
      "Name": "Clarendon",
      "StationTogether1": "",
      "StationTogether2": "",
      "LineCode1": "OR",
      "LineCode2": "SV",
      "LineCode3": null,
      "LineCode4": null,
      "Lat": 38.886373,
      "Lon": -77.096963,
      "Address": {
        "Street": "3100 Wilson Blvd",
        "City": "Arlington",
        "State": "VA",
        "Zip": "22201"
      },
      "stories": []
    }, {
      "Code": "K03",
      "Name": "Virginia Square-GMU",
      "StationTogether1": "",
      "StationTogether2": "",
      "LineCode1": "OR",
      "LineCode2": "SV",
      "LineCode3": null,
      "LineCode4": null,
      "Lat": 38.88331,
      "Lon": -77.104267,
      "Address": {
        "Street": "3600 Fairfax Drive",
        "City": "Arlington",
        "State": "VA",
        "Zip": "22201"
      },
      "stories": []
    }, {
      "Code": "K04",
      "Name": "Ballston-MU",
      "StationTogether1": "",
      "StationTogether2": "",
      "LineCode1": "OR",
      "LineCode2": "SV",
      "LineCode3": null,
      "LineCode4": null,
      "Lat": 38.882071,
      "Lon": -77.111845,
      "Address": {
        "Street": "4230 Fairfax Drive",
        "City": "Arlington",
        "State": "VA",
        "Zip": "22201"
      },
      "stories": []
    }, {
      "Code": "K05",
      "Name": "East Falls Church",
      "StationTogether1": "",
      "StationTogether2": "",
      "LineCode1": "OR",
      "LineCode2": "SV",
      "LineCode3": null,
      "LineCode4": null,
      "Lat": 38.885841,
      "Lon": -77.157177,
      "Address": {
        "Street": "2001 N. Sycamore St.",
        "City": "Arlington",
        "State": "VA",
        "Zip": "22205"
      },
      "stories": []
    }, {
      "Code": "K06",
      "Name": "West Falls Church-VT/UVA",
      "StationTogether1": "",
      "StationTogether2": "",
      "LineCode1": "OR",
      "LineCode2": null,
      "LineCode3": null,
      "LineCode4": null,
      "Lat": 38.90067,
      "Lon": -77.189394,
      "Address": {
        "Street": "7040 Haycock Road",
        "City": "Falls Church",
        "State": "VA",
        "Zip": "22043"
      },
      "stories": []
    }, {
      "Code": "K07",
      "Name": "Dunn Loring-Merrifield",
      "StationTogether1": "",
      "StationTogether2": "",
      "LineCode1": "OR",
      "LineCode2": null,
      "LineCode3": null,
      "LineCode4": null,
      "Lat": 38.883015,
      "Lon": -77.228939,
      "Address": {
        "Street": "2700 Gallows Road",
        "City": "Vienna",
        "State": "VA",
        "Zip": "22180"
      },
      "stories": []
    }, {
      "Code": "K08",
      "Name": "Vienna/Fairfax-GMU",
      "StationTogether1": "",
      "StationTogether2": "",
      "LineCode1": "OR",
      "LineCode2": null,
      "LineCode3": null,
      "LineCode4": null,
      "Lat": 38.877693,
      "Lon": -77.271562,
      "Address": {
        "Street": "9550 Saintsbury Drive",
        "City": "Fairfax",
        "State": "VA",
        "Zip": "22031"
      },
      "stories": []
    }, {
      "Code": "N01",
      "Name": "McLean",
      "StationTogether1": "",
      "StationTogether2": "",
      "LineCode1": "SV",
      "LineCode2": null,
      "LineCode3": null,
      "LineCode4": null,
      "Lat": 38.924478,
      "Lon": -77.210167,
      "Address": {
        "Street": "1824 Dolley Madison Boulevard",
        "City": "McLean",
        "State": "VA",
        "Zip": "22102"
      },
      "stories": []
    }, {
      "Code": "N02",
      "Name": "Tysons Corner",
      "StationTogether1": "",
      "StationTogether2": "",
      "LineCode1": "SV",
      "LineCode2": null,
      "LineCode3": null,
      "LineCode4": null,
      "Lat": 38.920056,
      "Lon": -77.223314,
      "Address": {
        "Street": "1943 Chain Bridge Road",
        "City": "McLean",
        "State": "VA",
        "Zip": "22102"
      },
      "stories": []
    }, {
      "Code": "N03",
      "Name": "Greensboro",
      "StationTogether1": "",
      "StationTogether2": "",
      "LineCode1": "SV",
      "LineCode2": null,
      "LineCode3": null,
      "LineCode4": null,
      "Lat": 38.919749,
      "Lon": -77.235192,
      "Address": {
        "Street": "8305 Leesburg Pike",
        "City": "Vienna",
        "State": "VA",
        "Zip": "22182"
      },
      "stories": []
    }, {
      "Code": "N04",
      "Name": "Spring Hill",
      "StationTogether1": "",
      "StationTogether2": "",
      "LineCode1": "SV",
      "LineCode2": null,
      "LineCode3": null,
      "LineCode4": null,
      "Lat": 38.929273,
      "Lon": -77.241988,
      "Address": {
        "Street": "1576 Spring Hill Road",
        "City": "Vienna",
        "State": "VA",
        "Zip": "22182"
      },
      "stories": []
    }, {
      "Code": "N06",
      "Name": "Wiehle-Reston East",
      "StationTogether1": "",
      "StationTogether2": "",
      "LineCode1": "SV",
      "LineCode2": null,
      "LineCode3": null,
      "LineCode4": null,
      "Lat": 38.947753,
      "Lon": -77.340179,
      "Address": {
        "Street": "1862 Wiehle Avenue",
        "City": "Reston",
        "State": "VA",
        "Zip": "20190"
      },
      "stories": []
    }]
  }
]

export default MainPage;
