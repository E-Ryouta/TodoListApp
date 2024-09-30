import { fetchDelete } from "@/lib/fetch";

const ENDPOINT = "/api/tasks";

export const deleteTasks = async (taskId: string) => {
  return await fetchDelete(ENDPOINT, { taskId: taskId });
};
