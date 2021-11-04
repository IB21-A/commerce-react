import React, { useEffect, useState } from "react";

import API from "../API";

const initialState = {
	page: 1,
	results: [],
};

export const useHomeFetch = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [state, setState] = useState(initialState);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);

	const fetchAuctions = async (page, searchTerm = "") => {
		try {
			setError(false);
			setLoading(false);

			const auctions = await API.getActiveAuctions();
			setState({ results: [...auctions.data.results] });
		} catch (error) {
			setError(true);
			console.log(error);
		}
		setLoading(false);
	};

	useEffect(() => {
		setState(initialState);
		fetchAuctions(1, searchTerm);
	}, []);

	return { state, loading, error };
};

// useEffect(() => {
//     const getAuctions = async () => {

//         return auctions;
//     };

//     getAuctions();
// }, []);
