import React, { useState, useContext, useEffect } from 'react';
import { Grid, TextField } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import UserContext from '../context/UserContext';
import Axios from 'axios';
import YouTube from 'react-youtube';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import theme from '../layout/theme';

const useStyles = makeStyles({
  verticalMargin: {
    marginTop: '2rem',
    [theme.breakpoints.down('xs')]: {
      marginTop: '2rem',
    },
  },
  notesArea: {
    width: '100%',
  },
  buttonPos: {
    marginTop: '2%',
  },
});

export default function Jotting() {
  const classes = useStyles();

  const { userData } = useContext(UserContext);

  const id = useParams().id;
  const [note, setNote] = useState([]);
  const [text, setText] = useState('');
  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await Axios.get(
          process.env.REACT_APP_BACKEND_URL + `/notes/${id}`,
          {
            headers: {
              'x-auth-token': userData.token,
            },
          }
        );
        console.log(response.data);
        setText(response.data.body.text);
        setNote(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchNote();
  }, [userData]);

  const getVideoId = () => {
    if (note.videoLink === '' || note.videoLink === undefined) return '';
    // www.youtube.com/watch?v=ID&...
    let splitVideoLink = note.videoLink.split('v=')[1];
    let ampersandLocation = splitVideoLink.indexOf('&');
    if (ampersandLocation !== -1) {
      return splitVideoLink.substring(0, ampersandLocation);
    }
    return splitVideoLink;
  };

  const saveNote = async e => {
    e.preventDefault();
    const saveRes = await Axios.patch(
      process.env.REACT_APP_BACKEND_URL + `/notes/${id}`,
      {
        body: {
          text,
        },
      },
      {
        headers: {
          'x-auth-token': userData.token,
        },
      }
    );
  };

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} sm={6}>
        <YouTube
          videoId={getVideoId()}
          opts={{
            width: '100%',
            playerVars: {
              start: parseInt(note.videoTimestamp),
            },
          }}
        />
      </Grid>
      <Grid item container xs={12} sm={6}>
        <Grid item xs={12}>
          <TextField
            id='outlined-multiline-static'
            multiline
            defaultValue={text}
            rows={17}
            variant='outlined'
            fullWidth={true}
            onChange={e => setText(e.target.value)}
          />
        </Grid>
        <Grid className={classes.buttonPos} item xs={12}>
          <Button variant='contained' color='secondary' onClick={saveNote}>
            Save
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}
