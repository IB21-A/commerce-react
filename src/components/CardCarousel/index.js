import React from "react";
import {
	CarouselProvider,
	Slider,
	Slide,
	ButtonBack,
	ButtonNext,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";

import { Wrapper } from "./CardCarousel.styles";

import AuctionListingCard from "../AuctionListingCard";

const CardCarousel = ({ listings }) => {
	const totalListings = listings.length;

	return (
		<Wrapper>
			<CarouselProvider
				naturalSlideWidth={30}
				naturalSlideHeight={43}
				isIntrinsicHeight={true}
				totalSlides={totalListings}
				visibleSlides={4}>
				<Slider>
					{listings.map((listing, index) => (
						<Slide key={index} index={index}>
							<AuctionListingCard auction={listing} />
						</Slide>
					))}
				</Slider>
				<ButtonBack>Back</ButtonBack>
				<ButtonNext>Next</ButtonNext>
			</CarouselProvider>
		</Wrapper>
	);
};

export default CardCarousel;
