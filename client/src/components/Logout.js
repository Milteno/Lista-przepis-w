import React from 'react'
import { useHistory } from 'react-router-dom';
import { useAuthActions } from '../hooks/useAuth';

const Logout = () => {
  const { clearUser } = useAuthActions();
  const history = useHistory();

  const onClick = (e) => {
    clearUser();
    history.push('/');
  }

  return (
    <button
      style={{ border: "none", cursor: "pointer" }}
      className="item"
      onClick={onClick}
    >
      Wyloguj
    </button>
  )
}

export default Logout;
