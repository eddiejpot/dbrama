import React, { useEffect, useState, useRef, useContext } from "react";
import Diagram from "../Diagram/Diagram.jsx"
import CodeEditor from "../CodeEditor/CodeEditor.jsx";
import { dbmlToGoJs } from "../../utils/parser/dbmlToGoJsObject.js";
// import diagramDataInitialStateInDbml from "../Diagram/diagramInitialStateDbml.js"
import { DiagramContext } from "../../App.js";
// import diagramDataInitialStateInGoJs from "../Diagram/diagramInitialStateGoJsObj.js"
import SplitPane from "react-split-pane";
import cleanUpCodeFromEditor from "../../utils/parser/codeEditorCleaner.js"
import './style.css';

//========================================== MAIN COMPONENT
export default function DiagramAndCodeEditor() {
  // Retrieve Context
  const { dispatch, diagramData } = useContext(DiagramContext);
  const {dbmlData} = diagramData;

  // Local State
  const [diagramGoJsData, setDiagramGoJsData] = useState();
  const isDataForDiagramReady = useRef(false);
  const lastDbmlDataWithoutErrors = useRef(dbmlData);

  useEffect(() => {
    // get updated code from codeeditor component in dbml format and clean it
    const cleanDbmlData = cleanUpCodeFromEditor(dbmlData)
    if (cleanDbmlData.length !== 0){
      console.log('RENDERING =>')
      let parseDbmlToGoJs;

      if (dbmlToGoJs(cleanDbmlData) === 'error'){
        console.log('ERROR IN PARSING =>')
        parseDbmlToGoJs = dbmlToGoJs(lastDbmlDataWithoutErrors.current);

      } else {
        console.log('DI NOT DETECT ERROR IN PARSING =>')
        lastDbmlDataWithoutErrors.current = cleanDbmlData;
        parseDbmlToGoJs = dbmlToGoJs(cleanDbmlData);
      }
      // update state
      isDataForDiagramReady.current = true;
      setDiagramGoJsData(()=>parseDbmlToGoJs);

    } else {
      console.log('NOT GONNA RENDER');
      isDataForDiagramReady.current = false;
    }

  },[dbmlData]);


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
        <CodeEditor/>
        <DiagramToRender/>
      </SplitPane>
  );
}
