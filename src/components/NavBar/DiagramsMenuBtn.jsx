import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import LibraryAddIcon from "@material-ui/icons/LibraryAdd";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import DiagramCollectionMenuBtn from "./DiagramCollectionMenuBtn.jsx";
import colors from "../colors.js";

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5"
  }
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "left"
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "left"
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    // "&:focus": {
    //   backgroundColor: theme.palette.primary.main,
    //   "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
    //     color: theme.palette.common.white
    //   }
    // }
  }
}))(MenuItem);


const useStyles = makeStyles((theme) => ({
  buttonStyle:{
    backgroundColor: colors.brightteal,
    color: colors.gunmetal,
    width: '10rem',
    "&:hover": {
      backgroundColor: colors.teal,
      color: colors.offwhite,
    }
  }
}));


export default function DiagramsMenuBtn() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="contained"
        color="primary"
        onClick={handleClick}
        className={classes.buttonStyle}
      >
        My Diagrams
      </Button>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <StyledMenuItem>
          <ListItemIcon>
            <LibraryAddIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="CREATE" />
        </StyledMenuItem>
        <StyledMenuItem>
          <ListItemIcon>
            <LibraryBooksIcon fontSize="small" />
          </ListItemIcon>
          <DiagramCollectionMenuBtn />
        </StyledMenuItem>
      </StyledMenu>
    </div>
  );
}
