import './App.css';
import React, { useReducer, createContext, useState, useRef } from "react";
import DiagramAndCodeEditor from './components/DiagramAndCodeEditor/DiagramAndCodeEditor';
import NavBar from './components/NavBar/NavBar';
import Popper from './components/Models/Popper.jsx'
import CustomSnackBar from './components/SnackBar/CustomSnackBar';
// import reducer module
import { diagramReducer, initialState } from "./utils/reducer.mjs";

// Create Context
export const DiagramContext = createContext(null);

function App() {
  //State mangement
  const [diagramData, dispatch] = useReducer(diagramReducer, initialState);
  const [renderSnackBar, setRenderSnackBar] = useState(1);
  const snackBarDetails = useRef({type: '', message: ''})

  return (
    <div className="App" id="App">
        <DiagramContext.Provider value={{dispatch, diagramData, renderSnackBar, setRenderSnackBar, snackBarDetails}}>
          <NavBar/>
          <Popper/>
          <DiagramAndCodeEditor/>
          <CustomSnackBar/>
        </DiagramContext.Provider>
      </div>
  );
}

export default App;
