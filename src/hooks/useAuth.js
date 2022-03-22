import React, { useState, useEffect, useContext, createContext } from "react";
import jwtDecode from "jwt-decode";

import API from "../API";
import { useNavigate } from "react-router-dom";

const authContext = createContext();

// https://usehooks.com/useAuth/

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

// Hook for child components to get the auth object and re-render when it changes
export const useAuth = () => {
  return useContext(authContext);
};

// provider hook that creates auth object and handles state
export function useProvideAuth() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // provide data.username and data.password
  const login = async (data) => {
    try {
      const response = await API.login(data);
      if (response.status === 401) {
        return response.data;
      }

      setUser(response.data);
      navigate("/");
    } catch (error) {
      return error;
    }
  };

  const logout = async () => {
    setUser(null);
    await API.logout();
    navigate("/login");
  };

  const getUsername = async () => {
    return await API.getCurrentUsername();
  };

  // Subscribe to user on mount
  // Because this sets state in the callback it will cause any ...
  // ... component that utilizes this hook to re-render with the ...
  // ... latest auth object.
  useEffect(() => {
    const unsubscribe = () => {
      try {
        let token = localStorage.getItem("access_token");
        setUser(jwtDecode(token));
      } catch (ex) {
        setUser(null);
        return;
      }
    };

    const checkUser = async () => {
      try {
        let token = await localStorage.getItem("access_token");
        setUser(jwtDecode(token));
      } catch (ex) {
        setUser(null);
        return;
      }
    };

    checkUser();
    // Cleanup subscription on unmount
    return () => unsubscribe;
  }, []);

  return { user, login, logout, getUsername };
}
