import React, { useEffect, useState } from 'react'
import { Header, Message, Loader, Button } from "semantic-ui-react";
import { useParams, useHistory } from 'react-router-dom';
import { useRecipes } from '../hooks/useRecipes';
import { useAuth } from '../hooks/useAuth';
import API from '../utils/API';
import MessageForm from '../components/MessageForm';

export const SingleRecipe = () => {
  const params = useParams();
  const history = useHistory();
  const { actions, state } = useRecipes();
  const { isAdmin, isAuthenticated } = useAuth();
  const recipe = state.recipes.find((r) => r._id === params.id);
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchComments = async () => {
    setIsLoading(true);

    try {
      const response = await API.getMessages(_id);
      if (response.status === 200) {
        setComments(response.data);
      }
    } catch (err) {
      console.error(err);
    }

    setIsLoading(false);
  }

  useEffect(() => {
    if (!recipe) {
      actions.fetch();
    }

    fetchComments();
  }, [recipe]);

  if (!recipe) {
    return <Loader size="medium" />;
  }

  const { _id, author, name, description, difficulty, duration } = recipe;

  const onEditClick = () => {
    history.push(`/edit-recipe/${_id}`);
  };

  const onRemoveClick = async () => {
    try {
      const response = await API.removeRecipe(_id);
      if (response.status === 200) {
        history.push('/');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <Message className="message-container" size="huge" secondary="true">
        <Header size="huge">{name}</Header>
      </Message>
      <div style={{ maxWidth: '800px', padding: '30px 15px', margin: '0 auto' }}>
        <img src={`/${recipe.image}`} alt="" width="300px" style={{ display: 'block', margin: '0 auto 30px' }} />
        <p>Stopień trudności: <strong>{difficulty} / 5</strong></p>
        <p>Czas przygotowania: <strong>{duration}</strong></p>
        <p>Autor: <strong>{author}</strong></p>
        <div style={{ margin: '0 0 30px' }}>
          {isAdmin && (
            <>
              <Button color="red" onClick={onRemoveClick}>
                Usuń przepis
              </Button>
              <Button primary onClick={onEditClick}>
                Edytuj przepis
              </Button>
            </>
          )}
        </div>
        <Header size="medium">Opis przygotowania:</Header>
        <p>{description}</p>
        <Header size="medium">Komentarze:</Header>
        <div style={{ marginBottom: '20px' }}>{comments.map((comment) => (
          <p key={comment._id}><strong>{comment.author}:</strong> {comment.content}</p>
        ))}</div>

        {!isLoading && isAuthenticated && comments.length < 5 && (
          <MessageForm id={_id} onSubmit={fetchComments} />
        )}
      </div>
    </div>
  )
};

export default SingleRecipe;
