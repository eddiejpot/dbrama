import React, { useState, useRef } from "react";
// import { render } from "react-dom";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools"
import "ace-builds/webpack-resolver";
import diagramDataInitialStateInDbml from "../../components/Diagram/diagramInitialStateDbml.js";
import cleanUpCodeFromEditor from "../../utils/parser/codeEditorCleaner.js"
//========================================== MAIN COMPONENT

export default function CodeEditor({diagramDbmlData, setDiagramDbmlData}) {
  const codeEditorRef = useRef(diagramDataInitialStateInDbml);

  function onChange(codeFromEditor) {
    codeEditorRef.current = codeFromEditor;
    // // console.log("CHANGE", codeFromEditor);
    // let newstrings = codeFromEditor.split("\n"); 
    // console.log(newstrings)
    // parse through and only return completed lines of code
    const cleanedCode = cleanUpCodeFromEditor(codeFromEditor)
    setDiagramDbmlData(()=> cleanedCode);
  }
  
  // Render editor
  return (
    <AceEditor
      placeholder= "ola"
      mode="javascript"
      theme="monokai"
      name="editor"
      // onLoad={this.onLoad}
      onChange={onChange}
      fontSize={14}
      showPrintMargin={false}
      showGutter={true}
      highlightActiveLine={true}
      value={codeEditorRef.current}
      setOptions={{
      enableBasicAutocompletion: false,
      enableLiveAutocompletion: false,
      enableSnippets: false,
      showLineNumbers: true,
      tabSize: 2,
      useWorker: false, // disable syntax checker
      }}
      style={{
        height: '100%',
        width: '100%',
        // minWidth: '200px',
      }}
      />
      // document.getElementById("editorContainer")
  );
}