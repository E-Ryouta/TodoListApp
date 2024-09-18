import { fetchGet } from "../lib/fetch";

const ENDPOINT = "/api/tags";

export const getTags = async () => {
  return await fetchGet(ENDPOINT);
};
