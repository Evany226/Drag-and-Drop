import axios from "axios";
const baseUrl = "http://localhost:3001/api/notes";

const getAll = async (accessToken) => {
  const request = axios.get(baseUrl, {
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return request.then((response) => response.data);
};

const create = (newObject, accessToken) => {
  const request = axios.post(baseUrl, newObject, {
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return request.then((response) => response.data);
};

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject, {
    headers: {
      "content-type": "application/json",
    },
  });
  return request.then((response) => response.data);
};

const updateAll = (newObject, accessToken) => {
  const request = axios.put(baseUrl, newObject, {
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return request.then((response) => response.data);
};

const remove = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then((response) => response.data);
};

export default {
  getAll: getAll,
  create: create,
  update: update,
  remove: remove,
  updateAll: updateAll,
};
