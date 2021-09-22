import React from 'react';
import Draggable from 'react-draggable';
import { makeStyles } from "@material-ui/core/styles";
import Popper from '@material-ui/core/Popper';
import FaqAccordion from "./FaqAccordion.jsx"

const useStyles = makeStyles((theme) => ({
  dialogContainer: {
    position: "absolute",
    zIndex: 99,
    cursor: 'all-scroll',
    top: '1200px',
    left: '1200px',
  },
  draggable: {
    defaultPosition: {x: 2000, y: 10},
  }
}));

// =============================================
// ============================== MAIN COMPONENT
// =============================================
export default function DraggableDialog() {
  const classes = useStyles();

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
