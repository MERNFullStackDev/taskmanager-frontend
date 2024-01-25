import { Card, CardContent, Checkbox, Grid, Typography } from "@mui/material";
import { red, orange, yellow, green } from "@mui/material/colors";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useHttpClient } from "../../hooks/http-hook";
import { AuthContext } from "../../context/auth-context";
import "./task.component.style.css";
import ConfirmationPopUp from "../popup/confirmation.component";

const Task = (taskProps) => {
  const {sendRequest} = useHttpClient();
  const auth = useContext(AuthContext);
  const taskData = taskProps.task;
  const navigate = useNavigate();
  const editTaskHandler = () => {
    navigate(`/tasks/${taskData.id}`);
  };
  const deleteTaskHandler = async () => {
    try {
      await sendRequest(
        `http://localhost:5000/api/tasks/${taskData.id}`,
        'DELETE',
        null,
        {
          Authorization: 'Bearer '+auth.token
        }
      );
      taskProps.updateDeleteFlag();
      auth.updateFilter(null);
    } catch (err) {}
  }
  const label = {
    inputProps: { "aria-label": "Task Status" },
    checked: taskData.status,
  };
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 1:
        return red[500];
      case 2:
        return orange[500];
      case 3:
        return yellow[500];
      default:
        return green[500];
    }
  };

  const getPriorityText = (priority) => {
    switch (priority) {
      case 1:
        return "Urgent";
      case 2:
        return "High";
      case 3:
        return "Medium";
      default:
        return "Low";
    }
  };

  return (
    <Card key={taskData.id} className={taskData.status ? '' : 'task-card'} sx={{ minWidth: 275, background: taskData.status ? 'lightgray' : 'auto' }}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item md={1} xs={2} sx={{ minWidth: 50 }}>
            <Typography variant="h8" sx={{ fontSize: "small" }} component="div">
              Task Status
            </Typography>
            <Checkbox disabled {...label} />
          </Grid>
          <Grid
            item
            md={9}
            xs={7}
            sx={{ cursor: "pointer" }}
            onClick={editTaskHandler}
            title="Click to edit"
          >
            <Typography variant="h7" component="div" sx={{textTransform:'capitalize'}}>
              {taskData.taskName}
            </Typography>
            <Typography variant="h8" sx={{ fontSize: "small" }} component="div">
              <b>Due Date :</b> {(new Date(taskData.dueDate)).toDateString()}
            </Typography>
            <Typography variant="h8" component="div" sx={{textTransform:'capitalize'}}>
              {taskData.additionalNote}
            </Typography>
          </Grid>
          <Grid item md={1} xs={2} sx={{ minWidth: 50 }}>
            <Typography variant="h8" sx={{ fontSize: "small" }} component="div">
              Priority
            </Typography>
            <Typography
              variant="h8"
              sx={{
                fontSize: "small",
                fontWeight: "bold",
                color: getPriorityColor(taskData.priority),
              }}
              component="div"
            >
              {getPriorityText(taskData.priority)}
            </Typography>
          </Grid>
          <Grid item md={1} xs={1}>
            <ConfirmationPopUp deleteTaskHandler={deleteTaskHandler} />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Task;
