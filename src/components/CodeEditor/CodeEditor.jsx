import React from "react";
// import { render } from "react-dom";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools"
import "ace-builds/webpack-resolver";
import {initialStateDbml} from "../../components/Diagram/diagramInitialStateDbml.js"
//========================================== MAIN COMPONENT

export default function CodeEditor() {

  function onChange(newValue) {
    console.log("change", newValue);
  }
  
  // Render editor
  return (
  <AceEditor
    placeholder= "ola"
    mode="javascript"
    theme="monokai"
    name="UNIQUE_ID_OF_DIV"
    // onLoad={this.onLoad}
    onChange={onChange}
    fontSize={14}
    showPrintMargin={false}
    showGutter={true}
    highlightActiveLine={true}
    value={initialStateDbml}
    setOptions={{
    enableBasicAutocompletion: false,
    enableLiveAutocompletion: false,
    enableSnippets: false,
    showLineNumbers: true,
    tabSize: 2,
    useWorker: false, // disable syntax checker
    }}/>
    // document.getElementById("example")
  );
}