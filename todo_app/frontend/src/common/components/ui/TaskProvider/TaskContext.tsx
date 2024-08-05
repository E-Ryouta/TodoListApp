import { createContext, Dispatch, SetStateAction } from "react";
import type { TaskCardProps } from "../TaskCard";

export type TaskContanarListProps = {
  progressHeader: string;
  tasks: TaskCardProps[];
};

export type TaskContainerListContextType = {
  [key: string]: TaskContanarListProps;
};

type TaskContextType = {
  taskContainerList: TaskContainerListContextType;
  setTaskContainerList: Dispatch<SetStateAction<TaskContainerListContextType>>;
};

export const TaskContext = createContext<TaskContextType | undefined>(
  undefined
);
