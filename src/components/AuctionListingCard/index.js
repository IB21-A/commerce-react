import React from "react";

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
  return (
    <Wrapper>
      <ThumbnailContainer>
        <Link to={`/listings/${auction.id}`}>
          <Thumbnail src={auction.image_url} />
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
