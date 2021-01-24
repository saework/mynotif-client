import React, { useState } from "react";
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
import { validateEmail } from "../functions";

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

  const [reqMessage, setReqMessage] = useState("");

    // войти по логину и паролю
  let signInHandler = ()=> {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    if (email, password){
      const validEmail = validateEmail(email);
      if (validEmail===true){
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
              const loginData = {
                currentUser: email,
                jwtToken: jwt.jwtToken
              } 
              props.loginSaveStore(loginData);
              //localStorage.setItem("jwt", JSON.stringify(jwt));
              localStorage.setItem("loginData", JSON.stringify(loginData));
              console.log("Аутентификация прошла успешно, loginData записан в LocalStorage")
              bd = true;
            }else{
              const mes = "Ошибка сервера";
              setReqMessage(mes);
              bd = false;
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
            if (error.response){
              if (error.response.status === 401){
                  setReqMessage("Не верный логин или пароль!");
              }else{
                console.log(`Ошибка соединения:${error}`);
                setReqMessage("Ошибка сервера");
              }
            }else{
              console.log(`Ошибка сервера:${error}`);
              setReqMessage("Ошибка сервера");
            }
          });
        }else{
          const mes = "Email имеет не верный формат!";
          setReqMessage(mes);
        }
      }else{
        const mes = "Заполните обязательные поля!";
        setReqMessage(mes);
      } 
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
          <label className="sign-up__reqMessage-label">{reqMessage}</label>
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