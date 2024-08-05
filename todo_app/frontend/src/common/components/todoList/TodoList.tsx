import { HStack } from "@chakra-ui/react";
import { TaskCard } from "../ui/TaskCard";
import type { TaskCardProps } from "../ui/TaskCard/TaskCard";
import {
  DndContext,
  DragOverlay,
  DragEndEvent,
  closestCenter,
} from "@dnd-kit/core";
import { useEffect, useState } from "react";
import { UUID } from "crypto";
import { arrayMove } from "@dnd-kit/sortable";
import { TaskColumn } from "./TaskColumn";
import { getTodoList } from "../../endpoints";

export type TodoListProps = {
  date: string;
};

export function TodoList({ date }: TodoListProps) {
  const [tasksState, setTasksState] = useState<Record<string, TaskCardProps[]>>(
    {
      todo: [],
      inProgress: [],
      done: [],
    }
  );

  const [activeTask, setActiveTask] = useState<TaskCardProps>({
    id: "" as UUID,
    taskTitle: "",
    taskDescription: "",
  });

  const handleDragStart = (event: any) => {
    const { id } = event.active;
    const containerId = event.active.data.current.sortable.containerId;
    const targetTask = tasksState[containerId].find((task) => task.id === id);
    if (targetTask) {
      setActiveTask({
        id: targetTask.id,
        taskTitle: targetTask.taskTitle,
        taskDescription: targetTask.taskDescription,
      });
    }
  };

  const handleDragOver = (event: any) => {
    const { active, over } = event;
    if (!over) return;

    const activeContainerId = active.data.current.sortable.containerId;
    const overContainerId = tasksState[over.id]
      ? over.id
      : over.data.current.sortable.containerId;
    if (!overContainerId || activeContainerId === overContainerId) return;

    const newTasks = tasksState[activeContainerId].filter(
      (task) => task.id !== active.id
    );

    const insertTask = tasksState[activeContainerId].find(
      (task) => task.id === active.id
    );

    if (insertTask) {
      setTasksState((prev) => ({
        ...prev,
        [activeContainerId]: newTasks,
        [overContainerId]: [...prev[overContainerId], insertTask],
      }));
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    const activeContainerId = active?.data?.current?.sortable.containerId;
    const overContainerId = over?.data?.current?.sortable.containerId;

    if (activeContainerId === overContainerId) {
      const newTasks = arrayMove(
        tasksState[activeContainerId],
        active?.data?.current?.sortable.index,
        over?.data?.current?.sortable.index
      );

      setTasksState((prev) => ({
        ...prev,
        [activeContainerId]: newTasks,
      }));
    }
  };

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await getTodoList(date);
      const getStateTasks = {
        todo: response["todo"].map((task: any) => ({
          id: task.task_id,
          taskTitle: task.task_title,
          taskDescription: task.task_description,
        })),
        inProgress: response["inProgress"].map((task: any) => ({
          id: task.task_id,
          taskTitle: task.task_title,
          taskDescription: task.task_description,
        })),
        done: response["done"].map((task: any) => ({
          id: task.task_id,
          taskTitle: task.task_title,
          taskDescription: task.task_description,
        })),
      };
      setTasksState(getStateTasks);
    };

    fetchTasks();
  }, [date]);

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
    >
      <HStack
        h={"100%"}
        pt={"70px"}
        spacing={"2rem"}
        align={"flex-start"}
        overflowX={"auto"}
      >
        {Object.entries(tasksState).map(([taskContainerId, tasks]) => (
          <TaskColumn
            tasks={tasks}
            key={taskContainerId}
            date={date}
            containerId={taskContainerId}
            setTasksState={setTasksState}
          />
        ))}
      </HStack>
      <DragOverlay>
        <TaskCard
          id={activeTask.id as UUID}
          containerId={"todo"}
          task={activeTask}
          handleDeleteTask={() => {}}
          handleUpdateTask={() => {}}
          handleOnBlur={() => {}}
        />
      </DragOverlay>
    </DndContext>
  );
}
