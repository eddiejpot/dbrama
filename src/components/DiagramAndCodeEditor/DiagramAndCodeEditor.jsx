import React, { useEffect, useState } from "react";
import Diagram from "../Diagram/Diagram.jsx"
import CodeEditor from "../CodeEditor/CodeEditor.jsx";
import { dbmlToGoJs } from "../../utils/parser/dbmlToGoJsObject.js";
import {initialStateDbml} from "../Diagram/diagramInitialStateDbml.js"
import SplitPane from "react-split-pane";
import './style.css';

const result = dbmlToGoJs(initialStateDbml)

//========================================== MAIN COMPONENT
export default function DiagramAndCodeEditor() {

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
      {/* <button onClick={()=> setRenderDiagram(!renderDiagram)}>CLICK ME</button> */}
      <SplitPane split="vertical" minSize={50} defaultSize={450}>
        <CodeEditor/>
        <ComponentToRender />
      </SplitPane>
    </div>
  );
}
