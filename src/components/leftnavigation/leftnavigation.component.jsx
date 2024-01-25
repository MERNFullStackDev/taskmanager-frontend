import * as React from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { MenuItem, Typography } from "@mui/material";
import "./leftnavigation.component.style.css";
import { AuthContext } from "../../context/auth-context";
import FilterByDate from "../filterbydate/filterbydate.component";

const LeftNavigationFilters = () => {
  const auth = React.useContext(AuthContext);
  
  return (
    <Box className="left-navigation-filters">
      <Typography className="heading" variant="h7">
        Task Filters
      </Typography>
      <Divider />
      <nav className="filters" aria-label="Task Filters">
        <MenuItem selected={auth.filter===null} disabled={!auth.isLoggedIn} onClick={()=>{auth.updateFilter(null);}} disableRipple>
          All Tasks
        </MenuItem>
        <MenuItem selected={auth.filter?.status} disabled={!auth.isLoggedIn} onClick={()=>{auth.updateFilter({status:true});}} disableRipple>
          Completed Task
        </MenuItem>
        <MenuItem selected={auth.filter?.status===false} disabled={!auth.isLoggedIn} onClick={()=>{auth.updateFilter({status:false});}} disableRipple>
          Incomplete Task
        </MenuItem>
        <MenuItem selected={auth.filter?.priority===1} disabled={!auth.isLoggedIn} onClick={()=>{auth.updateFilter({priority:1});}} disableRipple>
          Urgent Priority Task
        </MenuItem>
        <MenuItem selected={auth.filter?.priority===2} disabled={!auth.isLoggedIn} onClick={()=>{auth.updateFilter({priority:2});}} disableRipple>
          High Priority Task
        </MenuItem>
        <MenuItem selected={auth.filter?.priority===3} disabled={!auth.isLoggedIn} onClick={()=>{auth.updateFilter({priority:3});}} disableRipple>
          Medium Priority Task
        </MenuItem>
        <MenuItem selected={auth.filter?.priority===4} disabled={!auth.isLoggedIn} onClick={()=>{auth.updateFilter({priority:4});}} disableRipple>
          Low Priority Task
        </MenuItem>
        <MenuItem disabled={!auth.isLoggedIn} disableRipple>
         <FilterByDate /> 
        </MenuItem>
      </nav>
    </Box>
  );
};

export default LeftNavigationFilters;
