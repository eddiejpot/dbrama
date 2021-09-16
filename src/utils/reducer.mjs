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
  CREATE: "CREATE",
  EDIT_AND_SAVE: "EDIT_AND_SAVE",
  DELETE: "DELETE",
};

// Reducer
export const diagramReducer = (state, action) => {
  switch (action.type) {

    case USER_ACTIONS.UPDATE_CODE_IN_CODE_EDITOR:
      return {...state, dbmlData: action.payload.dbmlData};

    case USER_ACTIONS.CREATE:
      return [...state, action.payload.task];

    case USER_ACTIONS.EDIT_AND_SAVE:
      return state.map((task, i) => {
        if (i === action.payload.taskId)
          return { ...task, done: action.payload.done };
        return task;
      });
    case USER_ACTIONS.DELETE:
      return state.filter((_task, i) => action.payload.taskId !== i);

    default:
      return state;
  }
};

// ACTION FUNCTIONS
export function updateCodeInCodeEditorAction(cleanDbmlCode) {
  return {
    type: USER_ACTIONS.UPDATE_CODE_IN_CODE_EDITOR,
    payload: {
        dbmlData: cleanDbmlCode
      }
    }
  };

export function createAction(data) {
  const {title, dbmlData, userId} = data;
  return {
    type: USER_ACTIONS.CREATE,
    payload: {
      diagramData: {
        title,
        dbmlData,
        userId,
      }
    }
  };
}

export function editAndSaveAction(taskId, done) {
  return {
    type: USER_ACTIONS.EDIT_AND_SAVE,
    payload: {
      taskId,
      done
    }
  };
}

export function deleteAction(taskId) {
  return {
    type: USER_ACTIONS.DELETE,
    payload: {
      taskId
    }
  };
}