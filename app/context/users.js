import React, { useState, createContext, useEffect } from "react";
import axios from "axios";
import { API } from "../config/baseUrl";

// create context
const AuthContext = createContext([{}, function () {}]);

// context provider
const UsersProvider = ({ children }) => {
  // config axios
  axios.defaults.baseURL = API;
  // axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  return (
    <AuthContext.Provider value={[state, setState]}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, UsersProvider };
