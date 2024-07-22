import React from "react";
import type { TaskContainerListContextType } from "./TaskContext";
import { TaskContext } from "./TaskContext";

type TaskProviderProps = {
  children: React.ReactNode;
  taskContainerList: TaskContainerListContextType;
  setTaskContainerList: React.Dispatch<
    React.SetStateAction<TaskContainerListContextType>
  >;
};

export const TaskProvider = ({
  children,
  taskContainerList,
  setTaskContainerList,
}: TaskProviderProps) => {
  return (
    <TaskContext.Provider value={{ taskContainerList, setTaskContainerList }}>
      {children}
    </TaskContext.Provider>
  );
};
