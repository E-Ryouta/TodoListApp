import { createContext, Dispatch, SetStateAction } from "react";
import type { DraggableTaskCardProps } from "../DraggableTaskCard";

// useDraggableから得られる値の型を定義
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

// Contextの作成。初期値はundefinedや適切なデフォルト値
export const TaskContext = createContext<TaskContextType | undefined>(
  undefined
);
