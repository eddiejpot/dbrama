import './App.css';
import React, { useEffect, useState } from "react";
import Diagram from './components/Diagram/Diagram.jsx'

function App() {

  const [renderDiagram, setRenderDiagram] = useState(true);

  const ComponentToRender = () =>{
    if (renderDiagram){
      return(
        <Diagram/>
      )
    }
    return <h1>Loading</h1>
  }

  return (
    <div className="App">
      <button onClick={()=> setRenderDiagram(!renderDiagram)}>CLICK ME</button>
      <ComponentToRender />
    </div>
  );
}

export default App;
