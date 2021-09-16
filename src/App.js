import './App.css';
import React from "react";
import DiagramAndCodeEditor from './components/DiagramAndCodeEditor/DiagramAndCodeEditor';
import NavBar from './components/NavBar/NavBar';
// import Diagram from "./components/Diagram/Diagram.jsx"
// import CodeEditor from "./components/CodeEditor/CodeEditor.jsx"
// import { dbmlToGoJs } from "./utils/parser/dbmlToGoJsObject.js";
// import {initialStateDbml} from "./components/Diagram/diagramInitialStateDbml.js"
// import SplitPane from "react-split-pane";

function App() {

  return (
    <div className="App">
      <NavBar/>
      <DiagramAndCodeEditor />
    </div>
  );
}

export default App;
