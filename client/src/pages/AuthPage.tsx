import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Typography,
  Button,
  Box,
  Divider,
  Link,
  Snackbar,
  IconButton,
  Alert,
} from "@mui/material";
import store, { RootState } from "../store";
import { addUser, loginUser } from "../store/users-slice";
import { useSelector } from "react-redux";
import { Close } from "@mui/icons-material";

const AuthPage = () => {
  const user = useSelector((state: RootState) => state.users.userId);

  const navigate = useNavigate();
  useEffect(() => {
    if (user) navigate("/");
  }, [user]);

  const [isLoginIn, setLogIn] = useState(true);

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");

  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(userName, email, password);

    if (email === "" || password === "" || !(isLoginIn || userName != "")) {
      setSnackBarMessage("one or more field is empty");
      setSnackBarOpen(true);
      setAlertColor("error");
      return;
    }

    if (!email.includes("@")) {
      setSnackBarMessage("invalid email");
      setSnackBarOpen(true);
      setAlertColor("error");
      return;
    }

    if (password !== cPassword) {
      setSnackBarMessage("password does not match");
      setSnackBarOpen(true);
      setAlertColor("error");
      return;
    }

    if (isLoginIn) {
      store
        .dispatch(loginUser({ email, password }))
        .unwrap()
        .then(() => {
          setSnackBarMessage("success");
          setAlertColor("success");
          setSnackBarOpen(true);
        })
        .catch((err) => {
          setSnackBarMessage("something went wrong");
          setSnackBarOpen(true);
          setAlertColor("error");
        });
      return;
    }

    store
      .dispatch(addUser({ userName, email, password }))
      .unwrap()
      .then(() => {
        setSnackBarMessage("success");
        setSnackBarOpen(true);
        setAlertColor("success");
      })
      .catch((err) => {
        setSnackBarMessage("something went wrong");
        setSnackBarOpen(true);
        setAlertColor("error");
      });
  };

  const [isSnackBarOpen, setSnackBarOpen] = useState(false);

  const [snackBarMessage, setSnackBarMessage] = useState("");

  const [alertColor, setAlertColor] = useState<
    "error" | "info" | "success" | "warning"
  >("info");

  const snackbarOnCloseHandler = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    setSnackBarOpen(false);
  };

  console.log(user);

  return (
    <Box
      component="main"
      sx={{ backgroundImage: "url(./auth-background.jpg)" }}
      className="flex items-end justify-center  h-screen relative bg-cover min-h-[40rem]"
    >
      <Box className="bg-black opacity-70 absolute w-full h-screen min-h-[40rem]"></Box>
      <Box className="bg-stone-900 sm:p-12 p-8 shadow-stone-700 shadow-md rounded-md absolute sm:h-max sm:w-max h-full w-full ">
        <Typography variant="h4" component={"h1"}>
          {isLoginIn ? "LogIn" : "Sign in"}
        </Typography>
        <Box
          component="form"
          className="flex flex-col bg-stone-900 sm:min-w-[19rem] min-w-0"
          onSubmit={onSubmitHandler}
        >
          {!isLoginIn && (
            <TextField
              id="username"
              value={userName}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setUserName(event.currentTarget.value)
              }
              label="User Name"
              variant="filled"
              className="my-2"
            />
          )}
          <TextField
            id="email"
            value={email}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(event.currentTarget.value)
            }
            label="Email Address"
            variant="filled"
            className="my-2"
          />
          <TextField
            id="password"
            value={password}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(event.currentTarget.value)
            }
            label="Password"
            variant="filled"
            type="password"
            className="my-2"
          />
          {!isLoginIn && (
            <TextField
              id="c-password"
              value={cPassword}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setCPassword(event.currentTarget.value)
              }
              label="Confirm Password"
              variant="filled"
              type="password"
              className="my-2"
            />
          )}

          <Button variant="contained" className="mt-6 py-3" type="submit">
            Sign In
          </Button>
          <Snackbar
            open={isSnackBarOpen}
            onClose={snackbarOnCloseHandler}
            autoHideDuration={3000}
            action={
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={snackbarOnCloseHandler}
              >
                <Close fontSize="small" />
              </IconButton>
            }
          >
            <Alert severity={alertColor}>{snackBarMessage}</Alert>
          </Snackbar>
        </Box>
        <Box className="flex justify-end py-2">
          <Link component="button" variant="body2" onClick={() => {}}>
            Forgot Password?
          </Link>
        </Box>
        <Divider className="my-5">OR</Divider>
        <Box className="flex justify-start gap-4 h-10 mt-3 mb-12">
          <Button
            variant="outlined"
            className="flex-1 text-[#DE4032] border-2 border-[#DE4032]"
          >
            <i className="fa-brands fa-google"></i>
          </Button>
          <Button
            variant="outlined"
            className="flex-1 text-[#1771E6] border-2 border-[#1771E6]"
          >
            <i className="fa-brands fa-facebook-f"></i>
          </Button>
          <Button
            variant="outlined"
            className="flex-1 text-[#1C93E4] border-2 border-[#1C93E4]"
          >
            <i className="fa-brands fa-twitter"></i>
          </Button>
        </Box>
        <Box>
          <Typography variant="body1" component="p" className="text-sm">
            {isLoginIn ? "Dont have an Account? " : "Aleady Have an Account? "}
            <Link
              className="cursor-pointer"
              onClick={() => {
                setLogIn((val) => !val);
              }}
            >
              {!isLoginIn ? "Log In" : "Sign Up"}
            </Link>{" "}
            Instead
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default AuthPage;
