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
import { validateEmail } from "../functions";
import axios from "axios";
import { Link } from "react-router-dom";
import { newPassApi } from "../api/newpass-api";

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
  text: {
    margin: theme.spacing(2, 0, 2),
  },
}));

function NewPass() {
  const classes = useStyles();
  const [reqMessage, setReqMessage] = useState("");
  let updatePasswordHandler = () => {
    newPassApi(setReqMessage);
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
              />
            </Grid>
          <Button
            type="button"
            fullWidth
            variant="contained"
            className={classes.submit}
            onClick={updatePasswordHandler}
          >
            Сменить пароль
          </Button>
          <label className="sign-up__reqMessage-label">{reqMessage}</label>
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