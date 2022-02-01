import React, { useEffect, useState } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { FaRegStar, FaStar } from "react-icons/fa";
import API from "../../API";

import { HeartContainer, WatchButton } from "./WatchlistToggle.styles";
import { Button } from "react-bootstrap";

import { useNavigate, Link } from "react-router-dom";

const WatchlistToggle = ({ auctionId, isWatched, variant, isAuthorized }) => {
	const watching = isWatched;
	const navigate = useNavigate();
	const [isWatching, setIsWatching] = useState(false);

	useEffect(() => {
		setIsWatching(watching);
	}, [watching]);

	const handleClick = async () => {
		if (!isAuthorized) {
			return navigate(`/login/`);
		}
		// Send API call to update status with auctionId
		// Get the updated status and set state
		let status = await API.toggleWatchStatus(auctionId);
		if (status === true) {
			return setIsWatching(true);
		}
		return setIsWatching(false);
	};

	const getButtonText = () => {
		return isWatching ? "Remove from Watchlist" : "Add to Watchlist";
	};

	if (variant === "heartContainer") {
		return (
			<HeartContainer onClick={handleClick}>
				{isWatching ? <FaHeart className="active" /> : <FaRegHeart />}
			</HeartContainer>
		);
	}

	if (variant === "button") {
		return (
			<WatchButton onClick={handleClick}>
				<Button variant="secondary" className="custom-rounded mt-3">
					{isWatching ? (
						<FaStar className="icon" />
					) : (
						<FaRegStar className="icon" />
					)}{" "}
					{getButtonText()}
				</Button>
			</WatchButton>
		);
	}
};

export default WatchlistToggle;
