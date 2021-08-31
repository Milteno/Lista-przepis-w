
import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import { Header } from "semantic-ui-react";
import API from '../utils/API';
import RecipeForm from "../components/RecipeForm";
import { useAuth } from "../hooks/useAuth";

const NewRecipe = () => {
  const { currentUser } = useAuth();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const history = useHistory();

  const onFormSubmit = async (formData) => {
    setIsLoading(true);

    try {
      formData.append('author', currentUser.email);
      const response = await API.saveRecipe(formData);
      if (response.status === 200) {
        history.push('/');
      }
    } catch (err) {
      setError(err.response.data.message);
    } finally {
      setIsLoading(false);
    }

    return () => setIsLoading(false);
  };

  return (
    <div className="form-container">
      <Header as='h2' secondary="true" textAlign='center'>
        Dodaj przepis
      </Header>
      <RecipeForm
        error={error}
        isLoading={isLoading}
        onSubmit={onFormSubmit}
      />
    </div>
  )
}

export default NewRecipe;