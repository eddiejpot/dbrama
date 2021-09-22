import axios from 'axios';
import BACKEND_URL from '../config/config.mjs';


// ================ Get All Users Diagrams
export const getAllDiagrams = async (userId) => {
  const { data: allDiagrams } = await axios.get(`${BACKEND_URL}/api/diagrams/${userId}`);
  return allDiagrams;
};

// ================ Edit Selected Diagram
export const editSelectedDiagram = async (diagramData) => {
  const {data} = await axios.put(`${BACKEND_URL}/api/diagrams/update/${diagramData.id}`, diagramData);
  return data;
};

// ================ Delete Selected Diagram
export const deleteSelectedDiagram = async (diagramData) => {
  await axios.delete(`${BACKEND_URL}/api/diagrams/delete/${diagramData.id}`, diagramData);
};

// ================ Create New Diagram
export const createDiagram = async (userId, diagramData) => {
  const {data} = await axios.post(`${BACKEND_URL}/api/diagrams/create/${userId}`, diagramData);
  return data;
};