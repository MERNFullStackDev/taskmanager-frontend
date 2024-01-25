import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import React, { useState, useContext } from "react";
import "./signup.component.style.css";
import { useHttpClient } from "../../hooks/http-hook";
import { AuthContext } from "../../context/auth-context";
import { validateSignupPage } from "../../util/validators";

const Signup = () => {
  const auth = useContext(AuthContext);
  const {sendRequest} = useHttpClient();
  const [formData] = useState(new FormData());
  const [errors, setErrors] = useState({});
  const initialValues = { name: "", email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    formData.set(name, value);
    setFormValues({ ...formValues, [name]: value });
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      const payLoadData = {};
      for (let [key, value] of formData.entries()) {
        payLoadData[`${key}`] = value;
      }
      
      const responseData = await sendRequest(
        "http://localhost:5000/api/users/signup",
        "POST",
        JSON.stringify(payLoadData),
        { "Content-Type": "application/json" }
      );
      auth.login(responseData.userId, responseData.token, responseData.name);
    } catch (err) {
      setErrors({message: err.toString() });
    }
  };

  return (
    <Box className="signup-container">
      <Typography
        variant="h5"
        sx={{ textAlign: "center", paddingBottom: "2rem" }}
      >
        Register New User
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
              id="name"
              label="Name"
              name="name"
              variant="outlined"
              onChange={handleChange}
            />
            {errors?.name && (
              <Typography variant="h6" className="validation-error">
                {errors.name}
              </Typography>
            )}
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              type="text"
              id="email"
              label="Email"
              name="email"
              onChange={handleChange}
              variant="outlined"
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
              label="Password"
              name="password"
              variant="outlined"
              onChange={handleChange}
            />
            {errors?.password && (
              <Typography variant="h6" className="validation-error">
                {errors.password}
              </Typography>
            )}
          </Grid>
          <Grid item xs={12}>
            <Button
              fullWidth
              variant="contained"
              onClick={(e)=>{
                const validator = validateSignupPage(formValues);
                setErrors(validator.errors); 
                if(validator.isValid){
                     handleCreateUser(e);
                     setErrors({});
                 }
              }}
            >
              Signup
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default Signup;
