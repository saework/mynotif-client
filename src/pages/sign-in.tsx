import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Link } from 'react-router-dom';
// import { connect } from 'react-redux';
// import { loginSaveStore } from '../actions/actions';
import { signInApi } from '../api/signin-api';
import Copyright from '../components/copyright';
import useStyles from '../configs/signstl-conf';
// import { ILoginData } from '../interfaces';

function SignIn() {
  const classes = useStyles();
  const [reqMessage, setReqMessage] = useState<string>('');
  const [email, setEmailVal] = useState<string>('');
  const [password, setPasswordVal] = useState<string>('');

  // войти по логину и паролю
  const signInHandler = () => {
    signInApi(setReqMessage, email, password);
  };

  const emailInputHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const emailEl = e.currentTarget as HTMLInputElement;
    setEmailVal(emailEl.value);
  };
  const passInputHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const passwordEl = e.currentTarget as HTMLInputElement;
    setPasswordVal(passwordEl.value);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Вход
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email адрес"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={emailInputHandler}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Пароль"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={passInputHandler}
          />
          <Button type="button" fullWidth variant="contained" className={classes.submit} onClick={signInHandler}>
            Войти
          </Button>
          {/* <label className="sign-up__reqMessage-label">{reqMessage}</label> */}
          <div className="sign-up__reqMessage-label">{reqMessage}</div>
          <Grid container>
            <Grid item xs>
              <Link to="/newpassword">Забыли пароль?</Link>
            </Grid>
            <Grid item>
              <Link to="/signup">Нет аккаунта? Регистрация</Link>
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
// const mapDispatchToProps = (dispatch : any) => ({
//   loginSaveStore: (loginData: ILoginData) => dispatch(loginSaveStore(loginData)),
// });

// export default connect(mapDispatchToProps)(SignIn);
export default SignIn;
