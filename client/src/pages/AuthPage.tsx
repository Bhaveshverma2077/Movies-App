import { useState } from "react";
import {
  TextField,
  Typography,
  Button,
  Box,
  Divider,
  Link,
} from "@mui/material";

const AuthPage = () => {
  const [isLoginIn, setLogIn] = useState(true);
  return (
    <Box
      component="main"
      sx={{ backgroundImage: "url(./artem-sapegin-XGDBdSQ70O0-unsplash.jpg)" }}
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
          action=""
        >
          {!isLoginIn && (
            <TextField
              id="name"
              label="Full Name"
              variant="filled"
              className="my-2"
            />
          )}
          <TextField
            id="email"
            label="Email Address"
            variant="filled"
            className="my-2"
          />
          <TextField
            id="password"
            label="Password"
            variant="filled"
            type="password"
            className="my-2"
          />
          {!isLoginIn && (
            <TextField
              id="c-password"
              label="Confirm Password"
              variant="filled"
              type="password"
              className="my-2"
            />
          )}

          <Button variant="contained" className="mt-6 py-3">
            Sign In
          </Button>
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
