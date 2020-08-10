import React, { useContext, useEffect, useState } from 'react';
import Axios from 'axios';
import DeleteIcon from '@material-ui/icons/Delete';
import { Link } from 'react-router-dom';

import UserContext from '../context/UserContext';
import { Button } from '@material-ui/core';

export default function NotesList() {
  const { userData } = useContext(UserContext);
  const [notes, setNotes] = useState([]);

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
      {notes &&
        notes.map((note, index) => (
          <h1>
            <Link to={`/note/${note._id}/`} style={{ textDecoration: 'none' }}>
              {note.title}
            </Link>
            <Button onClick={() => deleteNote(note._id)}>
              <DeleteIcon />
            </Button>
          </h1>
        ))}
    </div>
  );
}
