import { useEffect, useState } from "react";

import API from "../API";

const initialState = {
  creator: "",
  creator_id: "",
  title: "",
  description: "",
  start_bid: 0,
  creation_date: "",
  is_active: true,
  winner: null,
  category: "",
  image_url: "",
  comments: [],
  bids: [],
  num_of_bids: 0,
  num_of_unique_bids: 0,
  current_bid_price: 0,
  user_is_following: false,
};

export const useAuctionFetch = (listingId) => {
  const [state, setState] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const getAuctionById = async (listingId) => {
    if (!listingId) {
      return setState(initialState);
    }

    try {
      setError(false);
      setLoading(true);

      const auction = await API.getAuctionDetail(listingId);
      if (auction.status !== 200) {
        setError(true);
        return;
      }
      setState(auction.data);
    } catch (error) {
      setError(true);
    }
    setLoading(false);
  };

  useEffect(() => {
    getAuctionById(listingId);
  }, [listingId]);

  return { state, loading, error };
};
