import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { Context } from '../../App';
import { useNavigate } from 'react-router-dom';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Logout=()=>{
  const navigate = useNavigate(); 
  const{setToken , setEnter} = React.useContext(Context)
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  const logout = () => {
    setEnter(false);
    setToken(null);
    localStorage.clear();
    setOpen(false) ; 
    navigate("/home")
  }

  return (
    <React.Fragment>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"You Want exit from page"}</DialogTitle>
        <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
           
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={logout}>Agree</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default Logout ; 