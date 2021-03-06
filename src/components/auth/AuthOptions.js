import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';

import UserContext from '../context/UserContext';

export default function Authoptions() {
  const { userData, setUserData } = useContext(UserContext);

  const history = useHistory();
  const register = () => history.push('/register');
  const login = () => history.push('/login');
  const create = () => history.push('/create');

  const logout = () => {
    setUserData({
      token: undefined,
      user: undefined,
    });
    sessionStorage.setItem('auth-token', '');
    history.push('/login');
  };
  return (
    <div>
      {userData.user ? (
        <>
          <Button color='secondary' onClick={create}>
            Create
          </Button>
          <Button color='secondary' onClick={logout}>
            Log out
          </Button>
        </>
      ) : (
        <>
          <Button color='secondary' onClick={register}>
            Register
          </Button>
          <Button color='secondary' onClick={login}>
            Login
          </Button>
        </>
      )}
    </div>
  );
}
