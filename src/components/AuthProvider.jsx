// AuthContext.tsx
import { createContext, useContext, useState, ReactNode } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("loggedInUser") || "null")
  );

  const localSet = (user) => {
    localStorage.setItem("loggedInUser", JSON.stringify(user));
    setUser(user);
  };

  const login = (userData) => {
    localStorage.setItem("loggedInUser", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = (user) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const addDetailsTo = users.map((x) =>
      x?.email == user?.email
        ? {
            ...x,
            bag: user.bag,
            wishlist: user.wishlist,
            orders: user.orders,
            profile: user.profile,
            defaultAddress: user.defaultAddress,
            address:[...user.address],
          }
        : x
    );
    localStorage.setItem("users", JSON.stringify(addDetailsTo));
    localStorage.removeItem("loggedInUser");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, localSet, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
