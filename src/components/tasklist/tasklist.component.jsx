import { Box, Button, Grid } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import Task from "../task/task.component";
import { useHttpClient } from "../../hooks/http-hook";
import { AuthContext } from "../../context/auth-context";
import { useNavigate } from "react-router-dom";
import AdsClickIcon from "@mui/icons-material/AdsClick";
import "./tasklist.component.style.css";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [taskFilterData, setTaskFilterData] = useState([]);
  const [deleteFlag, setDeleteFlag] = useState(false);
  const {error, clearError, sendRequest} = useHttpClient();
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  
  useEffect(() => {
    if(auth.filter){
        const newFilterData = tasks.filter((task) => {
          const filterKey = Object.keys(auth.filter)[0];
            if(filterKey==='dueDate'){
              return new Date(task[filterKey]).toDateString() === auth.filter[filterKey];
            }
            return task[filterKey] === auth.filter[filterKey];
        });
        setTaskFilterData(newFilterData);
    }else{
      setTaskFilterData(tasks);
    }
  }, [auth.filter]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/tasks/user/${auth.userId}`
        );
        setTasks(responseData.tasks);
        setTaskFilterData(responseData.tasks);
      } catch (err) {}
    };
    fetchTasks();
  }, [sendRequest, auth.userId,deleteFlag]);

  const updateDeleteFlag = () => {
    setDeleteFlag(!deleteFlag);
  }

  return (
    <>
      <Grid className="task-list" container spacing={2}>
        {taskFilterData.map((task) => (
          <Grid key={task.id} item xs={12}>
            <Task task={task} updateDeleteFlag={updateDeleteFlag} />
          </Grid>
        ))}

        {taskFilterData.length === 0 && (
          <Grid sx={{textAlign:'center'}} item xs={12}>
            <p>No Record Found !!</p>
          </Grid>
        )}
        <Grid item xs={12}>
        <Box className="footer">
      <Button
          fullWidth
          className="create-task-button"
          variant="contained"
          disableElevation
          onClick={() => navigate("/tasks")}
        >
          Add New Task <AdsClickIcon sx={{ marginLeft: "10px" }} />
        </Button>
        </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default TaskList;
