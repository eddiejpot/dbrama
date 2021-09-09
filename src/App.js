import './App.css';
import React, { useEffect, useState } from "react";
import Diagram from "./components/Diagram/Diagram.jsx"
import CodeEditor from "./components/CodeEditor/CodeEditor.jsx"
import { dbmlToGoJs } from "./utils/parser/dbmlToGoJsObject.js";
import {initialStateDbml} from "./components/Diagram/diagramInitialStateDbml.js"

const result = dbmlToGoJs(initialStateDbml)

function App() {

  const [renderDiagram, setRenderDiagram] = useState(true);

  const ComponentToRender = () =>{
    if (renderDiagram){
      return(
        <Diagram diagramData = {result}/>
      )
    }
    return <h1>Loading</h1>
  }

  return (
    <div className="App">
      <CodeEditor />
      <button onClick={()=> setRenderDiagram(!renderDiagram)}>CLICK ME</button>
      <ComponentToRender />
    </div>
  );
}

export default App;
