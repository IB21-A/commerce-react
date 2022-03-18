import React from "react";

// Components
import WatchlistToggle from "../WatchlistToggle/Index";
import { Link } from "react-router-dom";

// Styles
import {
  Container,
  ThumbnailContainer,
  Thumbnail,
  Wrapper,
  ListingDetails,
  Title,
  Description,
  Price,
} from "./AuctionListingRow.styles";
const AuctionListing = ({ auction, isWatched, isAuthorized }) => {
  return (
    <Wrapper>
      <Container className="theContainer">
        <ThumbnailContainer className="theThumbnailContainer">
          <Thumbnail src={auction.image_url} />
        </ThumbnailContainer>
        <ListingDetails className="theListingDetails">
          <Link to={`/listings/${auction.id}`}>
            <Title>{auction.title}</Title>
          </Link>
          <Description>{auction.description}</Description>
          <Price>${auction.current_bid_price.toFixed(2)}</Price>
          <WatchlistToggle
            variant="heartContainer"
            auctionId={auction.id}
            isWatched={isWatched}
            isAuthorized={isAuthorized}
          />
        </ListingDetails>
      </Container>
      <hr />
    </Wrapper>
  );
};

export default AuctionListing;
