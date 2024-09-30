import { fetchPut } from "@/lib/fetch";

const ENDPOINT = "/api/tasks";

type PutTask = {
  taskId: string;
  tagId: string;
  taskContainerId: string;
  taskTitle: string;
  taskTimer: string;
  taskDescription: string;
  createdAt: string;
};

export const putTasks = async (data: PutTask) => {
  return await fetchPut(ENDPOINT, data);
};
