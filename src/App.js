import './App.css';
import React, { useReducer, createContext, useState, useRef, useEffect } from "react";
import DiagramAndCodeEditor from './components/DiagramAndCodeEditor/DiagramAndCodeEditor';
import NavBar from './components/NavBar/NavBar';
import Popper from './components/Models/Popper.jsx'

// import reducer module
import { diagramReducer, initialState } from "./utils/reducer.mjs";

// Create Context
export const DiagramContext = createContext(null);

function App() {
  //State mangement
  const [diagramData, dispatch] = useReducer(diagramReducer, initialState);

  return (
    <div className="App" id="App">
        <DiagramContext.Provider value={{dispatch, diagramData}}>
          <NavBar/>
          <Popper/>
          <DiagramAndCodeEditor/>
        </DiagramContext.Provider>
      </div>
  );
}

export default App;
