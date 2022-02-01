import React, { useState, useEffect } from "react";



// Styled Component
import { Wrapper, ListingsContainer } from "./Home.styles";
// Bootstrap Components

// Validation
import { useAuth } from "../../hooks/useAuth";
import { useHomeFetch } from "./../../hooks/useHomeFetch";

//components
import Spinner from "../common/Spinner";
import AuctionListingRow from "../AuctionListingRow";
import SearchBar from "../SearchBar";
import Paginator from "../common/Paginator";

import API from "../../API";

const Home = () => {
	const auth = useAuth();
	const user = auth.user;
	const { state, loading, error, setSearchTerm, pageNum, setPageNum } =
		useHomeFetch();

	useEffect(() => {
		// console.log("home");
		// console.log(state);
	}, [state]);

	return (
		<>
			<SearchBar setSearchTerm={setSearchTerm} />
			{loading && <Spinner />}
			<Wrapper className="max-width-margin">
				<ListingsContainer>
					{state.results.map(
						(auction) =>
							auction.is_active && (
								<AuctionListingRow
									key={auction.id}
									auction={auction}
									isWatched={auction.user_is_following}
									isAuthorized={auth.user}
								/>
							)
					)}
				</ListingsContainer>
				<Paginator
					totalPages={state.total_pages}
					currentPage={pageNum}
					setCurrentPage={setPageNum}
				/>
			</Wrapper>
		</>
	);
};

export default Home;
