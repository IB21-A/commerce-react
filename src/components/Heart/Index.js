import React, { useEffect, useState } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";

import { Wrapper } from "./Heart.styles";

const Heart = ({ auctionId, isWatched }) => {
	const watching = isWatched;
	// console.log(auctionId, isWatched);
	const [isWatching, setIsWatching] = useState(false);

	useEffect(() => {
		setIsWatching(watching);
	}, [watching]);

	return (
		<Wrapper>
			{isWatching ? <FaHeart className="active" /> : <FaRegHeart />}
		</Wrapper>
	);
};

export default Heart;
