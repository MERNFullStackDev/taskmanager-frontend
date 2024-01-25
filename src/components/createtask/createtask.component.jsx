import { Box, Button, FormControl, Grid, MenuItem, Select, TextField, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useNavigate } from "react-router-dom";
import { useHttpClient } from "../../hooks/http-hook";
import { AuthContext } from "../../context/auth-context";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { validateCreateTask } from "../../util/validators";

const CreateTask = () => {
  const [dateValue, setDateValue] = React.useState(null);
  const auth = useContext(AuthContext);
  const {sendRequest} = useHttpClient();
  const [formData] = useState(new FormData());
  const initialValues = {taskName:"", additionalNote:"", priority:4, status:false, dueDate:null}
  const [formValues, setFormValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const taskSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const payLoadData = {};
      for (let [key, value] of formData.entries()) {
        payLoadData[`${key}`] = value;
      }
      if (dateValue) {
        payLoadData["dueDate"] = dateValue;
      }
      await sendRequest(
        "http://localhost:5000/api/tasks",
        "POST",
        JSON.stringify(payLoadData),
        {
          Authorization: "Bearer " + auth.token,
          "Content-Type": "application/json",
        }
      );
      navigate("/");
    } catch (err) {}
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    formData.set(name, value);
    setFormValues({...formValues, [name]:value});
  };
  return (
    <Box className="create-container">
      <Button sx={{position:"absolute", right:'30px', zIndex:9999}} variant="contained" onClick={()=>{navigate("/")}}>
      <ArrowBackIcon /> Go Back
      </Button>
      <Typography
        variant="h5"
        sx={{ textAlign: "center", paddingBottom: "2rem" }}
      >
        Create New Task
      </Typography>
      <form>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              required
              type="text"
              id="taskName"
              name="taskName"
              label="Enter New Task"
              variant="outlined"
              onChange={handleChange}
            />
            {errors?.taskName && (<Typography variant="h6" className="validation-error">
            {errors.taskName}
            </Typography>)}
          </Grid>
          <Grid item xs={12}>
          <Typography variant="h8" sx={{marginBottom:'0.5rem'}} component="div">Set Task Due Date</Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  value={dateValue}
                  onChange={(newValue) => {
                    setDateValue(newValue);
                    setFormValues({...formValues, dueDate:newValue});
                  }}
                />
              </DemoContainer>
            </LocalizationProvider>
            {errors?.dueDate && (<Typography variant="h6" className="validation-error">
            {errors.dueDate}
            </Typography>)}
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              type="text"
              id="additionalNote"
              name="additionalNote"
              label="Enter Additional Information"
              variant="outlined"
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl sx={{width:150}}>
              <Typography variant="h8" sx={{marginBottom:'1rem'}} component="div">Set Task Priority</Typography>
              <Select
                labelId="priority"
                id="priority"
                name="priority"
                defaultValue={4}
                variant="outlined"
                onChange={handleChange}
              >
                <MenuItem value="4">Low</MenuItem>
                <MenuItem value="3">Medium</MenuItem>
                <MenuItem value="2">High</MenuItem>
                <MenuItem value="1">Urgent</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl sx={{width:150}}>
              <Typography variant="h8" sx={{marginBottom:'1rem'}} component="div">Set Task Status</Typography>
              <Select
                labelId="status"
                id="status"
                name="status"
                defaultValue={false}
                variant="outlined"
                onChange={handleChange}
              >
                <MenuItem value="false">Incomplete</MenuItem>
                <MenuItem value="true">Completed</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button fullWidth variant="contained" onClick={(e)=>{
             const validator = validateCreateTask(formValues);
             setErrors(validator.errors); 
             if(validator.isValid){
                taskSubmitHandler(e);
                setErrors({});
              }
            }}>
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default CreateTask;
