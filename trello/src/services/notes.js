import axios from "axios";
const baseUrl = "http://localhost:3001/api/notes";

const getAll = async (accessToken) => {
  const request = await axios({
    method: "get",
    url: baseUrl,
    params: {
      accessToken: accessToken,
    },
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject);
  return request.then((response) => response.data);
};

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then((response) => response.data);
};

export default {
  getAll: getAll,
  create: create,
  update: update,
};
