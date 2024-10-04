import React, { createContext, useState, useEffect } from "react";
// import { UserData } from "../components/dummy-data/dummy-data";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedUser = localStorage.getItem("user");
    if (loggedUser) {
      setUser(JSON.parse(loggedUser));
    }
  }, []);

  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
  }, [user]);

  // Function to update user data
  const login = ({ userData }) => {
    if (!userData || user === undefined) {
      console.log("User is not valid");
      return;
    }
    setUser(userData);
    //   setUser(userData);
    // localStorage.setItem("user", JSON.stringify(userData)); // Save to localStorage
  };

  // Function to log out the user
  const logout = () => {
    setUser(null);
    //   setUser(null);
    // localStorage.removeItem("user"); // Remove from localStorage
  };

  return (
    <UserContext.Provider value={{ user, login, logout, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
