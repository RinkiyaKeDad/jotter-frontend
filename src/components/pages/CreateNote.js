import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from '../context/UserContext';
import Axios from 'axios';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

function Alert(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  textBoxWidth: {
    width: '100%',
  },
}));

export default function Login() {
  const [content, setContent] = useState();
  const [link, setLink] = useState();

  const [error, setError] = useState(undefined);

  const classes = useStyles();
  const { userData } = useContext(UserContext);
  const history = useHistory();

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setError(undefined);
    //setOpen(false);
  };

  const submit = async e => {
    e.preventDefault();
    try {
      const createdNote = {
        title: content,
        author: userData.user.username,
        videoLink: link,
        videoTimestamp: 0,
        body: {
          text: '',
        },
      };
      const noteRes = await Axios.post(
        process.env.REACT_APP_BACKEND_URL + '/notes/',
        createdNote,
        {
          headers: {
            'x-auth-token': userData.token,
          },
        }
      );

      history.push('/notes');
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
    }
  };

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <AddCircleIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Create A Note
        </Typography>
        <form className={classes.form} noValidate onSubmit={submit}>
          <TextField
            id='outlined-textarea'
            label='Create A Note'
            placeholder='Put Your Note Title Here!'
            multiline
            variant='outlined'
            onChange={e => setContent(e.target.value)}
            className={classes.textBoxWidth}
          />
          <TextField
            id='outlined-textarea'
            label='Create A URL'
            placeholder='Put Your Amazing URL Here!'
            multiline
            variant='outlined'
            onChange={e => setLink(e.target.value)}
            className={classes.textBoxWidth}
          />

          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
          >
            Create
          </Button>
        </form>
        <Snackbar open={!!error} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity='error'>
            {error}
          </Alert>
        </Snackbar>
      </div>
    </Container>
  );
}
