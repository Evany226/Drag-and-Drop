import axios from "axios";
const baseUrl = "https://dragndrop-d7l4.onrender.com/api/boards";

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

export default {
  getAll: getAll,
  create: create,
};
