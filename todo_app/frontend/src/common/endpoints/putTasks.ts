import { fetchPut } from "../lib/fetch";

const ENDPOINT = "/api/tasks";

export const putTasks = async (data: {}) => {
  return await fetchPut(ENDPOINT, data);
};
