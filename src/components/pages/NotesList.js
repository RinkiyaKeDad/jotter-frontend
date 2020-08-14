import React, { useContext, useEffect, useState } from 'react';
import Axios from 'axios';
import DeleteIcon from '@material-ui/icons/Delete';
import { useHistory } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/styles';
import List from '@material-ui/core/List';
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

export default function NotesList() {
  const { userData } = useContext(UserContext);
  const [notes, setNotes] = useState([]);
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
      const newNotes = notes.filter(note => note._id != id);
      setNotes(newNotes);
    } catch (err) {
      console.log(err);
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
              <Button onClick={() => deleteNote(note._id)}>
                <DeleteIcon />
              </Button>
            </ListItem>
          ))}
      </List>
    </div>
  );
}
