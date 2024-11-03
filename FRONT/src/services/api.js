import axios from 'axios';

const API_URL = 'http://localhost:3000/workflow'; // URL de votre API
const API_BASE_URL = 'http://localhost:3000'; // URL de votre API

export const getWorkflows = async () => {
  const response = await axios.get(`${API_BASE_URL}/workflows`);
  return response;
};

export const createWorkflow = async (workflowData) => {
  return await axios.post(API_URL, workflowData);
};

export const executeWorkflow = async (workflowId) => {
  return await axios.post(`${API_URL}/${workflowId}/execute`);
};

export const statusWorkflow = async (workflowId) => {
  return await axios.get(`${API_URL}/${workflowId}/status`);
};

export const deleteWorkflow = async (workflowId) => {
  return await axios.delete(`${API_URL}/${workflowId}`);
};

export const getModelStatus = async (modelId) => {
  const response = await axios.get(`${API_BASE_URL}/model/${modelId}/status`);
  return response; // Assurez-vous que vous renvoyez la réponse
};

export const modelPrediction = async (inputData) => {
  const response = await axios.post(`${API_BASE_URL}/model/${modelId}/predict`, {
      input_data: inputData,
  });
  return response;
};

export const getModels = () => {
  return axios.get(`${BASE_URL}/models`);
};

export const deleteModel = (modelId) => {
  return axios.delete(`${API_BASE_URL}/model/${modelId}`, {
    headers: { 'Content-Type': 'application/json' },
  });
};

export const upload = (file) => {
  const formData = new FormData();
  formData.append("file", file);

  return axios.post(`${BASE_URL}/file`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};