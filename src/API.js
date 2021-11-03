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
				"JWT " + localStorage.getItem("access_token");
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
};

export default apiSettings;
