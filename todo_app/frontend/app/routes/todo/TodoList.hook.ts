import { useBoolean } from "@chakra-ui/react";
import type { TaskCardProps } from "@/components/TaskCard";
import { DragEndEvent, DragStartEvent, DragOverEvent } from "@dnd-kit/core";
import { useEffect, useState } from "react";
import { arrayMove } from "@dnd-kit/sortable";
import { putTasks } from "./_endpoints";
import { useFetcher } from "@remix-run/react";
import type { TodoListLoaderData } from "./_endpoints";

export const useTodoList = ({
  date,
  tasks,
}: {
  date: string;
  tasks: TodoListLoaderData;
}) => {
  const fetcher = useFetcher();
  const [isChangeFlg, setIsChangeFlg] = useBoolean(false);
  const [activeTask, setActiveTask] = useState<TaskCardProps>();
  const [todoState, setTodoState] = useState<Record<string, TaskCardProps[]>>({
    todo: tasks["todo"] || [],
    inProgress: tasks["inProgress"] || [],
    done: tasks["done"] || [],
  });

  useEffect(() => {
    setTodoState({
      todo: tasks["todo"] || [],
      inProgress: tasks["inProgress"] || [],
      done: tasks["done"] || [],
    });
  }, [tasks]);

  const onUpdateTodoStateNewTask = async (
    task: TaskCardProps,
    containerId: string
  ) => {
    fetcher.submit(
      {
        taskId: task.taskId,
        tagId: task.tagId,
        taskContainerId: containerId,
        taskTitle: task.taskTitle,
        taskTimer: task.taskTimer,
        taskDescription: task.taskDescription,
        createdAt: date,
      },
      { method: "PUT", encType: "application/json" }
    );
    setTodoState((prev) => ({
      ...prev,
      [containerId]: prev[containerId].map((t) =>
        t.taskId === task.taskId ? task : t
      ),
    }));
  };

  const onAddTodoStateNewTask = async (
    task: TaskCardProps & { taskContainerId: string }
  ) => {
    fetcher.submit(
      {
        taskId: task.taskId,
        tagId: task.tagId,
        taskTitle: task.taskTitle || "",
        taskTimer: task.taskTimer || 0,
        taskDescription: "",
        createdAt: date,
        taskContainerId: task.taskContainerId,
      },
      {
        method: "PUT",
        encType: "application/json",
      }
    );
    setTodoState((prev) => ({
      ...prev,
      [task.taskContainerId]: [...prev[task.taskContainerId], task],
    }));
  };

  const onDeleteTodoStateNewTask = async (
    taskId: string,
    containerId: string
  ) => {
    fetcher.submit(
      { taskId: taskId },
      { method: "DELETE", encType: "application/json" }
    );
    setTodoState((prev) => ({
      ...prev,
      [containerId]: prev[containerId].filter(
        (task: TaskCardProps) => task.taskId !== taskId
      ),
    }));
  };

  const handleDragStart = (event: DragStartEvent) => {
    const { id, data } = event.active;
    const containerId = data?.current?.sortable.containerId;
    const targetTask = todoState[containerId].find(
      (task) => task.taskId === id
    );
    if (targetTask) {
      setActiveTask({
        taskId: targetTask.taskId,
        taskTitle: targetTask.taskTitle,
        taskDescription: targetTask.taskDescription,
        taskTimer: targetTask.taskTimer,
        tagId: targetTask.tagId,
      });
    }
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeContainerId = active.data?.current?.sortable.containerId;
    const overContainerId = todoState[over.id]
      ? over.id
      : over.data?.current?.sortable.containerId;
    if (!overContainerId || activeContainerId === overContainerId) return;

    const newTasks = todoState[activeContainerId].filter(
      (task) => task.taskId !== active.id
    );

    const insertTask = todoState[activeContainerId].find(
      (task) => task.taskId === active.id
    );

    if (insertTask) {
      setTodoState((prev) => ({
        ...prev,
        [activeContainerId]: newTasks,
        [overContainerId]: [...prev[overContainerId], insertTask],
      }));

      setIsChangeFlg.on();
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    const activeContainerId = active.data?.current?.sortable.containerId;
    const overContainerId = over?.data?.current?.sortable.containerId;

    if (activeContainerId === overContainerId) {
      const newTasks = arrayMove(
        todoState[activeContainerId],
        active?.data?.current?.sortable.index,
        over?.data?.current?.sortable.index
      );

      setTodoState((prev) => ({
        ...prev,
        [activeContainerId]: newTasks,
      }));
    }

    if (isChangeFlg) {
      putTasks({
        taskId: activeTask!.taskId,
        tagId: activeTask!.tagId,
        taskContainerId: activeContainerId,
        taskTitle: activeTask!.taskTitle,
        taskDescription: activeTask!.taskDescription,
        createdAt: date,
        taskTimer: activeTask!.taskTimer.toString(),
      });
      setIsChangeFlg.off();
    }
  };

  return {
    activeTask,
    todoState,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
    onUpdateTodoStateNewTask,
    onAddTodoStateNewTask,
    onDeleteTodoStateNewTask,
  };
};
