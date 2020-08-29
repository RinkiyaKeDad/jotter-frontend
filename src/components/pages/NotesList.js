import React, { useContext, useEffect, useState } from 'react';
import Axios from 'axios';
import DeleteIcon from '@material-ui/icons/Delete';
import { useHistory } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import List from '@material-ui/core/List';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import UserContext from '../context/UserContext';
import LoadingWrapper from '../utils/LoadingWrapper';
import { Button } from '@material-ui/core';

function Alert(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

export const NotesList = props => {
  const { userData } = useContext(UserContext);
  const [notes, setNotes] = useState([]);
  const [notif, setNotif] = useState(undefined);
  const { setLoading } = props;

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
      setLoading(true);
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
      setLoading(false);
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
            <ListItem
              key={index}
              button
              onClick={() => history.push(`/note/${note._id}/`)}
            >
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
};

export default LoadingWrapper(NotesList, 'Loading');
