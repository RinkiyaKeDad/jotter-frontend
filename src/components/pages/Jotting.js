import React, { useState, useContext, useEffect } from 'react';
import { Grid, TextField } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import UserContext from '../context/UserContext';
import Axios from 'axios';
import YouTube from 'react-youtube';

export default function Jotting() {
  const { userData } = useContext(UserContext);

  const id = useParams().id;
  const [note, setNote] = useState([]);
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

  return (
    <div>
      <YouTube
        videoId={getVideoId()}
        opts={{
          width: '100%',
          playerVars: {
            start: parseInt(note.videoTimestamp),
          },
        }}
      />
    </div>
  );
}
