import { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

function AuthProvider({ children }) {
 const [user, setUser] = useState(() => {
  const savedUser = localStorage.getItem("loggedInUser");

  return savedUser ? JSON.parse(savedUser) : null;
});
const login = (userData) => {
  setUser(userData);

  localStorage.setItem(
    "loggedInUser",
    JSON.stringify(userData)
  );
};

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider };
export default AuthContext;