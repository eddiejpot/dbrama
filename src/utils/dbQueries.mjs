import axios from 'axios';
import BACKEND_URL from '../config/config.mjs';


// ================ Get All Users Diagrams
export const getAllDiagrams = async (userId) => {
  const { data: allDiagrams } = await axios.get(`${BACKEND_URL}/api/diagrams/${userId}`);
  return allDiagrams;
};
