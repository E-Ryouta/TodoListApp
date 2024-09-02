import { Box, HStack, useBoolean } from "@chakra-ui/react";
import { TaskCard } from "@/components/TaskCard";
import type { TaskCardProps } from "@/components/TaskCard";
import {
  DndContext,
  DragOverlay,
  DragEndEvent,
  closestCenter,
} from "@dnd-kit/core";
import { useCallback, useEffect, useState } from "react";
import { UUID } from "crypto";
import { arrayMove } from "@dnd-kit/sortable";
import { TaskColumn } from "./TaskColumn";
import { getTodoList, putTasks } from "app/endpoints";
import { useOutletContext } from "@remix-run/react";

/**
 * TODO:todoStateを管理するhooksを作りたい
 * TODO：Drag部分を別コンポーネントに切り出す？
 */

export type TodoListProps = {
  date: string;
};

export function TodoList({ date }: TodoListProps) {
  const [isChangeFlg, setIsChangeFlg] = useBoolean(false);
  const [todoState, setTodoState] = useState<Record<string, TaskCardProps[]>>({
    todo: [],
    inProgress: [],
    done: [],
  });

  const [activeTask, setActiveTask] = useState<TaskCardProps>({
    id: "" as UUID,
    taskTitle: "",
    taskDescription: "",
    timer: 0,
  });

  const handleUpdateTodoState = useCallback(
    (containerId: string, updatedTasks: TaskCardProps[]) => {
      setTodoState((prev) => ({
        ...prev,
        [containerId]: updatedTasks,
      }));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const handleDragStart = (event: any) => {
    const { id } = event.active;
    const containerId = event.active.data.current.sortable.containerId;
    const targetTask = todoState[containerId].find((task) => task.id === id);
    if (targetTask) {
      setActiveTask({
        id: targetTask.id,
        taskTitle: targetTask.taskTitle,
        taskDescription: targetTask.taskDescription,
        timer: targetTask.timer,
      });
    }
  };

  const handleDragOver = (event: any) => {
    const { active, over } = event;
    if (!over) return;

    const activeContainerId = active.data.current.sortable.containerId;
    const overContainerId = todoState[over.id]
      ? over.id
      : over.data.current.sortable.containerId;
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
        [overContainerId]: [...prev[overContainerId], insertTask],
      }));

      setIsChangeFlg.on();
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    const activeContainerId = active?.data?.current?.sortable.containerId;
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
        task_id: activeTask.id,
        task_container_id: activeContainerId,
        task_title: activeTask.taskTitle,
        task_description: activeTask.taskDescription,
        created_at: date,
      });
      setIsChangeFlg.off();
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
          timer: task.task_timer,
        })),
        inProgress: response["inProgress"].map((task: any) => ({
          id: task.task_id,
          taskTitle: task.task_title,
          taskDescription: task.task_description,
          timer: task.task_timer,
        })),
        done: response["done"].map((task: any) => ({
          id: task.task_id,
          taskTitle: task.task_title,
          taskDescription: task.task_description,
          timer: task.task_timer,
        })),
      };
      setTodoState(getStateTasks);
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
      <HStack w={"100%"} alignItems={"start"}>
        {Object.entries(todoState).map(([taskContainerId, tasks]) => (
          <Box key={taskContainerId} minW={"500px"} maxW={"800px"} w={"100%"}>
            <TaskColumn
              tasks={tasks}
              key={taskContainerId}
              date={date}
              containerId={taskContainerId}
              handleUpdateTodoState={handleUpdateTodoState}
            />
          </Box>
        ))}
      </HStack>
      <DragOverlay>
        <TaskCard
          id={activeTask.id as UUID}
          task={activeTask}
          addTimerFlag={false}
          startClickApproveFlg={false}
          handleTimerUpdate={() => {}}
          handleDeleteTask={() => {}}
          handleOnBlur={() => {}}
        />
      </DragOverlay>
    </DndContext>
  );
}
