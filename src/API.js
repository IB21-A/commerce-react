import axiosInstance from "./axios";
import jwtDecode from "jwt-decode";

const apiSettings = {
  register: async (data) => {
    const res = await axiosInstance
      .post(`/users/register/`, {
        email: data.email,
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
        console.log(ex.response.data);
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
      return [];
    }
  },
  getActiveAuctions: async (page, searchTerm, category) => {
    try {
      let endpoint = `listings/?page=${page}&is_active=True`;
      if (searchTerm) endpoint += `&search=${searchTerm}`;
      if (category && category !== "0") endpoint += `&category=${category}`;

      let auctions = await axiosInstance.get(endpoint);
      // console.log("API.getActiveAuctions", auctions.data);
      return auctions;
    } catch (ex) {
      return ex;
    }
  },
  getProfileDetail: async (userId) => {
    try {
      let profile = await axiosInstance.get(`users/${userId}/`);
      return profile;
    } catch (ex) {
      return ex;
    }
  },
  getAuctionDetail: async (listingId) => {
    try {
      let auctionDetail = await axiosInstance.get(`listings/${listingId}/`);

      return auctionDetail;
    } catch (ex) {
      return ex;
    }
  },
  getCommentsByListingId: async (listingId) => {
    // try {
    //   let listing = await axiosInstance.get(`listings/${listingId}/`);

    //   return listing.data.comments;
    // } catch (ex) {
    //   return ex;
    // }
    return;
  },
  getWatchList: async (userId) => {
    try {
      let watchList = await axiosInstance.get(`users/${userId}/watchlist`);
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
  submitComment: async (auctionId, commentBody) => {
    const comment = await axiosInstance
      .post(`comments/`, {
        listing_id: auctionId,
        body: commentBody,
      })
      .catch((error) => {
        console.log(error.response);
        return error.response;
      });
    if (comment.status === 201) {
      console.log("Success!");
      return comment.data;
    }
    return comment;
  },
  createListing: async (data) => {
    let form_data = generateListingFormData(data);

    const listing = await axiosInstance
      .post(`listings/`, form_data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        return res;
      })
      .catch((error) => {
        return error.response;
      });

    if (listing.status === 201) {
      window.location.href = `/listings/${listing.data.id}`;
    }
    return listing;
  },
  editListing: async (listingId, data) => {
    let form_data = generateListingFormData(data);

    const listing = await axiosInstance
      .put(`listings/${listingId}/`, form_data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
        return res;
      })
      .catch((error) => {
        return error.response;
      });

    if (listing.status === 200) {
      window.location.href = `/listings/${listing.data.id}`;
    }
    return listing;
  },
  closeListing: async (listingId) => {
    const form_data = new FormData();
    form_data.append("is_active", false);

    const listing = await axiosInstance
      .patch(`listings/${listingId}/`, form_data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
        return res;
      })
      .catch((error) => {
        return error.response;
      });

    if (listing.status === 200) {
      window.location.href = `/listings/${listing.data.id}`;
    }
    return listing;
  },
};

const generateListingFormData = (data) => {
  const form_data = new FormData();
  if (data.image_url && data.image_url instanceof File)
    form_data.append("image_url", data.image_url, data.image_url.name);
  form_data.append("title", data.title);
  form_data.append("description", data.description);
  form_data.append("category", data.category);
  form_data.append("start_bid", data.start_bid);
  form_data.append("is_active", true);
  return form_data;
};

export default apiSettings;
