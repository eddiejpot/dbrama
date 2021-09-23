import { createDiagram, editSelectedDiagram, deleteSelectedDiagram, getAllDiagrams } from "./dbQueries.mjs";
import diagramDataInitialStateInDbml from "../components/Diagram/diagramInitialStateDbml.js"

// Export initial state
export const initialState = 
  {
    title: "template",
    dbmlData: diagramDataInitialStateInDbml,
    userId: 1,
  }
;

// set actions for reducer to avoid typos
export const USER_ACTIONS = {
  UPDATE_CODE_IN_CODE_EDITOR: "UPDATE_CODE_IN_CODE_EDITOR", // user is still working on their code 
  GET_CODE_FROM_COLLECTIONS: "GET_CODE_FROM_COLLECTIONS",
  DELETE: "DELETE",
  NEW_TEMPLATE: "NEW_TEMPLATE"
};

// Reducer
export const diagramReducer = (state, action) => {
  switch (action.type) {

    case USER_ACTIONS.UPDATE_CODE_IN_CODE_EDITOR:
      return {...state, dbmlData: action.payload.dbmlCode};

    case USER_ACTIONS.GET_CODE_FROM_COLLECTIONS:
      const {title, dbmlData, userId, id} = action.payload.diagramData;
      return {...state, title, dbmlData, userId ,id};

    case USER_ACTIONS.DELETE:
      return {...initialState, title:'template'};

    case USER_ACTIONS.NEW_TEMPLATE:
      return {...initialState, title:'template'};

    default:
      return state;
  }
};

// ACTION FUNCTIONS
export function getCodeFromCollections(diagramData) {
  return {
    type: USER_ACTIONS.GET_CODE_FROM_COLLECTIONS,
    payload: {
        diagramData,
      }
    }
  };



export function updateCodeInCodeEditorAction(dbmlCode) {
  return {
    type: USER_ACTIONS.UPDATE_CODE_IN_CODE_EDITOR,
    payload: {
        dbmlCode,
      }
    }
  };

export function newTemplate() {
  return {
    type: USER_ACTIONS.NEW_TEMPLATE,
    }
  };

  
export function deleteAction(diagramData) {
    deleteSelectedDiagram(diagramData)
    return {
      type: USER_ACTIONS.DELETE,
    };
  }
  

// PURE DB FUNCTIONS
export async function getAllUsersDiagramsAction(userId) {
  const {allUserDiagrams} = await getAllDiagrams(1);
  return allUserDiagrams;
} 

export async function editAndSaveAction(diagramData) {
  // send query to edit
  const data = await editSelectedDiagram(diagramData);
  return data;
}

export async function createAction(usersId , diagramData) {
  // send query to create 
  const data = await createDiagram(usersId , diagramData)
  return data;
}