import { createContext, Dispatch, SetStateAction } from "react";
import type { DraggableTaskCardProps } from "../DraggableTaskCard";

export type TaskContanarListProps = {
  progressHeader: string;
  tasks: DraggableTaskCardProps[];
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
