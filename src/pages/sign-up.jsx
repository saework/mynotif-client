import React, { useState } from "react";
// import Avatar from '@material-ui/core/Avatar';
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
// import Link from '@material-ui/core/Link';
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
// import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import axios from "axios";
import { Link } from "react-router-dom";
import { Route, Switch, Redirect } from "react-router-dom";
import { history, store } from "../store/store";
import { validateEmail } from "../functions";
import { loginSaveStore } from "../actions/actions";
import { connect } from "react-redux";
import { signUpApi } from "../api/signup-api";
import Copyright from "../components/copyright";
import useStyles from "../components/signstl-conf";


function SignUp(props) {
  const classes = useStyles();
  const [reqMessage, setReqMessage] = useState("");

   // войти по логину и паролю
  let signUpHandler = ()=> {
    signUpApi(setReqMessage);
  }

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
              />
            </Grid>
          </Grid>
          <Button
            type="button"
            fullWidth
            variant="contained"
            className={classes.submit}
            onClick={signUpHandler}
          >
            <Link to="/signup">Регистрация</Link>
          </Button>
          <label className="sign-up__reqMessage-label">{reqMessage}</label>
          <Grid container justifyContent="flex-end">
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

const mapStateToProps = (store) => ({

});
const mapDispatchToProps = (dispatch) => ({
  loginSaveStore: (loginData) => dispatch(loginSaveStore(loginData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);