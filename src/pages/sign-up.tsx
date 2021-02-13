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
import signUpApi from '../api/signup-api';
import Copyright from '../components/copyright';
import useStyles from '../configs/signstl-conf';

function SignUp() {
  const classes = useStyles();
  const [reqMessage, setReqMessage] = useState<string>('');
  const [email, setEmailVal] = useState<string>('');
  const [password, setPasswordVal] = useState<string>('');
  const [passwordRpt, setPasswordRptVal] = useState<string>('');

  // войти по логину и паролю
  const signUpHandler = () => {
    signUpApi(email, password, passwordRpt, setReqMessage);
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
  const passInputRptHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const passwordRptEl = e.currentTarget as HTMLInputElement;
    setPasswordRptVal(passwordRptEl.value);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Регистрация
        </Typography>
        {/* <form className={classes.form} noValidate> */}
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
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
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Пароль"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={passInputHandler}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="passwordRpt"
                label="Повтор пароля"
                type="password"
                id="passwordRpt"
                autoComplete="current-password"
                onChange={passInputRptHandler}
              />
            </Grid>
          </Grid>
          <Button type="button" fullWidth variant="contained" className={classes.submit} onClick={signUpHandler}>
            <Link to="/signup">Регистрация</Link>
          </Button>
          {/* <label className="sign-up__reqMessage-label">{reqMessage}</label> */}
          <div className="sign-up__reqMessage-label">{reqMessage}</div>
          {/* <Grid container justifyContent="flex-end"> */}
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/login">Уже есть аккаунт? Войти</Link>
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
// const mapDispatchToProps = (dispatch) => ({
//   loginSaveStore: (loginData) => dispatch(loginSaveStore(loginData)),
// });

// export default connect(mapDispatchToProps)(SignUp);
export default SignUp;
