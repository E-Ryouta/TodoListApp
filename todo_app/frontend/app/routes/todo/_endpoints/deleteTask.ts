import { fetchDelete } from "@/lib/fetch";

const ENDPOINT = "/api/task";

export const deleteTask = async (taskId: string) => {
  return await fetchDelete(ENDPOINT, { taskId: taskId });
};
