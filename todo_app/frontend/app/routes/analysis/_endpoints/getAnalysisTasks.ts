import { fetchGet } from "@/lib/fetch";

const ENDPOINT = "/api/tasks-with-tag";

export type AverageTimePerTag = {
  averageDuration: number;
  tagColor: string;
  tagLabel: string;
};

export type DoingTodoTask = {
  createdAt: string;
  tagId: string;
  taskContainerId: string;
  taskDescription: string;
  taskId: string;
  taskTimer: number;
  taskTitle: string;
};

export type TaskSumWithDate = {
  date: string;
  totalTasks: number;
};

export type getTasksWithTagResponse = {
  averageTimePerTag: AverageTimePerTag[];
  doingTodoTasks: DoingTodoTask[];
  taskSumWithDate: TaskSumWithDate[];
};

export const getTasksWithTag = async (startDate: string, endDate: string) => {
  return await fetchGet<getTasksWithTagResponse>(ENDPOINT, {
    startDate: startDate,
    endDate: endDate,
  });
};
