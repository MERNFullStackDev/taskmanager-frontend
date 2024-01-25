import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {Typography } from '@mui/material';
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AuthContext } from '../../context/auth-context';

const FilterByDate = ({menuClose=null, fontSize='small'}) => {
  const [open, setOpen] = React.useState(false);
  const [dateValue, setDateValue] = React.useState(null);
  const auth = React.useContext(AuthContext);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    if(menuClose){
        menuClose();
    }
  };

  return (
    <React.Fragment>
      <Typography sx={{fontSize:fontSize}} onClick={handleClickOpen}>
        Task Filter By Due Date
      </Typography>
     
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            if(dateValue){
              const dueDate = {dueDate:new Date(dateValue.toISOString()).toDateString()}
              auth.updateFilter(dueDate);
            }
            handleClose();
          },
        }}
      >
        <DialogTitle>Due Date Filter</DialogTitle>
        <DialogContent>
          <DialogContentText>
          <Typography variant="h8" sx={{marginBottom:'0.5rem'}} component="div">Select Due Date to Apply Filter</Typography>
          </DialogContentText>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  value={dateValue}
                  onChange={(newValue) => setDateValue(newValue)}
                />
              </DemoContainer>
            </LocalizationProvider>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Apply Filter</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default FilterByDate;