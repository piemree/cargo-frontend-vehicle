import React, { useState, useEffect, useContext } from 'react';
import GlobalContex from 'src/contex';
import jwt_decode from 'jwt-decode';

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useGlobals().
export function ProvideGlobals({ children }) {
  const values = useProvideGlobal();
  return (
    <GlobalContex.Provider value={values}>{children}</GlobalContex.Provider>
  );
}
// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useGlobals = () => {
  return useContext(GlobalContex);
};
// Provider hook that creates auth object and handles state
export function useProvideGlobal() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sidebar, setSidebar] = useState(false);

  const getUser = () => {
    const token = localStorage.getItem('token');
    if (!token) return null;
    const decoded = jwt_decode(token);
    return decoded;
  };

  useEffect(() => {
    if (!localStorage.getItem('token')) return;
    const token = localStorage.getItem('token');
    const decoded = jwt_decode(token);
    setToken(token);
    setUser(decoded);
  }, []);

  return {
    user,
    setUser,
    loading,
    setLoading,
    sidebar,
    setSidebar,
    token,
    setToken,
    getUser,
  };
}
