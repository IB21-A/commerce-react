import axiosInstance from "./axios";
import jwtDecode from "jwt-decode";

const apiSettings = {
	register: async (data) => {
		console.log(data.email);
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
};

export default apiSettings;
