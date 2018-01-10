import React from 'react';

import times from 'lodash/times';

import SearchBar from '../../search/search_bar';



const NewSpotP1 = ({ props }) => {

  // 1. What kind of place do you have?
  //   - Entire Place, Private Room, Shared Room
  //   - for n guests
  //   - Location search
const { user, userLocation } = props;
  return (
    <div className="new-spot-inner">
      <h1>
        Hi, {user.firstName}! Let's get started listing your space.
      </h1>
      <h3>STEP 1</h3>
      <h2>What kind of place do you have?</h2>
      <div className="new-spot-1">

        <select type="text">
          <option value="Entire place">Entire place</option>
          <option value="Private room">Private room</option>
          <option value="Shared room">Shared room</option>
        </select>

        <select type="text" defaultValue="for 4 guests">
          {
            times(16, (t) => {
              const text = `for ${t} guests `;
              return <option key={t} value={text}>{text}</option>
            })
          }
        </select>
        <SearchBar formProps={props} />
      </div>
    </div>
  )
}



export default NewSpotP1;
