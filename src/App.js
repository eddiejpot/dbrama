import './App.css';
import React, { useReducer, createContext,useState } from "react";
import DiagramAndCodeEditor from './components/DiagramAndCodeEditor/DiagramAndCodeEditor';
import NavBar from './components/NavBar/NavBar';
// import Diagram from "./components/Diagram/Diagram.jsx"
// import CodeEditor from "./components/CodeEditor/CodeEditor.jsx"
// import { dbmlToGoJs } from "./utils/parser/dbmlToGoJsObject.js";
// import {initialStateDbml} from "./components/Diagram/diagramInitialStateDbml.js"
// import SplitPane from "react-split-pane";

// import reducer module
import { diagramReducer, initialState } from "./utils/reducer.mjs";

// Create Context
export const DiagramContext = createContext(null);

function App() {
  //State mangement
  const [diagramData, dispatch] = useReducer(diagramReducer, initialState);

  return (
    <div className="App">
        <DiagramContext.Provider value={{dispatch, diagramData}}>
          <NavBar/>
          <DiagramAndCodeEditor/>
        </DiagramContext.Provider>
      </div>
  );
}

export default App;
