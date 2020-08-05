import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import Axios from 'axios';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles';

import theme from './components/layout/theme';
import UserContext from './components/context/UserContext';
import Header from './components/layout/Header';
import Home from './components/pages/Home';
import Login from './components/auth/Login';
import Register from './components/auth/Register';

const useStyles = makeStyles({
  verticalMargin: {
    marginTop: '2rem',
    [theme.breakpoints.down('xs')]: {
      marginTop: '2rem',
    },
  },
});

function App() {
  const classes = useStyles();

  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem('auth-token');

      if (token === null) {
        localStorage.setItem('auth-token', '');
        token = '';
      }
      const tokenRes = await Axios.post(
        process.env.REACT_APP_BACKEND_URL + '/auth/tokenIsValid',
        null,
        { headers: { 'x-auth-token': token } }
      );
      if (tokenRes.data) {
        const userRes = await Axios.get(
          process.env.REACT_APP_BACKEND_URL + '/auth/',
          {
            headers: { 'x-auth-token': token },
          }
        );
        setUserData({
          token,
          user: userRes.data,
        });
      }
    };

    checkLoggedIn();
  }, []);

  return (
    <>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <UserContext.Provider value={{ userData, setUserData }}>
            <Grid container direction='column'>
              <Grid item>
                <Header />
              </Grid>
              <Grid item container className={classes.verticalMargin}>
                <Grid item xs={1} sm={2} />
                <Grid item xs={10} sm={8}>
                  <Switch>
                    <Route path='/' component={Home} exact />
                    <Route path='/login' component={Login} />
                    <Route path='/register' component={Register} />
                  </Switch>
                </Grid>
                <Grid item xs={1} sm={2} />
              </Grid>
            </Grid>
          </UserContext.Provider>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
