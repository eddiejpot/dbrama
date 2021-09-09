import React, { useEffect, useState } from "react";
import * as go from "gojs";
import { ReactDiagram } from "gojs-react";
import {nodeDataArrayInitialState, linkDataArrayInitialState} from "./diagramInitialState.js"
import "./styles.css"

const colors = {
  red: "#be4b15",
  green: "#52ce60",
  blue: "#6ea5f8",
  lightred: "#fd8852",
  lightblue: "#afd4fe",
  lightgreen: "#b9e986",
  pink: "#faadc1",
  purple: "#d689ff",
  orange: "#fdb400",
  grey: "#a3a3a3",
  black: "#191919",
  offwhite: "#FAF9F6",
};

//========================================== MAIN COMPONENT
export default function Diagram() {
  // State Management
  const [nodeDataArray, setNodeDataArray] = useState(nodeDataArrayInitialState);
  const [linkDataArray, setLinkDataArray] = useState(linkDataArrayInitialState);
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
        layout: $(go.TreeLayout, { layerSpacing: 80, nodeSpacing: 50 }),
        // layout: $(go.ForceDirectedLayout),
      }
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
            background: colors.lightblue,
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
          stroke: "#1967B3",
          segmentIndex: 0,
          segmentOffset: new go.Point(NaN, NaN),
          segmentOrientation: go.Link.OrientUpright
        },
        new go.Binding("text", "text")
      ),
      $(
        go.TextBlock, // the "to" label
        {
          textAlign: "center",
          font: "bold 14px sans-serif",
          stroke: "#1967B3",
          segmentIndex: -1,
          segmentOffset: new go.Point(NaN, NaN),
          segmentOrientation: go.Link.OrientUpright
        },
        new go.Binding("text", "toText")
      )
    );

    return diagram;
  }


  useEffect(() => {
    
  });

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