import { fetchGet } from "../lib/fetch";

const ENDPOINT = "/api/tasks";

export const getTodoList = async (date: string) => {
  return await fetchGet(ENDPOINT, { created_at: date });
};
