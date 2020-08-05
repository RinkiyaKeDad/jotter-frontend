import React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Link } from 'react-router-dom';

import AuthOptions from '../auth/AuthOptions';

const useStyles = makeStyles(() => ({
  typographyStyles: {
    flex: 1,
  },
}));

export default function Header() {
  const classes = useStyles();
  return (
    <AppBar color='primary' position='static'>
      <Toolbar>
        <Link
          style={{ textDecoration: 'none' }}
          className={classes.typographyStyles}
          to='/'
        >
          <Typography color='secondary' variant='h4'>
            PunDit
          </Typography>
        </Link>

        <AuthOptions />
      </Toolbar>
    </AppBar>
  );
}
