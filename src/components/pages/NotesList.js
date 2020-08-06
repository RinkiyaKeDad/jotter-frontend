import React, { useContext, useEffect, useState } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';

import UserContext from '../context/UserContext';

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
  return (
    <div>
      {notes &&
        notes.map((note, index) => (
          <h1>
            <Link to={`/note/${note._id}/`} style={{ textDecoration: 'none' }}>
              {note.title}
            </Link>
          </h1>
        ))}
    </div>
  );
}
