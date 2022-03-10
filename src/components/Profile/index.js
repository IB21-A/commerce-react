import React from "react";
import { useParams } from "react-router";

// Hooks
import { useProfileFetch } from "../../hooks/useProfileFetch";
// Styled Components
import { Wrapper } from "./Profile.styles";

// Components
import CardCarousel from "../CardCarousel";
import Spinner from "../common/Spinner";

const Profile = () => {
  const { userName } = useParams();
  const { state, loading, error } = useProfileFetch(userName);

  console.log(state);
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
              <CardCarousel listings={state.listings} />
            ) : (
              <p>
                <span className="capitalize">{userName}</span> has no listings
              </p>
            )}
          </div>
          <div className="datarow">
            <h2>Watchlist</h2>
            <CardCarousel listings={state.watchlist} />
          </div>
        </>
      )}
    </Wrapper>
  );
};

export default Profile;
