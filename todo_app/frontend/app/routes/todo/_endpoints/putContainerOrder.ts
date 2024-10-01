import { fetchPut } from "@/lib/fetch";

const ENDPOINT = "/api/container_order";

export type PutTasksRow = {
  taskId: string;
  taskContainerId: string;
  taskSortOrder: string;
};

export const putContainerOrder = async (data: PutTasksRow[]) => {
  return await fetchPut(ENDPOINT, data);
};
