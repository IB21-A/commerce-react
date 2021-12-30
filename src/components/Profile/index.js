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

	return (
		<Wrapper className="max-width-padding">
			{loading && <Spinner />}
			{!loading && (
				<>
					<h1 className="text-capitalize">{state.username}'s Profile</h1>
					<p>Image can go here</p>
					<p>We'll add some tables for auctions, watchlists, etc.</p>
					<h2>Active Listings</h2>
					<CardCarousel listings={state.listings} />
				</>
			)}
		</Wrapper>
	);
};

export default Profile;
