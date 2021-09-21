import React, { useEffect, useState,useContext } from "react";
import * as go from "gojs";
import { ReactDiagram } from "gojs-react";
import {nodeDataArrayInitialState, linkDataArrayInitialState} from "./diagramInitialStateGoJsObj.js"
import "./styles.css"
import { DiagramContext } from "../../App.js";
import colors from "../colors.js";

//========================================== MAIN COMPONENT
export default function Diagram({diagramGoJsData}) {
  // Retrieve Context
  const { dispatch, diagramData} = useContext(DiagramContext);
  const {title: fileName} = diagramData;

  // State Management
  const [nodeDataArray, setNodeDataArray] = useState(diagramGoJsData.nodeDataArray);
  const [linkDataArray, setLinkDataArray] = useState(diagramGoJsData.linkDataArray);
  // const [nodeDataArray, setNodeDataArray] = useState(nodeDataArrayInitialState);
  // const [linkDataArray, setLinkDataArray] = useState(linkDataArrayInitialState);
  const [skipsDiagramUpdate, setSkipsDiagramUpdate] = useState(false);

  // maps for faster state modification
  const mapNodeKeyIdx = new Map();
  const mapLinkKeyIdx = new Map();
  refreshNodeIndex(nodeDataArray);
  refreshLinkIndex(linkDataArray);

  function refreshNodeIndex(nodeArr) {
    mapNodeKeyIdx.clear();
    nodeArr.forEach((n, idx) => {
      mapNodeKeyIdx.set(n.key, idx);
    });
  }

  function refreshLinkIndex(linkArr) {
    mapLinkKeyIdx.clear();
    linkArr.forEach((l, idx) => {
      mapLinkKeyIdx.set(l.key, idx);
    });
  }

  function handleModelChange(obj) {
    if (obj === null) return;
    const insertedNodeKeys = obj.insertedNodeKeys;
    const modifiedNodeData = obj.modifiedNodeData;
    const removedNodeKeys = obj.removedNodeKeys;
    const insertedLinkKeys = obj.insertedLinkKeys;
    const modifiedLinkData = obj.modifiedLinkData;
    const removedLinkKeys = obj.removedLinkKeys;

    // copy data to new array, but maintain references
    let nodeArr = nodeDataArray.slice();
    let linkArr = linkDataArray.slice();
    // maintain maps of modified data so insertions don't need slow lookups
    const modifiedNodeMap = new Map();
    const modifiedLinkMap = new Map();
    // only update state if we've actually made a change
    let arrChanged = false;

    // handle node changes
    if (modifiedNodeData) {
      modifiedNodeData.forEach((nd) => {
        modifiedNodeMap.set(nd.key, nd);
        const idx = mapNodeKeyIdx.get(nd.key);
        if (idx !== undefined && idx >= 0) {
          nodeArr.splice(idx, 1, nd);
          arrChanged = true;
        }
      });
    }
    if (insertedNodeKeys) {
      insertedNodeKeys.forEach((key) => {
        const nd = modifiedNodeMap.get(key);
        const idx = mapNodeKeyIdx.get(key);
        if (nd && idx === undefined) {
          mapNodeKeyIdx.set(nd.key, nodeArr.length);
          nodeArr.push(nd);
          arrChanged = true;
        }
      });
    }
    if (removedNodeKeys) {
      nodeArr = nodeArr.filter((nd) => {
        if (removedNodeKeys.includes(nd.key)) {
          arrChanged = true;
          return false;
        }
        return true;
      });
      refreshNodeIndex(nodeArr);
    }
    // handle link changes
    if (modifiedLinkData) {
      modifiedLinkData.forEach((ld) => {
        modifiedLinkMap.set(ld.key, ld);
        const idx = mapLinkKeyIdx.get(ld.key);
        if (idx !== undefined && idx >= 0) {
          linkArr.splice(idx, 1, ld);
          arrChanged = true;
        }
      });
    }
    if (insertedLinkKeys) {
      insertedLinkKeys.forEach((key) => {
        const ld = modifiedLinkMap.get(key);
        const idx = mapLinkKeyIdx.get(key);
        if (ld && idx === undefined) {
          mapLinkKeyIdx.set(ld.key, linkArr.length);
          linkArr.push(ld);
          arrChanged = true;
        }
      });
    }
    if (removedLinkKeys) {
      linkArr = linkArr.filter((ld) => {
        if (removedLinkKeys.includes(ld.key)) {
          arrChanged = true;
          return false;
        }
        return true;
      });
      refreshLinkIndex(linkArr);
    }

    if (arrChanged) {
      setNodeDataArray(nodeArr);
      setLinkDataArray(linkArr);
      setSkipsDiagramUpdate(true);
    }
  }
  
  // Diagram Setup
  function initDiagram() {
    const $ = go.GraphObject.make;
    const diagram = $(go.Diagram, 
      {
        allowDelete: false,
        allowCopy: false,
        "undoManager.isEnabled": true,
        // model: $(go.GraphLinksModel, {
        //   copiesArrays: true,
        //   copiesArrayObjects: true,
        //   linkKeyProperty: "id",
        // }),
        model: $(go.GraphLinksModel, {
          copiesArrays: true,
          copiesArrayObjects: true,
          linkFromPortIdProperty: "fromPort",
          linkToPortIdProperty: "toPort",
          linkKeyProperty: "id",
        }),
        layout: $(go.TreeLayout, { layerSpacing: 120, nodeSpacing: 50}),
        initialScale : 0.8,
        // layout: $(go.ForceDirectedLayout),
      }
    );

    // enable grid view
    diagram.grid.visible = true;
    diagram.toolManager.draggingTool.isGridSnapEnabled = true;
    diagram.toolManager.resizingTool.isGridSnapEnabled = true;
    diagram.grid =
      $(go.Panel, go.Panel.Grid,  // or "Grid"
        { gridCellSize: new go.Size(15, 15) },
        $(go.Shape, "LineH", { stroke: "#3A3A3A" }),
        $(go.Shape, "LineV", { stroke: "#3A3A3A" })
    );


    // define the Node template, representing an entity
    diagram.nodeTemplate = $(
      go.Node,
      "Auto", // the whole node panel
      {
        selectionAdorned: true,
        resizable: false,
        layoutConditions:
          go.Part.LayoutStandard & ~go.Part.LayoutNodeSized,
        fromSpot: go.Spot.AllSides,
        toSpot: go.Spot.AllSides,
      },
      new go.Binding("location", "location").makeTwoWay(),

      
      $(go.Panel, "Table",
        $(go.RowColumnDefinition, { column: 0, width: 150 }),
        $(go.RowColumnDefinition, { column: 1, width: 100 }),
        new go.Binding("itemArray", "items"),

        {
          // defaultAlignment: go.Spot.Left,
          padding: 1.5,
          defaultSeparatorPadding: new go.Margin(0, 10, 5, 10),
          background: colors.offwhite,
          itemTemplate:  
          // the row created for each item in the itemArray
            $(go.Panel, "TableRow", 
              // set ports based on name
              new go.Binding("portId", "name"),

              // column one
              $(go.TextBlock, new go.Binding("text", "name"),
                { column: 0,
                  margin: 4,
                  alignment: go.Spot.Left,
                },
                new go.Binding("font", "isKey",
                  function(data) { 
                    if (data){
                      return "bold 10pt sans-serif"
                    } 
                    return " 10pt sans-serif"
                  }),
                new go.Binding("stroke", "isKey",
                  function(data) { 
                    if (data){
                      return colors.grey;
                    } 
                    return colors.black;
                  }),
                ),
              
              // column two
              $(go.TextBlock, new go.Binding("text", "type"),
                { column: 1,
                  margin: 4,
                  alignment: go.Spot.Right,
                },
                new go.Binding("stroke", "isKey",
                  function(data) { 
                    if (data){
                      return colors.grey;
                    } 
                    return colors.black;
                  }),
                ),
            )
        },

        // define the header as a literal row in the table,
        // not bound to any item, but bound to Node data
        $(go.Panel, "TableRow",
          { 
            isPanelMain: true,
            background: colors.brightteal,
          },
          $(go.TextBlock, new go.Binding("text", "key"),
            { column: 0,
              margin: new go.Margin(8, 0, 8, 0),
              font: "bold 12pt sans-serif",
              stretch: go.GraphObject.Horizontal
            },
            ),

          $(go.TextBlock, "",
            { column: 1,
              margin: new go.Margin(8, 0, 8, 0),
              font: "bold 12pt sans-serif",
              stretch: go.GraphObject.Horizontal,
            })
        ),

      ) // end table

    ); // end Node

    // define the Link template, representing a relationship
    diagram.linkTemplate = $(
      go.Link, // the whole link panel
      {
        selectionAdorned: true,
        layerName: "Foreground",
        reshapable: true,
        routing: go.Link.AvoidsNodes,
        corner: 5,
        curve: go.Link.JumpOver
      },
      $(
        go.Shape, // the link shape
        { stroke: "#a6a6a6", strokeWidth: 1.5 }
      ),
      $(
        go.TextBlock, // the "from" label
        {
          textAlign: "center",
          font: "bold 14px sans-serif",
          stroke: colors.orange,
          segmentIndex: 1,
          segmentOffset: new go.Point(NaN, NaN),
          segmentFraction: 0.1,
          segmentOrientation: go.Link.OrientUpright
        },
        new go.Binding("text", "text")
      ),
      $(
        go.TextBlock, // the "to" label
        {
          textAlign: "center",
          font: "bold 14px sans-serif",
          stroke: colors.orange,
          segmentIndex: -1,
          segmentFraction: 0.33,
          segmentOffset: new go.Point(NaN, NaN),
          segmentOrientation: go.Link.OrientUpright
        },
        new go.Binding("text", "toText")
      )
    );

    // turn off animation when diagram updates / loads
    diagram.animationManager.initialAnimationStyle = go.AnimationManager.None;
    diagram.model = go.Model.fromJSON(diagram.model.toJSON());
    
    // handle exporting and downloading of diagram
    document.getElementById("exportDiagramButton").addEventListener("click", makeBlob);

    // When the blob is complete, make an anchor tag for it and use the tag to initiate a download
    // Works in Chrome, Firefox, Safari, Edge, IE11
    function myCallback(blob) {
      var url = window.URL.createObjectURL(blob);
      var filename = `${fileName}.png`;

      var a = document.createElement("a");
      a.style = "display: none";
      a.href = url;
      a.download = filename;

      // IE 11
      if (window.navigator.msSaveBlob !== undefined) {
        window.navigator.msSaveBlob(blob, filename);
        return;
      }

      document.body.appendChild(a);
      requestAnimationFrame(function() {
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      });
    }

    function makeBlob() {
      var blob = diagram.makeImageData({ background: "white", returnType: "blob", callback: myCallback });
    }
    window.addEventListener('DOMContentLoaded', initDiagram);
    return diagram;
  }


  return (
      <ReactDiagram
        divClassName="diagram-component"
        initDiagram={initDiagram}
        nodeDataArray={nodeDataArray}
        linkDataArray={linkDataArray}
        skipsDiagramUpdate={skipsDiagramUpdate}
        onModelChange={handleModelChange}
      />
  );
}