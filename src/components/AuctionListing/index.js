import React from "react";

// Components
import WatchlistToggle from "../WatchlistToggle/Index";
import { Link } from "react-router-dom";

// Styles
import {
	Container,
	ThumbnailContainer,
	Wrapper,
	ListingDetails,
	Title,
	Description,
	Price,
} from "./AuctionListing.styles";
const AuctionListing = ({ auction, isWatched }) => {
	return (
		<Wrapper>
			<Container>
				<ThumbnailContainer src={auction.image_url} />
				<ListingDetails>
					<Link to={`/listings/${auction.id}`}>
						<Title>{auction.title}</Title>
					</Link>
					<Description>{auction.description}</Description>
					<Price>${auction.current_bid_price.toFixed(2)}</Price>
					<WatchlistToggle
						variant="heartContainer"
						auctionId={auction.id}
						isWatched={isWatched}
					/>
				</ListingDetails>
			</Container>
			<hr />
		</Wrapper>
	);
};

export default AuctionListing;
