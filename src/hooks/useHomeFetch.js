import React, { useEffect, useState } from "react";

import API from "../API";

const initialState = {
	count: 1,
	next: null,
	previous: null,
	total_pages: 1,
	results: [],
};

export const useHomeFetch = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [state, setState] = useState(initialState);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const [pageNum, setPageNum] = useState(1);

	const fetchAuctions = async (pageNum, searchTerm) => {
		try {
			setError(false);
			setLoading(true);
			const auctions = await API.getActiveAuctions(pageNum, searchTerm);
			setState({ ...auctions.data });
			// console.log("useHomeFetch", auctions.data);
		} catch (error) {
			setError(true);
			console.log(error);
		}
		setLoading(false);
	};

	useEffect(() => {
		setState(initialState);
		fetchAuctions(pageNum, searchTerm);
	}, [pageNum, searchTerm]);

	return { state, loading, error, setSearchTerm, pageNum, setPageNum };
};

// useEffect(() => {
//     const getAuctions = async () => {

//         return auctions;
//     };

//     getAuctions();
// }, []);
