import * as React from "react";
// import Avatar from '@material-ui/core/Avatar';
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
// import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import axios from "axios";
import { Route, Switch, Redirect } from "react-router-dom";
import { history, store } from "../store/store";
import { loginSaveStore } from "../actions/actions";
import { connect } from "react-redux";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Сервис «Мои уведомления» © "}
      {/* <Link color="inherit" href="https://material-ui.com/">
        Сервис Мои уведомления
      </Link>{' '} */}
      {new Date().getFullYear()}
      .
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


//export default function SignIn() {
function SignIn(props) {
  const classes = useStyles();

    // войти по логину и паролю
  let signInHandler = ()=> {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    // const loginData = {
    //   email: email,
    //   password: password
    // }  
    // console.log(loginData);
    const url = "http://localhost:3000/login";
    //const url = "/login";
      axios
        .post(url, {
          // loginData,
          //user:"test@test"
          username: email, password: password
        })
        .then((response) => {
          let bd;
          if (response.statusText === "OK") {
            console.log(response);
            const jwt = response.data;
            console.log(jwt);
           // props.loginSaveStore(jwtData);
            localStorage.setItem("jwt", JSON.stringify(jwt));
            console.log("Аутентификация прошла успешно, JWT записан в LocalStorage")
            bd = true;
          }
          return bd;
        })
        .then((db) => {
          if (db) {
            console.log("Переход на главную страницу после аутентификации");
            history.push({
              pathname: '/home',
              state: { needLoadData: true }
            })
          }
        })
        .catch((error) => {
          console.log(`Ошибка соединения:${error}`);
        });
    }


  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        {/* <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar> */}
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
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
          <Button
            type="button"
            fullWidth
            variant="contained"
            className={classes.submit}
            onClick={signInHandler}
          >
            Войти
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="/newpassword" variant="body2">
                Забыли пароль?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/signup" variant="body2">
                Нет аккаунта? Регистрация
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

const mapStateToProps = (store) => ({

});
const mapDispatchToProps = (dispatch) => ({
  //loginSaveStore: (loginData) => dispatch(loginSaveStore(loginData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);