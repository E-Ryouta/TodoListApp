import React, { useState } from "react";
import type { TaskContainerListContextType } from "./TaskContext";
import { TaskContext } from "./TaskContext";
import { DraggableTaskCardProps } from "../DraggableTaskCard";

// type TaskProviderProps = {
//   children: React.ReactNode;
// };

// export const TaskProvider = ({ children }: TaskProviderProps) => {
//   const [toDoTasks, setToDoTasks] = useState<DraggableTaskCardProps[]>([]);
//   const [inProgressTasks, setInProgressTasks] = useState<
//     DraggableTaskCardProps[]
//   >([]);
//   const [doneTasks, setDoneTasks] = useState<DraggableTaskCardProps[]>([]);

//   const [taskContainerList, setTaskContainerList] =
//     useState<TaskContainerListContextType>({
//       "To Do": {
//         progressHeader: "To Do",
//         tasks: toDoTasks,
//         setTasks: setToDoTasks,
//       },
//       "In Progress": {
//         progressHeader: "In Progress",
//         tasks: inProgressTasks,
//         setTasks: setInProgressTasks,
//       },
//       Done: {
//         progressHeader: "Done",
//         tasks: doneTasks,
//         setTasks: setDoneTasks,
//       },
//     });

//   return (
//     <TaskContext.Provider value={{ taskContainerList, setTaskContainerList }}>
//       {children}
//     </TaskContext.Provider>
//   );
// };

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
