import { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

function AuthProvider({ children }) {
 const [user, setUser] = useState(() => {
  const savedUser = localStorage.getItem("loggedInUser");

  return savedUser ? JSON.parse(savedUser) : null;
});
const login = (userData, token) => {
  setUser(userData);

  localStorage.setItem(
    "loggedInUser",
    JSON.stringify(userData)
  );

  localStorage.setItem("token", token);
};

  const logout = () => {
  setUser(null);

  localStorage.removeItem("loggedInUser");
  localStorage.removeItem("token");
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