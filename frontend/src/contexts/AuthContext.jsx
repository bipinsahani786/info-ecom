import React, { createContext, useState, useContext } from 'react';

// 1. Create AuthContext
const AuthContext = createContext();

// 2. Create Provider
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Fake login function (later connect to API)
  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// 3. Create custom hook
export const useAuth = () => {
  return useContext(AuthContext);
};
