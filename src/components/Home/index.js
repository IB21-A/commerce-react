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
import SearchBar from "../SearchBar";

import API from "../../API";

const Home = () => {
	const auth = useAuth();
	const user = auth.user;
	const { state, loading, error, setSearchTerm } = useHomeFetch();
	const [watchlist, setWatchlist] = useState([]);

	useEffect(() => {
		console.log("home");
		console.log(state);
	}, [state]);

	return (
		<>
			<SearchBar setSearchTerm={setSearchTerm} />
			{loading && <Spinner />}
			<Wrapper>
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
