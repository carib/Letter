import React from 'react';
import { Link, Redirect } from 'react-router-dom';

const SpotIndexItem = ({ spot }) => {
  return (
    <div>
      <li className="spot-item">
        <ul className="nested-spot-list">

          <li
            className="nested-spot-item">
            Latitude: {spot.lat}</li>
          <li
            className="nested-spot-item">
            Longitude: {spot.lng}</li>

        </ul>

      </li>
      Spot: Description!
    </div>
  )
}

export default SpotIndexItem;