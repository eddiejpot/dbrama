import React,{useState,useEffect,useContext} from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { DiagramContext } from "../../App.js";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

// types: error, warning, info, success
export default function CustomSnackBar() {
  // Retrieve Context
  const {  renderSnackBar, snackBarDetails} = useContext(DiagramContext);
  const {type, message} = snackBarDetails.current
  
  // state management
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(()=>true);
  },[renderSnackBar]);

  // const handleClick = () => {
  //   setOpen(true);
  // };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}
       anchorOrigin={{vertical: "bottom",horizontal: "center"}}
       >
        <Alert onClose={handleClose} severity={type} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </Stack>
  );
}