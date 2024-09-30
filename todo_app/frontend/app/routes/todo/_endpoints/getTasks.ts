import { fetchGet } from "../../../lib/fetch";
import type { TaskCardProps } from "@/components/TaskCard";

export type TodoListLoaderData = {
  todo: TaskCardProps[];
  inProgress: TaskCardProps[];
  done: TaskCardProps[];
};

const ENDPOINT = "/api/tasks";

export const getTasks = async (date: string) => {
  return await fetchGet<TodoListLoaderData>(ENDPOINT, { createdAt: date });
};
