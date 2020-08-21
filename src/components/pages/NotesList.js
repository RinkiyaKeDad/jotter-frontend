import React, { useContext, useEffect, useState } from 'react';
import Axios from 'axios';
import DeleteIcon from '@material-ui/icons/Delete';
import { useHistory } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/styles';
import List from '@material-ui/core/List';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Shimmer from 'react-shimmer-effect';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import UserContext from '../context/UserContext';
import { Button } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  typographyStyles: {
    flex: 1,
  },
  header: {
    color: 'white',
  },
  line: {
    width: '96px',
    height: '8px',
    alignSelf: 'center',
    marginLeft: '16px',
    borderRadius: '8px',
  },
  container: {
    border: '0px solid rgba(255, 255, 255, 1)',
    boxShadow: '0px 0px 20px rgba(0, 0, 0, .1)',
    borderRadius: '4px',
    backgroundColor: 'white',
    display: 'flex',
    padding: '16px',
    width: '200px',
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

export default function NotesList() {
  const classes = useStyles();
  const { userData } = useContext(UserContext);
  const [notes, setNotes] = useState([]);
  const [notif, setNotif] = useState(undefined);
  const [loading, setLoading] = useState(true);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setNotif(undefined);
  };

  const history = useHistory();

  console.log(`token is ${userData.token}`);

  useEffect(() => {
    setLoading(true);
    const fetchAllNotes = async () => {
      try {
        const response = await Axios.get(
          process.env.REACT_APP_BACKEND_URL + `/notes`,
          {
            headers: {
              'x-auth-token': userData.token,
            },
          }
        );
        console.log(response.data);
        setNotes(response.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllNotes();
  }, [userData]);

  console.log(userData);

  const deleteNote = async id => {
    try {
      const response = await Axios.delete(
        process.env.REACT_APP_BACKEND_URL + `/notes/${id}`,
        {
          headers: {
            'x-auth-token': userData.token,
          },
        }
      );
      setNotif(response.data.msg);
      const newNotes = notes.filter(note => note._id != id);
      setNotes(newNotes);
    } catch (err) {
      err.response.data.msg && setNotif(err.response.data.msg);
    }
  };

  return (
    <div>
      <Typography variant='h1' component='h2' gutterBottom>
        Your Notes
      </Typography>
      {loading && (
        <div className={classes.container}>
          <Shimmer>
            <div className={classes.line} />
          </Shimmer>
        </div>
      )}
      <List component='nav' aria-label='contacts'>
        {notes &&
          notes.map((note, index) => (
            <ListItem button onClick={() => history.push(`/note/${note._id}/`)}>
              <ListItemText primary={note.title} />
              <ListItemSecondaryAction>
                <Button onClick={() => deleteNote(note._id)}>
                  <DeleteIcon />
                </Button>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
      </List>
      <Snackbar open={!!notif} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity='error'>
          {notif}
        </Alert>
      </Snackbar>
    </div>
  );
}
