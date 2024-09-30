import React, { createContext, useState, useEffect } from "react";
import { UserData } from "../components/dummy-data/dummy-data";
import { UserData } from "../components/dummy-data/dummy-data";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedUser = localStorage.getItem("user");
    if (loggedUser) {
      setUser(JSON.parse(loggedUser));
    }
  }, []);

  // Function to update user data
  const login = () => {
    setUser(UserData);
    //   setUser(userData);
    localStorage.setItem("user", JSON.stringify(UserData)); // Save to localStorage
  };

  // Function to log out the user
  const logout = () => {
    setUser(null);
    //   setUser(null);
    localStorage.removeItem("user"); // Remove from localStorage
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
