import {
  Box,
  Button,
  FormControl,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useHttpClient } from "../../hooks/http-hook";
import { AuthContext } from "../../context/auth-context";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { validateCreateTask } from "../../util/validators";

const EditTask = () => {
  const auth = useContext(AuthContext);
  const { sendRequest } = useHttpClient();
  const [taskName, setTaskName] = useState("");
  const [additionalNote, setAdditionalNote] = useState("");
  const [status, setStatus] = useState(false);
  const [priority, setPriority] = useState(4);
  const [dueDate, setDueDate] = useState(null);
  const [errors, setErrors] = useState({});
  const initialValues = {taskName, additionalNote, priority, status, dueDate}
  const [formValues, setFormValues] = useState(initialValues);

  const taskId = useParams().taskId;
  const navigate = useNavigate();
const updateFormData = (taskObj) => {
    setTaskName(taskObj.taskName);
    setAdditionalNote(taskObj.additionalNote);
    setStatus(taskObj.status);
    setPriority(taskObj.priority);
    setDueDate(dayjs(taskObj.dueDate));
    setFormValues({...formValues, taskName:taskObj.name, additionalNote:taskObj.additionalNote, priority:taskObj.priority, status:taskObj.status, dueDate:dayjs(taskObj.dueDate)});
  }

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/tasks/${taskId}`
        );
        updateFormData(responseData.task);
      } catch (err) {}
    };
    fetchPlace();
  }, [sendRequest, taskId]);

  const taskSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      const payLoadData = {};
      payLoadData.taskName = taskName;
      payLoadData.additionalNote = additionalNote;
      payLoadData.status = status;
      payLoadData.priority = priority;
      payLoadData.dueDate = dueDate;
      await sendRequest(
        `http://localhost:5000/api/tasks/${taskId}`,
        "PATCH",
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
        Edit Your Task
      </Typography>
      <form>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              type="text"
              id="taskName"
              name="taskName"
              value={taskName}
              label="Enter New Task"
              variant="outlined"
              onChange={(e) => {
                handleChange(e);
                setTaskName(e.target.value);
                 
              }}
            />
            {errors?.taskName && (<Typography variant="h6" className="validation-error">
            {errors.taskName}
            </Typography>)}
          </Grid>
          <Grid item xs={12}>
            <Typography
              variant="h8"
              sx={{ marginBottom: "0.5rem" }}
              component="div"
            >
              Set Task Due Date
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  value={dueDate}
                  onChange={(newValue) => {
                    setFormValues({...formValues, dueDate:newValue});
                    setDueDate(newValue);
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
              value={additionalNote}
              label="Enter Additional Information"
              variant="outlined"
              onChange={(e) => {
                handleChange(e);
                setAdditionalNote(e.target.value)
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl sx={{ width: 150 }}>
              <Typography
                variant="h8"
                sx={{ marginBottom: "1rem" }}
                component="div"
              >
                Set Task Status
              </Typography>
              <Select
                labelId="status"
                id="status"
                name="status"
                value={status}
                variant="outlined"
                onChange={(e) => {
                  handleChange(e);
                  setStatus(e.target.value)
                }}
              >
                <MenuItem value="false">Incomplete</MenuItem>
                <MenuItem value="true">Completed</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl sx={{ width: 150 }}>
              <Typography
                variant="h8"
                sx={{ marginBottom: "1rem" }}
                component="div"
              >
                Set Task Priority
              </Typography>
              <Select
                labelId="priority"
                id="priority"
                name="priority"
                value={priority}
                variant="outlined"
                onChange={(e) => {
                  handleChange(e);
                  setPriority(e.target.value)
                }}
              >
                <MenuItem value="4">Low</MenuItem>
                <MenuItem value="3">Medium</MenuItem>
                <MenuItem value="2">High</MenuItem>
                <MenuItem value="1">Urgent</MenuItem>
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
              Update
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default EditTask;
