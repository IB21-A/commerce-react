import React from "react";

// Components
import WatchlistToggle from "../WatchlistToggle/Index";
import { Link } from "react-router-dom";

// Styles
import {
	ThumbnailContainer,
	Thumbnail,
	Wrapper,
	InfoContainer,
	Title,
	Price,
} from "./AuctionListingCard.styles";
const AuctionListingCard = ({ auction }) => {
	let myAuction = {
		id: 36,
		title: "Auction Title",
		current_bid_price: 49.99,
		image_url: "http://172.24.1.189:8000/media/images/Salchipapas.jpg",
	};
	console.log(auction);

	return (
		<Wrapper>
			<ThumbnailContainer>
				<Link to={`/listings/${auction.id}`}>
					<Thumbnail src={"http://172.24.1.189:8000" + auction.image_url} />
				</Link>
			</ThumbnailContainer>
			<InfoContainer>
				<Link to={`/listings/${auction.id}`}>
					<Title>{auction.title}</Title>
				</Link>
				<Price>${auction.current_bid_price.toFixed(2)}</Price>
			</InfoContainer>
		</Wrapper>
	);
};

export default AuctionListingCard;
