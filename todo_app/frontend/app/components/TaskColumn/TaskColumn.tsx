import { Box } from "@chakra-ui/react";
import { useState } from "react";
import { DroppableContainer } from "@/components/DroppableContainer";
import { TaskProgressCard } from "@/components/TaskProgressCard";
import { TaskCard } from "@/components/TaskCard";
import { DraggableContainer } from "@/components/DraggableContainer";
import type { TaskCardProps } from "@/components/TaskCard/TaskCard";
import { UUID } from "crypto";
import { v4 as uuid4v } from "uuid";

type TaskColumnProps = {
  date: string;
  tasks: TaskCardProps[];
  containerId: string;
  onAddTodoStateNewTask: (
    task: TaskCardProps & { taskContainerId: string }
  ) => void;
  onUpdateTodoStateNewTask: (task: TaskCardProps, containerId: string) => void;
  onDeleteStateNewTask: (taskId: string, containerId: string) => void;
};

export type ModalParams = {
  onClose: (value: {
    ok: boolean;
    data: { taskTitle: string; timer: number };
  }) => void;
};

export const TaskColumn = function TaskColumn({
  tasks,
  containerId,
  onAddTodoStateNewTask,
  onUpdateTodoStateNewTask,
  onDeleteStateNewTask,
}: TaskColumnProps) {
  const [modalOpen, setModalOpen] = useState<ModalParams | null>(null);

  const handleAddTask = async () => {
    const new_id = uuid4v() as UUID;

    if (containerId === "done") {
      const res = await new Promise<{
        ok: boolean;
        data: { taskTitle: string; timer: number };
      }>((resolve) => {
        setModalOpen({ onClose: resolve });
      });
      setModalOpen(null);
      if (res.ok) {
        await onAddTodoStateNewTask({
          taskId: new_id,
          tagId: "87d7ad0a-7cb4-d6a8-c3cc-5a9033539a72",
          taskTitle: res.data.taskTitle,
          taskDescription: "",
          taskTimer: res.data.timer,
          taskContainerId: containerId,
        });
      }
    } else {
      await onAddTodoStateNewTask({
        taskId: new_id,
        tagId: "87d7ad0a-7cb4-d6a8-c3cc-5a9033539a72",
        taskTitle: "",
        taskDescription: "",
        taskTimer: 0,
        taskContainerId: containerId,
      });
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    await onDeleteStateNewTask(taskId, containerId);
  };

  const handleUpdateTask = async (task: TaskCardProps) => {
    await onUpdateTodoStateNewTask(task, containerId);
  };

  return (
    <DroppableContainer key={containerId} id={containerId} items={tasks}>
      <TaskProgressCard
        id={containerId}
        modalOpen={modalOpen}
        progressHeader={containerId}
        handleAddTask={handleAddTask}
      >
        <Box px={4} key={containerId}>
          {tasks.map((task) => (
            <DraggableContainer
              id={task.taskId as UUID}
              key={task.taskId as UUID}
            >
              <Box sx={{ margin: "1em" }}>
                <TaskCard
                  task={task}
                  id={task.taskId as UUID}
                  addTimerFlag={containerId !== "todo"}
                  startClickApproveFlg={containerId !== "inProgress"}
                  handleTodoUpdate={() => {}}
                  handleUpdateTask={handleUpdateTask}
                  handleDeleteTask={handleDeleteTask}
                />
              </Box>
            </DraggableContainer>
          ))}
        </Box>
      </TaskProgressCard>
    </DroppableContainer>
  );
};
