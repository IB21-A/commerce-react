import React from "react";
// Assets
import noImage from "../../assets/no-image.gif";
// Components
import Heart from "../Heart/Index";

// Styles
import {
	Container,
	ThumbnailContainer,
	Wrapper,
	ListingDetails,
	Title,
	Description,
	Price,
	HeartContainer,
} from "./AuctionListing.styles";
const AuctionListing = ({ auction, isWatched }) => {
	return (
		<Wrapper>
			<Container>
				<ThumbnailContainer src={noImage} />
				<ListingDetails>
					<Title>{auction.title}</Title>
					<Description>{auction.description}</Description>
					<Price>${auction.current_bid_price.toFixed(2)}</Price>
					<HeartContainer>
						<Heart auctionId={auction.id} isWatched={isWatched}></Heart>
					</HeartContainer>
				</ListingDetails>
			</Container>
			<hr />
		</Wrapper>
	);
};

export default AuctionListing;
