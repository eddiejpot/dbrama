import React, { useEffect, useState, useRef, useContext } from "react";
import Typography from "@material-ui/core/Typography";
import SplitPane from "react-split-pane";
import './style.css';
import Diagram from "../Diagram/Diagram.jsx"
import CodeEditor from "../CodeEditor/CodeEditor.jsx";
import { dbmlToGoJs } from "../../utils/parser/dbmlToGoJsObject.js";
import { DiagramContext } from "../../App.js";
import cleanUpCodeFromEditor from "../../utils/parser/codeEditorCleaner.js"

// =============================================
// ============================== MAIN COMPONENT
// =============================================
export default function DiagramAndCodeEditor() {
  // Retrieve Context
  const { diagramData } = useContext(DiagramContext);
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

  },[dbmlData, diagramData]);

  const DiagramToRender = () =>{
    if (isDataForDiagramReady.current){
      return(
        <>
          <Typography 
          style = {{
            position: 'absolute',
            zIndex: 99,
            color: 'white',
            fontSize: '1rem',
            bottom: '10px',
            left: '1rem',
          }}
          >{`Project: ${diagramData.title}`} </Typography>
          <Diagram diagramGoJsData = {diagramGoJsData}/>
        </>
      )
    }
    return <h1>Loading</h1>
  }

  return (
    <div>
      <SplitPane split="vertical" minSize={50} defaultSize={450} style={{height: 'calc(100% - 4rem)', zIndex:'1',  position: 'absolute'}}>
        <CodeEditor/>
          <DiagramToRender/>
      </SplitPane>
    </div>
  );
}
