import type { TaskCardProps } from "@/components/TaskCard";
import { DragEndEvent, DragStartEvent, DragOverEvent } from "@dnd-kit/core";
import { useEffect, useState } from "react";
import { arrayMove } from "@dnd-kit/sortable";
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
  const [activeTask, setActiveTask] = useState<TaskCardProps>();
  const [todoState, setTodoState] = useState<Record<string, TaskCardProps[]>>(
    {}
  );

  useEffect(() => {
    const todoTask = tasks["todo"].sort(
      (a, b) => a.taskSortOrder - b.taskSortOrder
    );
    const inProgressTask = tasks["inProgress"].sort(
      (a, b) => a.taskSortOrder - b.taskSortOrder
    );
    const doneTask = tasks["done"].sort(
      (a, b) => a.taskSortOrder - b.taskSortOrder
    );
    setTodoState({
      todo: todoTask || [],
      inProgress: inProgressTask || [],
      done: doneTask || [],
    });
  }, [tasks]);

  const onUpdateTodoStateNewTask = async (
    task: TaskCardProps,
    containerId: string
  ) => {
    fetcher.submit(
      {
        taskId: task.id,
        tagId: task.tagId,
        taskContainerId: containerId,
        taskTitle: task.taskTitle,
        taskTimer: task.taskTimer,
        taskDescription: task.taskDescription,
        taskSortOrder: task.taskSortOrder,
        createdAt: date,
        putType: "task",
      },
      { method: "PUT", encType: "application/json" }
    );
  };

  const onAddTodoStateNewTask = async (
    task: TaskCardProps,
    containerId: string
  ) => {
    fetcher.submit(
      {
        taskId: task.id,
        tagId: task.tagId,
        taskTitle: task.taskTitle || "",
        taskTimer: task.taskTimer || 0,
        taskDescription: "",
        createdAt: date,
        taskSortOrder: task.taskSortOrder,
        taskContainerId: containerId,
        putType: "task",
      },
      {
        method: "PUT",
        encType: "application/json",
      }
    );
  };

  const onDeleteTodoStateNewTask = async (taskId: string) => {
    fetcher.submit(
      { taskId: taskId },
      { method: "DELETE", encType: "application/json" }
    );
  };

  const handleDragStart = (event: DragStartEvent) => {
    const { id, data } = event.active;
    const containerId = data?.current?.sortable.containerId;
    const targetTask = todoState[containerId].find((task) => task.id === id);
    if (targetTask) {
      setActiveTask({
        id: targetTask.id,
        taskTitle: targetTask.taskTitle,
        taskDescription: targetTask.taskDescription,
        taskTimer: targetTask.taskTimer,
        taskSortOrder: targetTask.taskSortOrder,
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
      (task) => task.id !== active.id
    );

    const insertTask = todoState[activeContainerId].find(
      (task) => task.id === active.id
    );

    if (insertTask) {
      setTodoState((prev) => ({
        ...prev,
        [activeContainerId]: newTasks,
        [overContainerId]: [
          ...prev[overContainerId],
          {
            ...insertTask,
            taskContainerId: overContainerId,
            taskSortOrder: prev[overContainerId].length + 1,
          },
        ],
      }));
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    const activeContainerId = active.data?.current?.sortable.containerId;
    const overContainerId = over?.data?.current?.sortable.containerId;

    let newTodo = todoState;
    if (activeContainerId === overContainerId) {
      const newTasks = arrayMove(
        todoState[activeContainerId],
        active?.data?.current?.sortable.index,
        over?.data?.current?.sortable.index
      );
      newTodo = {
        ...todoState,
        [activeContainerId]: newTasks,
      };
      setTodoState(newTodo);
    }

    fetcher.submit(
      { ...newTodo, putType: "tasks" },
      { method: "PUT", encType: "application/json" }
    );
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
