import React, { useEffect, useState, useRef } from "react";
import Diagram from "../Diagram/Diagram.jsx"
import CodeEditor from "../CodeEditor/CodeEditor.jsx";
import { dbmlToGoJs } from "../../utils/parser/dbmlToGoJsObject.js";
import diagramDataInitialStateInDbml from "../Diagram/diagramInitialStateDbml.js"
// import diagramDataInitialStateInGoJs from "../Diagram/diagramInitialStateGoJsObj.js"
import SplitPane from "react-split-pane";
import './style.css';

//========================================== MAIN COMPONENT
export default function DiagramAndCodeEditor() {
  // Manage State
  const [diagramDbmlData, setDiagramDbmlData] = useState(diagramDataInitialStateInDbml);
  const [diagramGoJsData, setDiagramGoJsData] = useState();
  const isDataForDiagramReady = useRef(false);
  const lastDbmlDataWithoutErrors = useRef(diagramDataInitialStateInDbml);




  useEffect(() => {
    // get updated code from codeeditor component in dbml format
    if (diagramDbmlData.length !== 0){
      console.log('RENDERING ==========>')
      let parseDbmlToGoJs;
      if (dbmlToGoJs(diagramDbmlData) === 'error'){
        console.log('ERROR IN PARSING ==========>')
        parseDbmlToGoJs = dbmlToGoJs(lastDbmlDataWithoutErrors.current);
      } else {
        console.log('DI NOT DETECT ERROR IN PARSING ==========>')
        lastDbmlDataWithoutErrors.current = diagramDbmlData;
        parseDbmlToGoJs = dbmlToGoJs(diagramDbmlData);
      }
      // update state
      isDataForDiagramReady.current = true;
      setDiagramGoJsData(()=>parseDbmlToGoJs);

    } else {
      console.log('NO GONNA RENDER');
      isDataForDiagramReady.current = false;
    }

  },[diagramDbmlData]);


  const DiagramToRender = () =>{
    if (isDataForDiagramReady.current){
      return(
        <Diagram diagramData = {diagramGoJsData}/>
      )
    }
    return <h1>Loading</h1>
  }

  return (
      <SplitPane split="vertical" minSize={50} defaultSize={450} style={{height: 'calc(100% - 4rem)'}}>
        <CodeEditor diagramDbmlData={diagramDbmlData} setDiagramDbmlData={setDiagramDbmlData}/>
        <DiagramToRender/>
      </SplitPane>
  );
}
