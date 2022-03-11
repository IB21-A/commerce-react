import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

// Hooks
import { useProfileFetch } from "../../hooks/useProfileFetch";
import { useAuth } from "../../hooks/useAuth";
// Styled Components
import { Wrapper } from "./Profile.styles";

// Components
import CardCarousel from "../CardCarousel";
import Spinner from "../common/Spinner";

const Profile = () => {
  const { userName } = useParams();
  const auth = useAuth();
  const user = auth.user;
  const { state, loading, error } = useProfileFetch(userName);
  const [isUsersProfile, setIsUsersProfile] = useState(false);
  const [activeListings, setActiveListings] = useState([]);
  const [closedListings, setClosedListings] = useState([]);
  const [watchedListings, setWatchedListings] = useState([]);

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
      console.log("Get watched listings");
      if (!isUsersProfile) {
        return;
      }

      console.log("Filtering Watched Listings");
      // console.log(state.watchlist);
      const watchedListings = state.watchlist.filter(
        (listing) => listing.is_active === true
      );
      console.log("Setting Watched Listings");
      console.log(watchedListings);
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
          <p>Image can go here</p>
          <p>We'll add some tables for auctions, watchlists, etc.</p>
          <div className="datarow">
            <h2>Active Listings</h2>
            {state.listings.length > 0 ? (
              <CardCarousel
                listings={state.listings.filter(
                  (listing) => listing.is_active === true
                )}
              />
            ) : (
              <p>
                <span className="capitalize">{userName}</span> has no listings
              </p>
            )}
          </div>
          {isUsersProfile && (
            <div className="datarow">
              <h2>Watchlist</h2>
              {/* TODO If Watchlist is Empty- Show "You are not watching any active items" */}
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
        </>
      )}
    </Wrapper>
  );
};

export default Profile;
