import React, { useEffect, useState } from "react";

import API from "../API";

const initialState = {
  count: 1,
  next: null,
  previous: null,
  total_pages: 1,
  results: [],
};

const initialCategories = [{ id: 0, name: "", listings: [] }];

const initialSearchTerms = { searchTerm: "", category: 0 };

export const useHomeFetch = () => {
  const [searchTerms, setSearchTerms] = useState(initialSearchTerms);
  const [currentCategory, setCurrentCategory] = useState(initialCategories);
  const [categories, setCategories] = useState(initialCategories);
  const [state, setState] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [pageNum, setPageNum] = useState(1);

  const fetchAuctions = async (pageNum, searchTerms) => {
    console.log(searchTerms);
    try {
      setError(false);
      setLoading(true);
      const auctions = await API.getActiveAuctions(
        pageNum,
        searchTerms.searchTerm,
        searchTerms.category
      );
      setState({ ...auctions.data });
      // console.log("useHomeFetch", auctions.data);
    } catch (error) {
      setError(true);
      console.log(error);
    }
    setLoading(false);
  };

  const getCategories = async () => {
    const data = await API.getCategories();
    setCategories(data);
  };

  useEffect(() => {
    setState(initialState);
    fetchAuctions(pageNum, searchTerms);
  }, [pageNum, searchTerms]);

  // We only need to fetch categories once, they dont update
  useEffect(() => {
    getCategories();
  }, []);

  return {
    state,
    loading,
    error,
    setSearchTerms,
    pageNum,
    setPageNum,
    categories,
    currentCategory,
    setCurrentCategory,
  };
};

// useEffect(() => {
//     const getAuctions = async () => {

//         return auctions;
//     };

//     getAuctions();
// }, []);
