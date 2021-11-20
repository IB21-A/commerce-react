import React, { useEffect, useState } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import API from "../../API";

import { Wrapper } from "./Heart.styles";

const Heart = ({ auctionId, isWatched }) => {
	const watching = isWatched;
	// console.log(auctionId, isWatched);
	const [isWatching, setIsWatching] = useState(false);

	useEffect(() => {
		setIsWatching(watching);
	}, [watching]);

	const handleClick = async () => {
		// Send API call to update status with auctionId
		// Get the updated status and set state
		let status = await API.toggleWatchStatus(auctionId);
		if (status === true) {
			return setIsWatching(true);
		}
		return setIsWatching(false);
	};

	return (
		<Wrapper onClick={handleClick}>
			{isWatching ? <FaHeart className="active" /> : <FaRegHeart />}
		</Wrapper>
	);
};

export default Heart;
