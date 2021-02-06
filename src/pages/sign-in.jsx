import React, { useState } from "react";
// import Avatar from '@material-ui/core/Avatar';
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
// import Link from "@material-ui/core/Link";
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
import { loginSaveStore } from "../actions/actions";
import { connect } from "react-redux";
import { validateEmail } from "../functions";
import { signInApi } from "../api/signin-api";
import Copyright from "../components/copyright";
import useStyles from "../components/signstl-conf";

// function Copyright() {
//   return (
//     <Typography variant="body2" color="textSecondary" align="center">
//       {"Сервис «Мои уведомления» © "}
//       {new Date().getFullYear()}
//       .
//     </Typography>
//   );
// }

// const useStyles = makeStyles((theme) => ({
//   paper: {
//     marginTop: theme.spacing(8),
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//   },
//   avatar: {
//     margin: theme.spacing(1),
//     backgroundColor: theme.palette.secondary.main,
//   },
//   form: {
//     width: "100%", // Fix IE11 issue.
//     marginTop: theme.spacing(1),
//   },
//   submit: {
//     margin: theme.spacing(3, 0, 2),
//   },
// }));

function SignIn(props) {
  const classes = useStyles();
  const [reqMessage, setReqMessage] = useState("");
    // войти по логину и паролю
  let signInHandler = ()=> {
    signInApi(setReqMessage);
    }

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
          />
          <Button
            type="button"
            fullWidth
            variant="contained"
            className={classes.submit}
            onClick={signInHandler}
          >
            Войти
          </Button>
          <label className="sign-up__reqMessage-label">{reqMessage}</label>
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

const mapStateToProps = (store) => ({

});
const mapDispatchToProps = (dispatch) => ({
  loginSaveStore: (loginData) => dispatch(loginSaveStore(loginData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);