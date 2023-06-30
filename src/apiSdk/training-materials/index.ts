import axios from 'axios';
import queryString from 'query-string';
import { TrainingMaterialInterface, TrainingMaterialGetQueryInterface } from 'interfaces/training-material';
import { GetQueryInterface } from '../../interfaces';

export const getTrainingMaterials = async (query?: TrainingMaterialGetQueryInterface) => {
  const response = await axios.get(`/api/training-materials${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createTrainingMaterial = async (trainingMaterial: TrainingMaterialInterface) => {
  const response = await axios.post('/api/training-materials', trainingMaterial);
  return response.data;
};

export const updateTrainingMaterialById = async (id: string, trainingMaterial: TrainingMaterialInterface) => {
  const response = await axios.put(`/api/training-materials/${id}`, trainingMaterial);
  return response.data;
};

export const getTrainingMaterialById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/training-materials/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteTrainingMaterialById = async (id: string) => {
  const response = await axios.delete(`/api/training-materials/${id}`);
  return response.data;
};
