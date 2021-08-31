import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Loader } from "semantic-ui-react";
import NavBar from "./NavBar";
import Home from "../pages/Home";
import NewRecipe from "../pages/NewRecipe";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PrivateRoute from "./PrivateRoute";
import UnloggedRoute from "./UnloggedRoute";
import AdminRoute from "./AdminRoute";
import NoMatch from "../pages/NoMatch";
import EditRecipe from '../pages/EditRecipe';
import { useAuth, useAuthActions } from "../hooks/useAuth";
import { SingleRecipe } from '../pages/SingleRecipe';

export const App = () => {
  const { token, currentUser } = useAuth();
  const { loadUser } = useAuthActions();

  useEffect(() => {
    if (token && !currentUser) {
      loadUser();
    }
  }, [token, currentUser]);

  return (
    <>
      <BrowserRouter >
        <NavBar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/recipe/:id" exact component={SingleRecipe} />
          <UnloggedRoute path="/login" component={Login} />
          <UnloggedRoute path="/register" component={Register} />
          <PrivateRoute path="/new-recipe" component={NewRecipe} />
          <AdminRoute path="/edit-recipe/:id" component={EditRecipe} />
          <Route component={NoMatch} />
        </Switch>
      </BrowserRouter>
    </>
  )
}

export default App;
