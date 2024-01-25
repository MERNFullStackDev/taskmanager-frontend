import * as React from "react";
import "./main.component.style.css";
import { Box } from "@mui/material";
import TopBarNavigation from "./topbar/topbar.component";
import LeftNavigationFilters from "./leftnavigation/leftnavigation.component";
import Login from "./login/login.component";
import TaskList from "./tasklist/tasklist.component";
import CreateTask from "./createtask/createtask.component";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from "./signup/signup.component";
import { AuthContext } from "../context/auth-context";
import EditTask from "./edittask/edittask.component";

const Main = () => {
  const auth = React.useContext(AuthContext);
  let routes;
  if (auth.isLoggedIn) {
    routes = (
      <Routes>
        <Route path="/tasks" element={<CreateTask />} />
        <Route path="/tasks/:taskId" element={<EditTask />} />
        <Route path="/" element={<TaskList />} />
        <Route path="*" element={<TaskList />} />
      </Routes>
    );
  } else {
    routes = (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Login />} />
      </Routes>
    );
  }
  
  return (
    <Router>
    <Box className="task-manager">
      <Box className="top-navbar">
        <TopBarNavigation />
      </Box>
      <Box className="main-container">
        <Box
          className="left-panel"
          sx={{ display: { xs: "none", sm: "block" } }}
        >
          <LeftNavigationFilters />
        </Box>
        <Box className="right-panel">
        {routes}
        </Box>
      </Box>
    </Box>
    </Router>
  );
};

export default Main;
