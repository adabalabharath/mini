// AuthContext.tsx
import { createContext, useContext, useState, ReactNode } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("loggedInUser") || "null")
  );
  
  const localSet=(user)=>{
      localStorage.setItem("loggedInUser",JSON.stringify(user))
      setUser(user)
  }

  const login = (userData) => {
    localStorage.setItem("loggedInUser", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    console.log('logging out')
    localStorage.removeItem("loggedInUser");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user,localSet, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


