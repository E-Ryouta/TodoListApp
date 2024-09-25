import { Box } from "@chakra-ui/react";
import { Fragment, useCallback, useEffect, useState } from "react";
import { DroppableContainer } from "@/components/DroppableContainer";
import { TaskProgressCard } from "@/components/TaskProgressCard";
import { TaskCard } from "@/components/TaskCard";
import { DraggableContainer } from "@/components/DraggableContainer";
import type { TaskCardProps } from "@/components/TaskCard/TaskCard";
import { UUID } from "crypto";
import { v4 as uuid4v } from "uuid";
import { putTasks } from "app/endpoints";
import { fetchDelete } from "app/lib/fetch";

type TaskColumnProps = {
  date: string;
  tasks: TaskCardProps[];
  containerId: string;
  onChangeTodoState: (
    containerId: string,
    updatedTasks: TaskCardProps[]
  ) => void;
};

export type ModalParams = {
  onClose: (value: {
    ok: boolean;
    data: { taskTitle: string; timer: number };
  }) => void;
};

export const TaskColumn = function TaskColumn({
  date,
  tasks,
  containerId,
  onChangeTodoState,
}: TaskColumnProps) {
  const [modalOpen, setModalOpen] = useState<ModalParams | null>(null);

  const onUpdateTodoStateNewTask = useCallback(
    (task: TaskCardProps) => {
      onChangeTodoState(
        containerId,
        tasks.map((t) => (t.id === task.id ? task : t))
      );
    },
    [tasks]
  );

  const onAddTodoStateNewTask = useCallback(
    (task: TaskCardProps) => {
      onChangeTodoState(containerId, [...tasks, task]);
    },
    [tasks]
  );

  const handleAddTask = useCallback(async () => {
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
        await putTasks({
          task_id: new_id,
          tag_id: null,
          task_container_id: containerId,
          task_title: res.data.taskTitle,
          task_description: "",
          task_timer: res.data.timer,
          created_at: date,
        });
        onAddTodoStateNewTask({
          id: new_id,
          taskTitle: res.data.taskTitle,
          taskDescription: "",
          timer: res.data.timer,
          tag_id: "" as UUID,
        });
      }
    } else {
      await putTasks({
        task_id: new_id,
        tag_id: null,
        task_container_id: containerId,
        task_title: "",
        task_description: "",
        task_timer: 0,
        created_at: date,
      });
      onAddTodoStateNewTask({
        id: new_id,
        taskTitle: "",
        taskDescription: "",
        timer: 0,
        tag_id: "" as UUID,
      });
    }
  }, [containerId, date, onAddTodoStateNewTask]);

  const handleDeleteTask = useCallback(
    async (taskId: string) => {
      await fetchDelete("/api/tasks", { task_id: taskId });
      onChangeTodoState(
        containerId,
        tasks.filter((task) => task.id !== taskId)
      );
    },
    [onChangeTodoState]
  );

  const handleUpdateTask = useCallback(
    async (taskId: string, task: TaskCardProps) => {
      await putTasks({
        task_id: taskId,
        tag_id: task.tag_id,
        task_container_id: containerId,
        task_title: task.taskTitle,
        task_description: task.taskDescription,
        task_timer: task.timer,
        created_at: date,
      });
      onUpdateTodoStateNewTask(task);
    },
    [containerId, date, onUpdateTodoStateNewTask]
  );

  return (
    <DroppableContainer key={containerId} id={containerId} items={tasks}>
      <TaskProgressCard
        id={containerId}
        modalOpen={modalOpen}
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
                    addTimerFlag={containerId !== "todo"}
                    startClickApproveFlg={containerId !== "inProgress"}
                    handleTodoUpdate={onUpdateTodoStateNewTask}
                    handleUpdateTask={handleUpdateTask}
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
};
