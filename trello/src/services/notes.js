import axios from "axios";
const baseUrl = "https://dragndrop-d7l4.onrender.com/api/notes";

const getAll = async (accessToken) => {
  const request = axios.get(baseUrl, {
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return request.then((response) => response.data.boards);
};

const create = (id, newObject, accessToken) => {
  const request = axios.post(`${baseUrl}/${id}`, newObject, {
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return request.then((response) => response.data);
};

const update = (id, newObject, accessToken) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject, {
    headers: {
      "content-type": "application/json",
    },
    Authorization: `Bearer ${accessToken}`,
  });
  return request.then((response) => response.data);
};

const updateAll = (id, newObject, accessToken) => {
  const request = axios.put(`${baseUrl}/all/${id}`, newObject, {
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return request.then((response) => response.data);
};

const remove = (id, accessToken) => {
  const request = axios.delete(`${baseUrl}/${id}`, {
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return request.then((response) => response.data);
};

export default {
  getAll: getAll,
  create: create,
  update: update,
  remove: remove,
  updateAll: updateAll,
};
