import React, { useState } from 'react';
import { createContext, useContextSelector } from 'use-context-selector';
import API from '../utils/API';

const RecipeContext = createContext(null);

const defaultState = {
  recipes: [],
  error: null,
  isLoading: false,
};

export const RecipeModule = (props) => {
  const { children } = props;

  const [state, setState] = useState(defaultState);

  const actions = {
    fetch: async () => {
      setState(oldState => ({
        ...oldState,
        isLoading: true,
      }));

      try {
        const response = await API.getRecipes();
        if (response.status === 200) {
          setState(oldState => ({
            ...oldState,
            recipes: response.data,
          }));
        }
      } catch (err) {
        setState(oldState => ({
          ...oldState,
          error: err,
        }));
      } finally {
        setState(oldState => ({
          ...oldState,
          isLoading: false,
        }));
      }
    },
  };

  return (
    <RecipeContext.Provider value={{ state, actions }}>
      {children}
    </RecipeContext.Provider>
  )
};

export const useRecipes = () => {
  const context = useContextSelector(RecipeContext, c => c);

  if (!context) {
    throw new Error('RecipesContext nie jest zdefiniowany');
  }

  return context;
};
