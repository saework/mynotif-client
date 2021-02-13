import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Link } from 'react-router-dom';
import { newPassApi } from '../api/newpass-api';
import Copyright from '../components/copyright';
import useStyles from '../configs/signstl-conf';

function NewPass() {
  const classes = useStyles();
  const [reqMessage, setReqMessage] = useState<string>('');
  const [email, setEmailVal] = useState<string>('');

  const updatePasswordHandler = () => {
    newPassApi(setReqMessage, email);
  };
  const emailInputHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const emailEl = e.currentTarget as HTMLInputElement;
    setEmailVal(emailEl.value);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h6">
          {/* Новый пароль будет выслан на Ваш email адрес */}
          Сброс пароля
        </Typography>
        <form className={classes.form} noValidate>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="email"
              label="Email адрес"
              name="email"
              autoComplete="email"
              onChange={emailInputHandler}
            />
          </Grid>
          <Button type="button" fullWidth variant="contained" className={classes.submit} onClick={updatePasswordHandler}>
            Сменить пароль
          </Button>
          {/* <label className="sign-up__reqMessage-label">{reqMessage}</label> */}
          <div className="sign-up__reqMessage-label">{reqMessage}</div>
          <Grid container>
            <Grid item xs>
              <Link to="/login">На главную</Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={3}>
        <Copyright />
      </Box>
    </Container>
  );
}

export default NewPass;
