
import React, { useState } from "react";
import { Link, useHistory } from 'react-router-dom';
import { Header, Message } from "semantic-ui-react";
import API from '../utils/API';
import UserForm from "../components/UserForm";
import { useAuthActions } from "../hooks/useAuth";

const Login = () => {
  const { setUser } = useAuthActions();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const history = useHistory();

  const onFormSubmit = async (values) => {
    setIsLoading(true);

    try {
      const response = await API.register(values);
      if (response.status === 200) {
        setUser(response.data);
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
        Rejestracja
      </Header>
      <UserForm
        error={error}
        isLoading={isLoading}
        buttonText="Zarejestruj"
        onSubmit={onFormSubmit}
      />
      <Message>
        <Link to="/login">Zaloguj się</Link>.
      </Message>
    </div>
  )
}

export default Login;