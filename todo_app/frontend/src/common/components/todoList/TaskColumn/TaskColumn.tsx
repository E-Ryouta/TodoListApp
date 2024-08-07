import { Box } from "@chakra-ui/react";
import { Fragment, useEffect, useState } from "react";
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
  handleUpdateTodoState: (
    containerId: string,
    updatedTasks: TaskCardProps[]
  ) => void;
};

export function TaskColumn({
  date,
  tasks,
  containerId,
  handleUpdateTodoState,
}: TaskColumnProps) {
  const [containerState, setContainerState] = useState<TaskCardProps[]>(tasks);

  useEffect(() => {
    setContainerState(tasks);
  }, [tasks]);

  useEffect(() => {
    handleUpdateTodoState(containerId, containerState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [containerState]);

  const handleAddTask = async (containerId: string) => {
    const new_id = uuid4v() as UUID;
    await putTasks({
      task_id: new_id,
      task_container_id: containerId,
      task_title: "",
      task_description: "",
      created_at: date,
    });
    setContainerState((prev) => [
      ...prev,
      {
        id: new_id,
        taskTitle: "",
        taskDescription: "",
        timer: 0,
      },
    ]);
  };

  const handleDeleteTask = async (containerId: string, taskId: string) => {
    await fetchDelete("/api/tasks", { task_id: taskId });
    setContainerState((prev) => prev.filter((task) => task.id !== taskId));
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
      task_timer: task.timer,
      created_at: date,
    });

    setContainerState((prev) => prev.map((t) => (t.id === taskId ? task : t)));
  };

  const handleTimerUpdate = async (
    containerId: string,
    taskId: string,
    task: TaskCardProps
  ) => {
    await putTasks({
      task_id: taskId,
      task_container_id: containerId,
      task_title: task.taskTitle,
      task_description: task.taskDescription,
      task_timer: task.timer,
      created_at: date,
    });

    setContainerState((prev) => prev.map((t) => (t.id === taskId ? task : t)));
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
                    task={task}
                    id={task.id as UUID}
                    containerId={containerId}
                    addTimerFlag={containerId !== "todo"}
                    startClickApproveFlg={containerId !== "inProgress"}
                    handleOnBlur={handleOnBlur}
                    handleTimerUpdate={handleTimerUpdate}
                    handleDeleteTask={handleDeleteTask}
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
