import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';

import UserContext from '../../context/UserContext';

export default function Authoptions() {
  const { userData, setUserData } = useContext(UserContext);

  const history = useHistory();
  const register = () => history.push('/register');
  const login = () => history.push('/login');
  const createPun = () => history.push('/cap');

  const logout = () => {
    setUserData({
      token: undefined,
      user: undefined,
    });
    localStorage.setItem('auth-token', '');
  };
  return (
    <div>
      {userData.user ? (
        <>
          <Button color='secondary' onClick={createPun}>
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
