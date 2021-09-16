import React, { useState, useRef,useContext } from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools"
import "ace-builds/webpack-resolver";
import cleanUpCodeFromEditor from "../../utils/parser/codeEditorCleaner.js"
import { DiagramContext } from "../../App.js";
import { initialState, updateCodeInCodeEditorAction } from "../../utils/reducer.mjs";

//========================================== MAIN COMPONENT

export default function CodeEditor() {
  // local state management
  const codeEditorRef = useRef(initialState.dbmlData);

  // Retrieve Context
  const dispatch = useContext(DiagramContext);

  function onChange(codeFromEditor) {
    codeEditorRef.current = codeFromEditor;
    const cleanedCode = cleanUpCodeFromEditor(codeFromEditor)
    dispatch(updateCodeInCodeEditorAction(cleanedCode))
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