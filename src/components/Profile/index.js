import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

// Hooks
import { useProfileFetch } from "../../hooks/useProfileFetch";
import { useAuth } from "../../hooks/useAuth";
// Styled Components
import { Wrapper } from "./Profile.styles";

// Components
import CardCarousel from "../CardCarousel";
import Spinner from "../common/Spinner";
import { Button } from "react-bootstrap";

const Profile = () => {
  const { userName } = useParams();
  const auth = useAuth();
  const user = auth.user;
  const { state, loading, error } = useProfileFetch(userName);
  const [isUsersProfile, setIsUsersProfile] = useState(false);
  const [activeListings, setActiveListings] = useState([]);
  const [closedListings, setClosedListings] = useState([]);
  const [watchedListings, setWatchedListings] = useState([]);
  const [wonListings, setWonListings] = useState([]);

  useEffect(() => {
    const getIsUsersProfile = () => {
      if (user && user.username.toLowerCase() === userName.toLowerCase()) {
        setIsUsersProfile(true);
      }
    };

    const getActiveListings = () => {
      const activeListings = state.listings.filter(
        (listing) => listing.is_active === true
      );
      setActiveListings(activeListings);
    };

    const getClosedListings = () => {
      const closedListings = state.listings.filter(
        (listing) => listing.is_active === false
      );
      setClosedListings(closedListings);
    };

    const getWatchedListings = () => {
      if (!isUsersProfile) {
        return;
      }

      const watchedListings = state.watchlist.filter(
        (listing) => listing.is_active === true
      );

      setWatchedListings(watchedListings);
    };

    getIsUsersProfile();
    getActiveListings();
    getClosedListings();
    getWatchedListings();
    return function cleanup() {
      setIsUsersProfile(false);
      setActiveListings([]);
      setClosedListings([]);
      setWatchedListings([]);
    };
  }, [state, user]);

  // @listingType is a string ("Active, Watched, Closed")
  const generateNoListingMessage = (type) => {
    let addressee = userName;
    if (isUsersProfile) {
      addressee = "you";
    }

    return (
      <>
        <span className="capitalize">{addressee}</span>{" "}
        {addressee === "you" ? "have" : "has"} no {type} listings
      </>
    );
  };

  return (
    <Wrapper className="max-width-margin">
      {loading && <Spinner />}
      {!loading && (
        <>
          <h1 className="text-capitalize">{state.username}'s Profile</h1>
          {isUsersProfile && (
            <div class="mb-2">
              <Link to="../listings/create/">
                <Button variant="primary">Create a new Listing</Button>
              </Link>
            </div>
          )}
          <div className="datarow">
            <h2>Active Listings</h2>
            {state.listings.length > 0 ? (
              <CardCarousel listings={activeListings} />
            ) : (
              <p>{generateNoListingMessage("active")}</p>
            )}
          </div>
          {isUsersProfile && (
            <div className="datarow">
              <h2>Watchlist</h2>

              {watchedListings.length > 0 ? (
                <CardCarousel listings={watchedListings} />
              ) : (
                <p>{generateNoListingMessage("watched")}</p>
              )}
            </div>
          )}
          <div className="datarow">
            <h2>Closed Listings</h2>
            {closedListings.length > 0 ? (
              <CardCarousel listings={closedListings} />
            ) : (
              <p>{generateNoListingMessage("closed")}</p>
            )}
          </div>
          {isUsersProfile && (
            <div className="datarow">
              <h2>Won Auctions</h2>
              {state.won.length > 0 ? (
                <CardCarousel listings={state.won} />
              ) : (
                <p>{generateNoListingMessage("won")}</p>
              )}
            </div>
          )}
        </>
      )}
    </Wrapper>
  );
};

export default Profile;
