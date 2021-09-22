import React, {useState,useContext,useRef, useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { DiagramContext } from "../../App.js";
import {createAction, editAndSaveAction} from "../../utils/reducer.mjs"
import colors from "../colors";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: "30vw",
    padding: "2rem",
  },
  dialogTitle:{
    textAlign: 'right',
    padding: '0',
    margin: '0',
  },
  saveButton:{
    padding: "1rem",
    backgroundColor: "",
  },
  buttonStyle:{
    backgroundColor: colors.gunmetal,
    color: colors.offwhite,
    width: '10rem',
    "&:hover": {
      backgroundColor: colors.brightteal
    }
  }

}));

export default function SaveDiagram() {
  
  const classes = useStyles();
  // Retrieve Context
  const { dispatch, diagramData, renderSnackBar, setRenderSnackBar, snackBarDetails} = useContext(DiagramContext);
  
  let diagramName = useRef(diagramData.title)

  useEffect(() => {
    diagramName.current = diagramData.title;
  },[diagramData]);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
    console.log(diagramData)
  };

  const handleClose = () => {
    setOpen(false);
  };


  const handleUpdateSubmit = async () => {
    // safety check if there is value in input
    if (diagramName.current.trim() !== ""){
      diagramData.title = diagramName.current;
    }
    const data = await editAndSaveAction(diagramData);
    //snack bar
    if (data.id){
      snackBarDetails.current = {type: 'success', message: `Updated: ${data.title}`}
      setRenderSnackBar(()=> renderSnackBar + 1);
    } else {
      snackBarDetails.current = {type: 'warning', message: `Error Updating: ${data.title}`}
      setRenderSnackBar(()=> renderSnackBar + 1);
    }
    setOpen(false);
  };

  const handleCreateSubmit = () => {
    // create
    // safety check if there is value in input
    if (diagramName.current.trim() !== ""){
      diagramData.title = diagramName.current;
    }
    // userId , diagramData
    createAction(1, diagramData);
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen} className={classes.buttonStyle}>
        Save Diagram
      </Button>
      <Dialog open={open} onClose={handleClose} >
        <DialogTitle className={classes.dialogTitle}>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500]
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent  className={classes.root}>
          <Typography variant="h6" component="h2" gutterBottom>
            {diagramData.id ? 'Rename Project?' : 'Project Title:'}
          </Typography>
          {diagramData.id ? null : 
            <div>
              <Typography gutterBottom >
                Looks like you were editing from a template
              </Typography>
              <Typography gutterBottom >
                Do you want to create a new project? Give your project a name.
              </Typography>
            </div>
          }

          <TextField
            defaultValue= {diagramData.title}
            autoFocus
            margin="dense"
            id="project_title"
            type="text"
            fullWidth
            autocomplete="off"
            autofill="off"
            name="anything-but-a-keyword-the-browser-may-check-against"
            onChange = {(e)=> {diagramName.current = e.target.value}}
          />
        </DialogContent>
        {diagramData.id ? <Button onClick={handleUpdateSubmit} className={classes.saveButton}>CONFIRM UPDATE</Button> : <Button onClick={handleCreateSubmit} className={classes.saveButton}>CREATE NEW PROJECT</Button>
        }
        {/* <Button onClick={handleSubmit} className={classes.saveButton}>{diagramData.id ? 'CONFIRM UPDATE' : 'CREATE NEW PROJECT'}</Button> */}
      </Dialog>
    </div>
  );
}
