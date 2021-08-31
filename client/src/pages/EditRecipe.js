
import React, { useState, useEffect } from "react";
import { useHistory, useParams } from 'react-router-dom';
import { Header, Loader } from "semantic-ui-react";
import API from '../utils/API';
import RecipeForm from "../components/RecipeForm";
import { useAuth } from "../hooks/useAuth";
import { useRecipes } from '../hooks/useRecipes';

const EditRecipe = () => {
  const { currentUser } = useAuth();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const history = useHistory();
  const params = useParams();
  const { actions, state } = useRecipes();

  const recipe = state.recipes.find((r) => r._id === params.id);

  useEffect(() => {
    if (!recipe) {
      actions.fetch();
    }
  }, [recipe]);

  const onFormSubmit = async (formData) => {
    setIsLoading(true);

    try {
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

  if (!recipe) {
    return <Loader size="medium" inverted />;
  }

  return (
    <div className="form-container">
      <Header as='h2' secondary="true" textAlign='center'>
        Edytuj przepis
      </Header>
      <RecipeForm
        recipe={recipe}
        error={error}
        isLoading={isLoading}
        onSubmit={onFormSubmit}
      />
    </div>
  )
}

export default EditRecipe;