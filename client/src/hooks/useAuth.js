import React, { useState } from 'react';
import { createContext, useContextSelector } from 'use-context-selector';
import API from '../utils/API';

const AuthContext = createContext(null);

export const storageKey = 'token';

const defaultState = {
  token: localStorage.getItem(storageKey),
  isAuthenticated: false,
  currentUser: null,
  isAdmin: false,
}

export const AuthModule = (props) => {
  const { children } = props;

  const [state, setState] = useState(defaultState);

  const actions = {
    setUser: (data) => {
      setState({
        token: data.token,
        currentUser: { email: data.email },
        isAuthenticated: true,
        isAdmin: data.role === "admin",
      });
      localStorage.setItem(storageKey, data.token);
    },
    clearUser: () => {
      setState(defaultState);
      localStorage.removeItem(storageKey);
    },
    loadUser: async () => {
      try {
        const response = await API.loadUser();
        if (response.status === 200) {
          setState(oldState => ({
            ...oldState,
            currentUser: { email: response.data.email },
            isAuthenticated: true,
            isAdmin: response.data.role === "admin",
          }));
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <AuthContext.Provider value={{ state, actions }}>
      {children}
    </AuthContext.Provider>
  )
};

export const useAuthActions = () => {
  const context = useContextSelector(AuthContext, context => context.actions);

  if (!context) {
    throw new Error('');
  }

  return context;
};

export const useAuth = () => {
  const context = useContextSelector(AuthContext, context => context.state);

  if (!context) {
    throw new Error('');
  }

  return context;
};