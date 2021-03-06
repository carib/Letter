import React from 'react';

import times from 'lodash/times';

import BookBox from './booking_box/booking_box';

class SpotShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      spot: this.props.spot,
      spotDetails: this.props.spotDetails,
    };
  }

  componentDidMount() {
    this.props.fetchSpot(this.props.match.params.spotId);
    document.addEventListener('scroll', this.handleScroll);
  }

  handleScroll() {
    const bookBox = $('.spot-show-book-box');
    // const bookBox = document.getElementsByClassName('spot-show-book-box')[0];
    if (window.scrollY > 632) {
      bookBox.addClass('fixbox');
      // bookBox.classList.add('fixbox');
    } else {
      bookBox.removeClass('fixbox');
      // bookBox.classList.remove('fixbox');
    }
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      spot: newProps.spot,
      spotDetails: newProps.spotDetails,
      host: newProps.host,
    });
  }

  quickKeyHelper(itemNum, itemNoun) {
    itemNum = (itemNum < 1) ? 0 : itemNum;
    itemNoun = (itemNum > 1) ? `${itemNoun}s` : itemNoun;
    return [itemNum, itemNoun]
  }

  hostAvatar() {
    if (this.state.host && this.state.host.imageThumbUrl) {
      return <img src={this.state.host.imageThumbUrl}></img>
    } else {
      return <div className=""><i className="fa fa-user-circle"></i></div>
    }
  }

  render() {
    const { spot, spotDetails, host } = this.state;
    const { createBooking } = this.props;
    if (this.state.spot) {
      const occupancy = this.quickKeyHelper(spot.occupancy, "guest");
      const rooms = this.quickKeyHelper(spotDetails.rooms, "room");
      const beds = this.quickKeyHelper(spotDetails.beds, "bed");
      const baths = this.quickKeyHelper(spotDetails.baths, "bath");
      let stars;
      if (spot.averageRating) {
        stars = times(spot.averageRating, (t) => {
          return (<i className="fas fa-star" key={t}></i>)
        });
      }
      const hostImage = this.hostAvatar();
      const blurb = spotDetails.blurb;
      let heroImage = (spot.imageFullUrl.match('missing.png')) ? null : spot.imageFullUrl;

      return (
        <div className="spot-show-main">
          <section className="spot-hero-container">
            <img src={ heroImage } className="spot-hero"></img>
          </section>
          <section className="spot-show-details">
            <nav className="spot-show-nav">
              <ul className="spot-show-nav-list">
                <li className="spot-show-nav-list-item">Overview </li> ·
                <li className="spot-show-nav-list-item">Reviews</li> ·
                <li className="spot-show-nav-list-item">The Host</li> ·
                <li className="spot-show-nav-list-item">Location</li>
              </ul>
            </nav>
            <section className="spot-show-description">
              <div className="spot-show-info-container">
                <div className="spot-show-type">{spot.spotType}</div>
                <div className="spot-show-headline">{spot.description}</div>
                <div className="spot-show-location">{spotDetails.city}</div>
                <div className="spot-show-quick-key">
                  <div className="spot-show-key-item-occupancy">
                    <i className="fas fa-users"></i>
                    {`${occupancy[0]} ${occupancy[1]}`}
                  </div>
                <div className="spot-show-key-item-rooms">
                  <i className="fas fa-home"></i>
                  {`${rooms[0]} ${rooms[1]}`}
                </div>
              <div className="spot-show-key-item-beds">
                <i className="fas fa-bed"></i>
                {`${beds[0]} ${beds[1]}`}
              </div>
            <div className="spot-show-key-item-baths">
              <i className="fas fa-bath"></i>
              {`${baths[0]} ${baths[1]}`}
            </div>
                </div>
              </div>
              <div className="spot-show-host-avatar">{hostImage}</div>
            </section>
            <div className="spot-show-section-head">The Space</div>
            <section className="spot-show-blurb">
              {blurb}
            </section>
            <div className="spot-show-divider"></div>
            <div className="spot-show-section-head">Amenities</div>
            <div className="spot-show-amenities">
              <div className="amenity-icon">
                <i className="fas fa-wifi"></i>
              </div>
              <div className={(spotDetails.internet) ? "spot-show-amenity" : "spot-show-amenity strike"}>
                Internet
              </div>
              <div className="amenity-icon">
                <i className="fas fa-utensils"></i>
              </div>
              <div className={(spotDetails.kitchen) ? "spot-show-amenity" : "spot-show-amenity strike"}>
                Kitchen
              </div>
              <div className="amenity-icon">
                <i className="fas fa-tree"></i>
              </div>
              <div className={(spotDetails.outdoor_area) ? "spot-show-amenity" : "spot-show-amenity strike"}>
                Outdoor Area
              </div>
              <div className="amenity-icon">
                <i className="fas fa-tint"></i>
              </div>
              <div className={(spotDetails.laundry) ? "spot-show-amenity" : "spot-show-amenity strike"}>
                Laundry
              </div>
              <div className="amenity-icon">
                <i className="fas fa-car"></i>
              </div>
              <div className={(spotDetails.parking) ? "spot-show-amenity" : "spot-show-amenity strike"}>
                Parking
              </div>
              <div className="amenity-icon">
                <i className="fas fa-paw"></i>
              </div>
              <div className={(spotDetails.pets) ? "spot-show-amenity" : "spot-show-amenity strike"}>
                Pets
              </div>
              <div className="amenity-icon">
                <i className="fas fa-tv"></i>
              </div>
              <div className={(spotDetails.tv) ? "spot-show-amenity" : "spot-show-amenity strike"}>
                Tv
              </div>
            </div>
            <BookBox
              spot={spot}
              spotDetails={spotDetails}
              host={host}
              stars={stars}
              createBooking={createBooking}
            />
          </section>
        </div>
      )
    } else {
      return null
    }
  }
}

export default SpotShow;
