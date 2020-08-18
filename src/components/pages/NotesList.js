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
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

export default function NotesList() {
  const { userData } = useContext(UserContext);
  const [notes, setNotes] = useState([]);
  const [notif, setNotif] = useState(undefined);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setNotif(undefined);
  };

  const history = useHistory();

  console.log(`token is ${userData.token}`);

  useEffect(() => {
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
