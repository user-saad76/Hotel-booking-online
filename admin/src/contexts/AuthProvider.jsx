import React, { createContext, useContext, useEffect, useState } from 'react';
import { useFetch } from '../hook/useFetch';

export const AuthContext = createContext();

function AuthProvider({ children }) {
  const { data, error, loading } = useFetch('http://localhost:7000/admin-user/me');
  const [adminUser, setAdminUser] = useState(null);

  useEffect(() => {
    // ✅ fixed variable name: setAdminUser instead of setUser
    if (data) setAdminUser(data);
  }, [data]);

  const logout = async () => {
    await fetch('http://localhost:7000/admin-user/logout', {
      method: 'POST',
      credentials: 'include',
    });
    setAdminUser(null);
    window.location.href = '/';
  };

  // ✅ fixed naming consistency
  return (
    <AuthContext.Provider value={{ adminUser, error, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);
