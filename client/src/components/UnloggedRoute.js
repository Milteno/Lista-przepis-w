import React from 'react'
import { Route, Redirect } from "react-router-dom";
import { useAuth } from '../hooks/useAuth';

const UnloggedRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) =>
        !isAuthenticated ? (
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

export default UnloggedRoute;