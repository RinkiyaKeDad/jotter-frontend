import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

export default function Home() {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant='h1' component='h2' gutterBottom>
          Jotter - Take notes while browsing YouTube!
        </Typography>
      </Grid>
    </Grid>
  );
}
