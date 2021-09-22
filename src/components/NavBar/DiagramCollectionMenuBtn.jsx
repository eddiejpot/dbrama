import React, { useState,useContext } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { getCodeFromCollections, deleteAction, getAllUsersDiagramsAction } from "../../utils/reducer.mjs";
import { DiagramContext } from "../../App.js";

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5"
  }
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "top",
      horizontal: "right"
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "left"
    }}
    style={{ marginLeft: "3rem" }}
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

// =============================================
// ============================== MAIN COMPONENT
// =============================================
export default function DiagramCollectionMenuBtn({handleMenuClose}) {

  // Retrieve Context
  const { dispatch } = useContext(DiagramContext);

  const [anchorEl, setAnchorEl] = useState(null);
  const [digramCollectionArr, setDiagramCollectionArr] = useState([])

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    const fetchData = async () => {
      // const storeId = getCookie('storeId');
      const allUserDiagrams = await getAllUsersDiagramsAction(1);
      setDiagramCollectionArr(()=>allUserDiagrams);
    };
    fetchData();
  };

  const handleViewCollectionsClose = () => {
    setAnchorEl(null);
  };

  const handleCollectionsClick = (diagramData) => {
    dispatch(getCodeFromCollections(diagramData));
    handleViewCollectionsClose()
    handleMenuClose()
  }

  const handleDeleteCollectionsClick = (diagramData) => {
    dispatch(deleteAction(diagramData));
    handleViewCollectionsClose()
    handleMenuClose()
  }

  const ViewCollection = () => {
    if (digramCollectionArr.length > 0){
      const list = digramCollectionArr.map((diagram)=> {
        return (
          <StyledMenuItem key = {diagram.id}>
            <ListItemText primary= {diagram.title} onClick={()=>handleCollectionsClick(diagram)} />
            <IconButton aria-label="delete" onClick={()=>handleDeleteCollectionsClick(diagram)}>
              <DeleteIcon />
            </IconButton>
          </StyledMenuItem>
        )
      })
      return list
    }
    return <h1>Loading</h1>
  }


  return (
    <div>
      <Button
        aria-controls="customized-menu"
        aria-haspopup="true"
        // variant="contained"
        // color="primary"
        onClick={handleClick}
        style={{
          backgroundColor: "transparent"
        }}
      >
        <ListItemText primary="view collection" />
      </Button>
      <StyledMenu
        // id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleViewCollectionsClose}
      >
        
        <ViewCollection />

      </StyledMenu>
    </div>
  );
}
