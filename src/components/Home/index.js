import React, { useState, useEffect } from "react";



// Styled Component
import { Wrapper } from "./Home.styles";
// Bootstrap Components

// Validation
import { useAuth } from "../../hooks/useAuth";
import { useHomeFetch } from './../../hooks/useHomeFetch';

//components
import Spinner from '../common/Spinner';
import AuctionListing from "../AuctionListing";
import API from "../../API";

const Home = () => {
	const auth = useAuth();
	const user = auth.user;
	const { state, loading, error } = useHomeFetch();
	const [watchlist, setWatchlist] = useState([]);

	return (
		<>
			{loading && <Spinner />}
			<Wrapper>
				Welcome {user && user.username}!
				{state.results.map((auction) => (
					<AuctionListing
						key={auction.id}
						auction={auction}
						isWatched={auction.user_is_following}
					/>
				))}
			</Wrapper>
		</>
	);
};

export default Home;
