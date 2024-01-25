import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Avatar } from '@mui/material';
import { lightBlue } from '@mui/material/colors';
import DropDownFilters from "../dropdownfilters/dropdownfilters.component";
import { AuthContext } from '../../context/auth-context';
import { useNavigate } from 'react-router-dom';

const TopBarNavigation = () => {
  const auth = React.useContext(AuthContext);
  const navigate = useNavigate();
  const getFirstTwoLetters = (name) => {
    if (name && name.length >= 2) {
      return name.slice(0, 2);
    } else {
      return 'Invalid Name';
    }
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
            <Avatar sx={{ cursor:'pointer', bgcolor: lightBlue[500], textTransform: 'uppercase' }} onClick={()=>{
              navigate("/");
            }}>{getFirstTwoLetters(auth.name)}</Avatar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, marginLeft:'16px'}}>
            Task Manager
          </Typography>
          <DropDownFilters />
          {!auth.isLoggedIn && (<Button color="inherit" onClick={()=>{
            navigate("/login");
          }}>Login</Button>)}
          {auth.isLoggedIn && (<Button color="inherit" onClick={()=>{
            auth.logout();
            navigate("/login");
            }}>Logout</Button>)}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default TopBarNavigation;