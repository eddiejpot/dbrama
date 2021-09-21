import React, {useState,useContext} from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Draggable from 'react-draggable';
import { DiagramContext } from "../../App.js";
import FaqAccordion from "./FaqAccordion.jsx"

import Box from '@material-ui/core/Box';
import Popper from '@material-ui/core/Popper';

const useStyles = makeStyles((theme) => ({
  dialogContainer: {
    position: "absolute",
    zIndex: 99,
    cursor: 'all-scroll',
    top: '1200px',
    left: '1200px',
  },
  draggable: {
    // position: "absolute",
    // marginLeft: "auto",
    // marginRight: "auto",
    // top: '1200px',
    // left: '1200px',
    // textAlign: "center",
    defaultPosition: {x: 2000, y: 10},
  }
}));

export default function DraggableDialog() {
  const classes = useStyles();
  const [open, setOpen] = useState(true);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Draggable 
      defaultPosition={{ x: 500, y: 70 }}
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
      className = {classes.draggable}
    >
      <Popper id = "draggable-dialog-title" open={true} className = {classes.dialogContainer}>
          <FaqAccordion/>
      </Popper>
    </Draggable>
  );
}
