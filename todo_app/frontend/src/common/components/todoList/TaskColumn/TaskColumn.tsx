import { Box } from "@chakra-ui/react";
import { Fragment } from "react";
import { DroppableContainer } from "../../ui/DroppableContainer";
import { TaskProgressCard } from "../../ui/TaskProgressCard";
import { TaskCard } from "../../ui/TaskCard";
import { DraggableContainer } from "../../ui/DraggableContainer";
import type { TaskCardProps } from "../../ui/TaskCard/TaskCard";
import { UUID } from "crypto";
import { v4 as uuid4v } from "uuid";
import { putTasks } from "../../../endpoints";
import { fetchDelete } from "../../../lib/fetch";

type TaskColumnProps = {
  date: string;
  tasks: TaskCardProps[];
  containerId: string;
  setTasksState: React.Dispatch<
    React.SetStateAction<Record<string, TaskCardProps[]>>
  >;
};

export function TaskColumn({
  date,
  tasks,
  containerId,
  setTasksState,
}: TaskColumnProps) {
  const handleAddTask = async (containerId: string) => {
    const new_id = uuid4v() as UUID;
    await putTasks({
      task_id: new_id,
      task_container_id: containerId,
      task_title: "",
      task_description: "",
      created_at: date,
    });
    setTasksState((prev) => ({
      ...prev,
      [containerId]: [
        ...prev[containerId],
        {
          id: new_id,
          taskTitle: "",
          taskDescription: "",
        },
      ],
    }));
  };

  const handleDeleteTask = async (containerId: string, taskId: string) => {
    await fetchDelete("/api/tasks", { task_id: taskId });
    setTasksState((prev) => ({
      ...prev,
      [containerId]: prev[containerId].filter((task) => task.id !== taskId),
    }));
  };

  const handleUpdateTask = (
    containerId: string,
    taskId: string,
    task: TaskCardProps
  ) => {
    setTasksState((prev) => ({
      ...prev,
      [containerId]: prev[containerId].map((t) => (t.id === taskId ? task : t)),
    }));
  };

  const handleOnBlur = async (
    containerId: string,
    taskId: string,
    task: TaskCardProps
  ) => {
    await putTasks({
      task_id: taskId,
      task_container_id: containerId,
      task_title: task.taskTitle,
      task_description: task.taskDescription,
      created_at: date,
    });
  };

  return (
    <DroppableContainer key={containerId} id={containerId} items={tasks}>
      <TaskProgressCard
        id={containerId}
        progressHeader={containerId}
        handleAddTask={handleAddTask}
      >
        <Box px={4} key={containerId}>
          <Fragment>
            {tasks.map((task) => (
              <DraggableContainer id={task.id as UUID} key={task.id as UUID}>
                <Box sx={{ margin: "1em" }}>
                  <TaskCard
                    id={task.id as UUID}
                    task={task}
                    containerId={containerId}
                    handleDeleteTask={handleDeleteTask}
                    handleUpdateTask={handleUpdateTask}
                    handleOnBlur={handleOnBlur}
                  />
                </Box>
              </DraggableContainer>
            ))}
          </Fragment>
        </Box>
      </TaskProgressCard>
    </DroppableContainer>
  );
}
