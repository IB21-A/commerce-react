import { useEffect, useState } from "react";

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
  const [categories, setCategories] = useState(initialCategories);
  const [state, setState] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [pageNum, setPageNum] = useState(1);

  const fetchAuctions = async (pageNum, searchTerms) => {
    try {
      setError(false);
      setLoading(true);
      const auctions = await API.getActiveAuctions(
        pageNum,
        searchTerms.searchTerm,
        searchTerms.category
      );
      setState({ ...auctions.data });
    } catch (error) {
      setError(true);
    }
    setLoading(false);
  };

  const getCategories = async () => {
    const data = await API.getCategories();
    if (data && data.length > 1) setCategories(data);
  };

  useEffect(() => {
    setState(initialState);
    fetchAuctions(pageNum, searchTerms);
  }, [pageNum, searchTerms]);

  // @Used to submit a new search and reset the page # to 1
  const doNewSearch = (searchTerms) => {
    setPageNum(1);
    setSearchTerms(searchTerms);
  };

  // We only need to fetch categories once, they dont update
  useEffect(() => {
    getCategories();
  }, []);

  return {
    state,
    loading,
    error,
    doNewSearch,
    pageNum,
    setPageNum,
    categories,
  };
};
