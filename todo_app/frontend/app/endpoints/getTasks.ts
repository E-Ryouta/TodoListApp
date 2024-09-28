import { fetchGet } from "../lib/fetch";

const ENDPOINT = "/api/tasks";

export const getTasks = async (date: string) => {
  return await fetchGet(ENDPOINT, { created_at: date });
};