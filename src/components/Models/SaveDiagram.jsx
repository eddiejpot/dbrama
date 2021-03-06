import React, {useState,useContext,useRef, useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import { DiagramContext } from "../../App.js";
import {createAction, editAndSaveAction} from "../../utils/reducer.mjs"
import colors from "../colors";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme) => ({
  dialogContent: {
    minWidth: "30vw",
    padding: "2rem",
    display: "flex",
    flexDirection: "column",
  },
  dialogTitle:{
    textAlign: 'right',
    padding: '0',
    margin: '0',
  },
  saveButton:{
    padding: "1rem",
    backgroundColor: colors.teal,
    width: "90%",
    alignSelf: "center",
    margin: "1rem",
    "&:hover": {
      backgroundColor: colors.brightteal,
      color: colors.offwhite,
    }
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

// =============================================
// ============================== MAIN COMPONENT
// =============================================
export default function SaveDiagram() {
  const classes = useStyles();
  // Retrieve Context
  const { diagramData, renderSnackBar, setRenderSnackBar, snackBarDetails} = useContext(DiagramContext);
  let diagramName = useRef(diagramData.title)

  useEffect(() => {
    diagramName.current = diagramData.title;
  },[diagramData]);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const handleUpdateSubmit = async () => {
    // safety check if there is value in input
    if (diagramName.current.trim() !== ""){
      diagramData.title = diagramName.current;
    }
    const editedDiagramData = await editAndSaveAction(diagramData);
    //snack bar
    if (editedDiagramData.id){
      snackBarDetails.current = {type: 'success', message: `Updated: ${editedDiagramData.title}`}
      setRenderSnackBar(()=> renderSnackBar + 1);
    } else {
      snackBarDetails.current = {type: 'warning', message: `Error Updating: ${editedDiagramData.title}`}
      setRenderSnackBar(()=> renderSnackBar + 1);
    }
    setOpen(false);
  };

  const handleCreateSubmit = async () => {
    // create
    // safety check if there is value in input
    if (diagramName.current.trim() !== ""){
      diagramData.title = diagramName.current;
    }
    // userId , diagramData
    const createdDiagramData = await createAction(1, diagramData);
    //snack bar
    if (createdDiagramData.id){
      snackBarDetails.current = {type: 'success', message: `Created: ${createdDiagramData.title}`}
      setRenderSnackBar(()=> renderSnackBar + 1);
    } else {
      snackBarDetails.current = {type: 'warning', message: `Error Creating Diagram: ${createdDiagramData.title}`}
      setRenderSnackBar(()=> renderSnackBar + 1);
    }
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
        <DialogContent  className={classes.dialogContent}>
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
      </Dialog>
    </div>
  );
}
