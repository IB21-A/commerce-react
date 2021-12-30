import React, { useEffect, useState } from "react";

import API from "../API";

const initialState = {
	id: "",
	username: "",
	first_name: "",
	last_name: "",
	listings: [],
	comments: [],
	bids: [],
	watching: [],
};

export const useProfileFetch = (userName) => {
	const [state, setState] = useState(initialState);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);

	const getProfile = async (userName) => {
		if (!userName) {
			return setState(initialState);
		}

		try {
			setError(false);
			setLoading(true);

			const profile = await API.getProfileDetail(userName);
			await profile.data.listings.reverse();
			if (profile.status !== 200) {
				setError(true);
				return;
			}
			setState(profile.data);
		} catch (error) {
			setError(true);
		}
		setLoading(false);
	};

	useEffect(() => {
		getProfile(userName);
	}, [userName]);

	return { state, loading, error };
};
