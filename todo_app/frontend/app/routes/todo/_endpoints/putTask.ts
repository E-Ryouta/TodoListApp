import { fetchPut } from "@/lib/fetch";

const ENDPOINT = "/api/task";

export type PutContainerOrder = {
  taskId: string;
  tagId: string;
  taskContainerId: string;
  taskTitle: string;
  taskTimer: string;
  taskDescription: string;
  taskSortOrder: string;
  createdAt: string;
};

export const putTask = async (data: PutContainerOrder) => {
  return await fetchPut(ENDPOINT, data);
};
