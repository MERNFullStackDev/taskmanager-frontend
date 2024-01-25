import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import "./login.component.style.css";
import { useHttpClient } from "../../hooks/http-hook";
import { AuthContext } from "../../context/auth-context";
import { useNavigate } from "react-router-dom";
import { validateLoginPage } from "../../util/validators";

const Login = () => {
  const auth = useContext(AuthContext);
  const {sendRequest} = useHttpClient();
  const [formData] = useState(new FormData());
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const initialValues = { email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);

  const handleLogin = async () => {
    try {
      const payLoadData = {};
      for (let [key, value] of formData.entries()) {
        payLoadData[`${key}`] = value;
      }
      const responseData = await sendRequest(
        "http://localhost:5000/api/users/login",
        "POST",
        JSON.stringify(payLoadData),
        {
          "Content-Type": "application/json",
        }
      );
      auth.login(responseData.userId, responseData.token, responseData.name);
    } catch (err) {
      setErrors({message: err.toString() });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    formData.set(name, value);
    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <>
      <Box className="login-container">
        <Typography
          variant="h5"
          sx={{ textAlign: "center", paddingBottom: "2rem" }}
        >
          Login
        </Typography>
        {errors?.message && (
          <Typography
            variant="h6"
            sx={{ textAlign: "center", paddingBottom: "2rem" }}
            className="validation-error"
          >
            {errors.message}
          </Typography>
        )}
        <form>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="text"
                id="email"
                name="email"
                label="Email"
                variant="outlined"
                onChange={handleChange}
              />
              {errors?.email && (
                <Typography variant="h6" className="validation-error">
                  {errors.email}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="password"
                id="password"
                name="password"
                label="Password"
                variant="outlined"
                onChange={handleChange}
              />
              {errors?.password && (
                <Typography variant="h6" className="validation-error">
                  {errors.password}
                </Typography>
              )}
            </Grid>
            <Grid item sm={6} xs={12}>
              <Button fullWidth variant="contained" onClick={(e)=>{
                 const validator = validateLoginPage(formValues);
                 setErrors(validator.errors); 
                 if(validator.isValid){
                      handleLogin();
                      setErrors({});
                  }
               
                }}>
                Login
              </Button>
            </Grid>
            <Grid item sm={6} xs={12}>
              <Button
                fullWidth
                variant="contained"
                onClick={() => navigate("/signup")}
              >
                Register New User
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </>
  );
};

export default Login;
