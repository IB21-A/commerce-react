import axiosInstance from "./axios";
import jwtDecode from "jwt-decode";

const apiSettings = {
	register: async (data) => {
		const res = await axiosInstance
			.post(`/users/register/`, {
				// email: data.email,
				username: data.username,
				first_name: data.first_name,
				last_name: data.last_name,
				password: data.password,
				password_repeat: data.password_repeat,
			})
			.catch((error) => {
				return error.response.data;
			});

		if (res.status === 201) {
			console.log("Success! created user");
			return res;
		}

		return res;
	},
	login: async (data) => {
		try {
			const res = await axiosInstance.post(`users/token/`, {
				username: data.username,
				password: data.password,
			});

			localStorage.setItem("access_token", res.data.access);
			localStorage.setItem("refresh_token", res.data.refresh);
			axiosInstance.defaults.headers["Authorization"] =
				"Bearer " + localStorage.getItem("access_token");
			let user = jwtDecode(res.data.access); // Decode the token and get user payload data
			return user;
		} catch (ex) {
			if (ex.response) {
				return ex.response.data;
			}
		}
	},
	logout: async () => {
		try {
			localStorage.removeItem("access_token");
			localStorage.removeItem("refresh_token");
			window.location.href = "/login";
		} catch (ex) {
			return { error: "Something went wrong!" };
		}
	},
	getCurrentUsername: async () => {
		try {
			let jwt = await jwtDecode(localStorage.getItem("access_token"));
			const formattedUsername =
				jwt.username.charAt(0).toUpperCase() +
				jwt.username.slice(1).toLowerCase();
			return formattedUsername; // return username
		} catch (ex) {
			return "";
		}
	},
	getCategories: async () => {
		try {
			let categories = await axiosInstance.get(`categories/`);
			return categories.data;
		} catch (ex) {
			return ex;
		}
	},
	getActiveAuctions: async (page, searchTerm) => {
		try {
			const endpoint = searchTerm
				? `listings/?page=${page}&search=${searchTerm}`
				: `listings/?page=${page}`;
			let auctions = await axiosInstance.get(endpoint);
			// console.log(auctions.data);
			return auctions;
		} catch (ex) {
			return ex;
		}
	},
	getAuctionDetail: async (listingId) => {
		try {
			let auctionDetail = await axiosInstance.get(`listings/${listingId}/`);
			console.log(auctionDetail);
			return auctionDetail;
		} catch (ex) {
			return ex;
		}
	},
	getWatchList: async (userId) => {
		try {
			let watchList = await axiosInstance.get(`users/${userId}/watchlist`);
			let array = Object.values(watchList.data);
			return Object.values(watchList.data);
		} catch (ex) {
			return ex;
		}
	},
	toggleWatchStatus: async (auctionId) => {
		let watchStatus = await axiosInstance.post(`watching/`, {
			listing_id: auctionId,
		});
		if (watchStatus.status === 201) {
			return true;
		}
		return false;
	},
	submitBid: async (auctionId, bidAmount) => {
		const bid = await axiosInstance
			.post(`bids/`, {
				listing_id: auctionId,
				bid_amount: bidAmount,
			})
			.catch((error) => {
				console.log(error.response);
				return error.response;
			});

		if (bid.status === 201) {
			return bid.data;
		}
		return bid;
	},
};

export default apiSettings;
