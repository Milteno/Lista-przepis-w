import React from 'react'
import { Route, Redirect } from "react-router-dom";
import { useAuth } from '../hooks/useAuth';

const AdminRoute = ({ component: Component, ...rest }) => {
  const { isAdmin, isAuthenticated } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated && isAdmin ? (
          <Component {...props} />
        ) : (
            <Redirect
              to={{
                pathname: "/",
                state: { from: props.location }
              }}
            />
          )
      }
    />
  )
}

export default AdminRoute;