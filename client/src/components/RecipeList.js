import React, { useEffect, useState } from 'react'
import { Header, Message } from "semantic-ui-react";
import API from '../utils/API';
import { RecipeListItem } from './RecipeListItem';

export const RecipeList = ({ recipes }) => {
  return (
    <div style={{ padding: '0 0 30px' }}>
      {recipes.map(recipe => (
        <RecipeListItem key={recipe._id} {...recipe} />
      ))}
    </div>
  )
};

export default RecipeList;
