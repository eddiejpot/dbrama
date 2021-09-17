import React, { useEffect, useRef, useState,useContext } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DraftsIcon from "@material-ui/icons/Drafts";
import SendIcon from "@material-ui/icons/Send";
import { getCodeFromColletions } from "../../utils/reducer.mjs";
import { DiagramContext } from "../../App.js";
import { getAllDiagrams } from "../../utils/dbQueries.mjs";

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
    style={{ marginLeft: "1rem" }}
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

export default function DiagramCollectionMenuBtn() {

  // Retrieve Context
  const { dispatch, diagramData} = useContext(DiagramContext);
  // const dispatch = useContext(DiagramContext);

  const [anchorEl, setAnchorEl] = useState(null);
  const [digramCollectionArr, setDiagramCollectionArr,willRerenderCodeEditor, setWillRerenderCodeEditor] = useState([])
  // const diagramCollectionArr = useRef([]);
  

  // useEffect(() => {
  //   // fetch data on page load
  //   const fetchData = async () => {
  //     // const storeId = getCookie('storeId');
  //     const {allUserDiagrams} = await getAllDiagrams(1);
  //     diagramCollectionArr.current = allUserDiagrams;
  //     console.log(allUserDiagrams)
  //   };
  //   fetchData();
  // }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    const fetchData = async () => {
      // const storeId = getCookie('storeId');
      const {allUserDiagrams} = await getAllDiagrams(1);
      // diagramCollectionArr.current = allUserDiagrams;
      setDiagramCollectionArr(()=>allUserDiagrams);
    };
    fetchData();
  };


  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCollectionsClick = (diagramData) => {
    dispatch(getCodeFromColletions(diagramData));
  }

  const ViewCollection = () => {
    if (digramCollectionArr.length > 0){
      const list = digramCollectionArr.map((diagram)=> {
        return (
          <StyledMenuItem key = {diagram.id} onClick={()=>handleCollectionsClick(diagram)}>
            <ListItemText primary= {diagram.title} />
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
        onClose={handleClose}
      >
        
        <ViewCollection />

      </StyledMenu>
    </div>
  );
}
