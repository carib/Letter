import React from 'react';
import { withRouter } from 'react-router-dom';

import times from 'lodash/times';

import { NewSpotP1 } from './spot_forms/new_spot_1';
import { NewSpotP2 } from './spot_forms/new_spot_2';

import SearchBar from '../search/search_bar';

class SpotForm extends React.Component {
  constructor(props) {
    super(props);
    this.update = this.update.bind(this);
    this.handleCLick = this.handleCLick.bind(this);
    this.handleRelay = this.handleRelay.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.userLocation = this.userLocation.bind(this);
    this.extractCoords = this.extractCoords.bind(this);
    this.mapValuesToState = this.mapValuesToState.bind(this);

    this.state = {
      description: 'New Listing!',
      spotType: 'Entire Place',
      coords: {
        lat: 0.0,
        lng: 0.0,
      },
      price: 0.00,
      currency: 'USD',
      city: '',
      state: '',
      country: '',
      occupancy: 0,
      userSpotLocationInput: '',
    };
  }

  handleCLick(e) {
    e.preventDefault();
    this.props.createSpot(this.state);
    this.props.history.push("/");
  }

  extractCoords(address) {
    const geo = new google.maps.Geocoder();
    let spotCoords;

    geo.geocode( { 'address': address }, (results, status) => {
      if (status == 'OK') {
        spotCoords = {
          lat: results[0].geometry.location.lat(),
          lng: results[0].geometry.location.lng(),
        };
      }

      this.setState({
        lat: spotCoords.lat,
        lng: spotCoords.lng,
        coords: spotCoords,
        userSpotLocationInput: address,
      });
    });
  }

  parseCoords(coords) {
    const geo = new google.maps.Geocoder();
    geo.geocode({ 'location': coords }, (results, status) => {
      if (status === 'OK') {
        const loc = results[0].address_components;
        console.log('parsecoords',loc);
        this.setState({
          country: loc[8].long_name,
          state: loc[5].long_name,
          city: loc[4].long_name,
        });
      }
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const address = document.getElementById('search-bar-input').value
    const coords = this.extractCoords(address);
    setTimeout(() => {
      this.parseCoords(this.state.coords)
    }, 1000);
    setTimeout(() => {
      this.handleRelay()
    }, 1);
  }

  mapValuesToState(values) {
    const newState = Object.assign({}, this.state, values);
    this.setState(newState);
  }

  update(field) {
    return e => {
      if (field === 'coords') {
        // debugger
        let coords = this.extractCoords(e.target.value);
        this.setState({ [field]: coords });
      } else {
        this.setState({ [field]: e.target.value });
      }
    };
  }

  userLocation() {
    let loc;
    navigator.geolocation.getCurrentPosition(pos => {
      loc = {
        lat: pos.coords.latitude,
        lng: pos.coords.longitude
      };
    });
    return loc;
  }

  spotFormRelay(formNum) {
    if (!formNum) formNum = "/new";
    const searchProps = {
      mapValuesToState: this.mapValuesToState,
      searchValues: this.state,
    };
    switch (formNum) {
      case "/new-2":
        <NewSpotP2/>
        break;
      default:
        return <NewSpotP1
          update={this.update}
          formProps={this.props}
          searchProps={searchProps}
          handleClick={this.handleRelay}
          handleSubmit={this.handleSubmit}
          extractCoords={this.extractCoords}
          userLocation={this.userLocation()}
          />
    }
  }

  handleRelay() {
    const { path } = this.props.match
    let nextNum;
    let formNum;
    if (path !== nextNum) {
      formNum = parseInt(path.slice(-1));
      nextNum = (`/new-${formNum + 1}` ||  '/new-1');
    }
    this.spotFormRelay(nextNum);
  }

  render() {
    console.log('main form',this.state);
    return this.spotFormRelay();
  }
}

export default withRouter(SpotForm);
//

// <form className="new-spot-main" onSubmit={this.handleSubmit}>
//   <NewSpotP1
//     formProps={this.props}
//     update={this.update}
//     handleSubmit={this.handleSubmit}
//     userLocation={this.userLocation()}
//     extractCoords={this.extractCoords}
//   />
//   <div className="new-spot-inner">
//     <div className="new-spot-headline">
//       Hi, {this.props.user.firstName}! Let's get started listing your space.
//     </div>
//     <div className="new-spot-step">STEP 1</div>
//     <div className="new-spot-question">What kind of place do you have?</div>
//     <div className="new-spot-inputs">
//       <select id="spot-type" className="select-spot-type" type="text" onChange={this.update('spotType')}>
//         <option value="Entire place">Entire place</option>
//         <option value="Private room">Private room</option>
//         <option value="Shared room">Shared room</option>
//       </select>
//
//       <select id="occupancy" className="select-occupancy" type="text" defaultValue="for 4 guests" onChange={this.update('occupancy')}>
//         {
//           times(16, (t) => {
//             const text = `for ${t} guests `;
//             return <option key={t} value={text}>{text}</option>
//           })
//         }
//       </select>
//       <SearchBar
//         formProps={this.props}
//         spotValues={this.state}
//         placeholder='New York, NY, US'
//         mapValuesToState={this.mapValuesToState}
//       />
//     <input className="new-spot-submit-button" type="submit" value="Continue" onClick={this.handleCLick}/>
//     </div>
//   </div>
// </form>

// 1. What kind of place do you have?
//   - Entire Place, Private Room, Shared Room
//   - for n guests
//   - Location search
// 2. What kind of place are you listing?
//   - Home, Hotel, Something Else?
//   - Type of property: Apartment, Condominium, House, etc
//   - What will guests have? (Entire place, private room, shared room)
//   - "Is this set up as a dedicated guest space?" -Yes -No
// 3. How many guests can your place accomodate?
//   - n Guests, 1-16+
//   - How many bedrooms can guests use? (Studio - 50 rooms)
//   - How many beds can guests use? 1 - ???
//   - Sleeping arrangements: Options component to describe sleeping sitch
// 4. How many bathrooms?
//   - 1 - ??
// 5. Where's your place located?
//   - Country
//   - Street Address
//   - Apt, Suite, Bldg. (optional)
//   - City
//   - State
//   - ZIP Code
// 6. Confirm map pin in correct location
// 7. What amenities do you offer?
//   - Essentials
//   - Towels, bed sheets, soap, and toilet paper
//   - Wifi
//   - Shampoo
//   - Closet/drawers
//   - TV
//   - Heat
//   - Air conditioning
//   - Breakfast, coffee, tea
//   - Desk/workspace
//   - Fireplace
//   - Iron
//   - Hair dryer
//   - Pets in the house
//   - Private entrance
//   - Safety amenities
//     - Smoke detector
//     - Check your local laws, which may require a working smoke detector in every room
//     - Carbon monoxide detector
//     - Check your local laws, which may require a working carbon monoxide detector in every room
//     - First aid kit
//     - Safety card
//     - Posted emergency information and resources
//     - Fire extinguisher
//     - Lock on bedroom door
//     - Private room can be locked for safety and privacy
// 8. What spaces can guests use?
//   - Pool
//   - Kitchen
//   - Laundry – washer
//   - Laundry – dryer
//   - Parking
//   - Elevator
//   - Hot tub
//   - Gym
