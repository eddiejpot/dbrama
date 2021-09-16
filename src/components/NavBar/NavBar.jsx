import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import FaceIcon from "@material-ui/icons/Face";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DiagramsMenuBtn from "./DiagramsMenuBtn.jsx";
import colors from "../colors.js";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    position:"sticky",
    width: '100vw',
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  toolBar: {
    display: "flex",
    justifyContent: "space-between",
  },
  navRight: {
    display: "flex",
    alignItems: "center"
  },
  navLeft: {
    display: "flex"
  },
  iconAndText: {
    display: "flex",
    alignItems: "center",
    "& > *": {
      marginLeft: "0.2rem"
    }
  },
  buttonGroup: {
    display: "flex",
    marginLeft: "20rem",
    "& > *": {
      marginLeft: "2rem"
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

export default function NavBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{backgroundColor: colors.darkgrey, color: colors.offwhite}}>
        <Toolbar className={classes.toolBar}>
          <div className={classes.navLeft}>
            <div className={classes.iconAndText}>
              <AccountTreeIcon fontSize="small" />
              <Typography variant="h6" edge="start">
                dbrama
              </Typography>
            </div>

            <div className={classes.buttonGroup}>
              <DiagramsMenuBtn />
              <Button className={classes.buttonStyle}>Save Diagram</Button>
              <Button className={classes.buttonStyle} id='exportDiagramButton'>Export</Button>
            </div>
          </div>
          <div className={classes.navRight} edge="end">
            <div className={classes.iconAndText}>
              <Typography variant="h6">welcome guest!</Typography>
              <FaceIcon fontSize="small" />
            </div>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
