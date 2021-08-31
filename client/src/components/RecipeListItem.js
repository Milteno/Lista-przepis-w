import React from 'react'
import { Header, Message } from "semantic-ui-react";
import { useHistory } from 'react-router-dom';

export const RecipeListItem = ({ _id, name, difficulty, duration, image }) => {
  const history = useHistory();

  const onClick = () => {
    history.push(`/recipe/${_id}`)
  }

  return (
    <div style={{ maxWidth: '800px', margin: '20px auto', padding: '0 15px', cursor: 'pointer' }} onClick={onClick}>
      <Message>
        <div style={{ display: 'flex' }}>
          <img src={`/${image}`} alt="" width="100px" />
          <div style={{ marginLeft: '15px' }}>
            <Header size="medium">{name}</Header>
            <div style={{ display: 'flex' }}>
              <p style={{ margin: 0 }}>Stopień trudności: <strong>{difficulty} / 5</strong></p>
              <p style={{ margin: '0 0 0 60px' }}>Czas przygotowania: <strong>{duration} min</strong></p>
            </div>
          </div>
        </div>
      </Message>
    </div >
  )
}
export default RecipeListItem;