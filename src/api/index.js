import axios from 'axios';

const api = axios.create({
  baseURL: 'http://84.201.169.126/api/v1/'
});

export const fetchAreas = async () => {
  const { data } = await api.get('result');

  return data;
};

export const fetchReports = async () => {
  const { data } = await api.get('reports');

  return data;
};

export const fetchReport = async id => {
  const { data } = await api.get(`reports/${id}`);

  return data;
};

export const uploadFile = async file => {
  const formData = new FormData();
  formData.append('file', file);

  return api.post('upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

export const uploadFiles = async files => {
  return Promise.all(files.map(uploadFile));
};
