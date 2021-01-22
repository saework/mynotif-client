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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();

  const [reqMessage, setReqMessage] = useState("");

  let validateEmail=(email)=>{
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

   // войти по логину и паролю
  let signUpHandler = ()=> {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const passwordRpt = document.getElementById('passwordRpt').value;

    console.log(validateEmail(email))

    if (email && password && passwordRpt){
      if (password===passwordRpt){
        const validEmail = validateEmail(email);
        if (validEmail===true){
      // const loginData = {
      //   email: email,
      //   password: password
      // }  
      // console.log(loginData);
        const url = "http://localhost:3000/signup";
      //const url = "/signup";
        axios
          .post(url, {
            // loginData,
            //user:"test@test"
            username: email, password: password
          })
          .then((response) => {
            let bd;
            if (response.statusText === "OK") {
              //console.log(response);
              //console.log(response.data);
              const respRes = response.data.result;
              if (respRes==="jwt"){
                const jwt = response.data.jwt;
                if (jwt){
                  const jwt = response.data;
                  console.log(jwt);
                // props.loginSaveStore(jwtData);
                  localStorage.setItem("jwt", JSON.stringify(jwt));
                  console.log("Регистрация прошла успешно, JWT записан в LocalStorage");
                  bd = true;
                }else{
                  bd = null;
                  const mes = "Ошибка аутентификации";
                  //console.log(mes);
                  setReqMessage(mes);
                }
              }else{
                setReqMessage(respRes);
                bd = null;
              }
            }else{
              const mes = "Ошибка сервера";
              setReqMessage(mes);
            }
            return bd;
          })
          .then((db) => {
            if (db) {
              console.log("Переход на главную страницу после регистрации");
              history.push({
                pathname: '/home',
                state: { needLoadData: false }
              })
            }
          })
          .catch((error) => {
            console.log(`Ошибка соединения:${error}`);
          });
        }else{
          const mes = "Email имеет не верный формат!";
          setReqMessage(mes);
        }
      }else{
        const mes = "Пароли не совпадают!";
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
        Регистрация
        </Typography>
        {/* <form className={classes.form} noValidate> */}
        <form className={classes.form} Validate>
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
            {/* <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid> */}
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
              <Link href="/login" variant="body2">
                Уже есть аккаунт? Войти
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      {/* <label className="sign-up__reqMessage-label">{reqMessage}</label> */}
      <Box mt={3}>
        <Copyright />
      </Box>
    </Container>
  );
}
