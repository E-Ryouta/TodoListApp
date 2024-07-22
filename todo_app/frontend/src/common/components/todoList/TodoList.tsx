import { HStack } from "@chakra-ui/react";
import { DroppableTaskContainer } from "../ui/DroppableTaskContainer";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import { TaskCard } from "../ui/DraggableTaskCard";
import { useEffect, useState } from "react";
import { arrayMove } from "@dnd-kit/sortable";
import { UUID } from "crypto";
import { getTodoList, putTasks } from "../../endpoints";
import { useBoolean } from "@chakra-ui/react";
import { DragEndEvent } from "@dnd-kit/core";
import type { DraggableTaskCardProps } from "../ui/DraggableTaskCard";

export type TaskContanarListProps = {
  progressHeader: string;
  tasks: DraggableTaskCardProps[];
};

export type TaskContainerListContextType = {
  [key: UUID]: TaskContanarListProps;
};

export type TodoListProps = {
  date: string;
};

export function TodoList({ date }: TodoListProps) {
  const [isChange, setIsChange] = useBoolean(false);
  const [taskContainerList, setTaskContainerList] =
    useState<TaskContainerListContextType>({});
  const [activeTask, setActiveTask] = useState({
    id: "",
    data: {
      taskTitle: "",
      taskDescription: "",
    },
  });

  useEffect(() => {
    const fetchData = async (date: string) => {
      const data = await getTodoList(date);
      setTaskContainerList(
        Object.keys(data).reduce((acc: any, key: any) => {
          return {
            ...acc,
            [data[key].taskContainer.task_container_id]: {
              progressHeader: data[key].taskContainer.progress_header,
              tasks: Object.values(data[key].tasks).map((task: any) => {
                return {
                  id: task.task_id,
                  taskTitle: task.task_title,
                  taskDescription: task.task_description,
                };
              }),
            },
          };
        }, {})
      );
    };

    fetchData(date);
  }, [date]);

  const fetchTask = async (data: {}) => {
    await putTasks(data);
  };

  const handleDragStart = (event: any) => {
    const { id } = event.active;

    const containerId = event.active.data.current.sortable.containerId;
    const activeTaskTitle =
      taskContainerList[containerId].tasks.find((task) => task.id === id)
        ?.taskTitle ?? "";
    const activeTaskDescription =
      taskContainerList[containerId].tasks.find((task) => task.id === id)
        ?.taskDescription ?? "";

    setActiveTask({
      id: id,
      data: {
        taskTitle: activeTaskTitle,
        taskDescription: activeTaskDescription,
      },
    });
  };

  const handleDragOver = (event: any) => {
    const { active, over } = event;
    if (!over) {
      return;
    }

    const activeContainerId = active?.data?.current?.sortable.containerId;
    const overContainerId = taskContainerList[over.id]
      ? over.id
      : over?.data?.current?.sortable.containerId;

    if (!overContainerId) {
      return;
    }

    if (activeContainerId === overContainerId) {
      return;
    }

    const newTasks = taskContainerList[activeContainerId].tasks.filter(
      (task) => task.id !== active.id
    );

    const insertTask = taskContainerList[activeContainerId].tasks.find(
      (task) => task.id === active.id
    );

    setTaskContainerList((prev) => {
      setIsChange.on();
      return {
        ...prev,
        [activeContainerId]: {
          progressHeader: prev[activeContainerId].progressHeader,
          tasks: newTasks,
        },
        [overContainerId]: {
          progressHeader: prev[overContainerId].progressHeader,
          tasks: [...prev[overContainerId].tasks, insertTask],
        },
      };
    });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    const activeContainerId = active?.data?.current?.sortable.containerId;
    const overContainerId = over?.data?.current?.sortable.containerId;

    if (activeContainerId === overContainerId) {
      const newTasks = arrayMove(
        taskContainerList[activeContainerId].tasks,
        active?.data.current?.sortable.index,
        over?.data.current?.sortable.index
      );

      setTaskContainerList((prev) => {
        return {
          ...prev,
          [activeContainerId]: {
            progressHeader: prev[activeContainerId].progressHeader,
            tasks: newTasks,
          },
        };
      });
    }

    if (isChange) {
      fetchTask({
        task_id: active.id,
        task_container_id: activeContainerId,
        task_title: activeTask.data.taskTitle,
        task_description: activeTask.data.taskDescription,
      });
      setIsChange.off();
    }
  };

  return (
    <DndContext
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
        {Object.entries(taskContainerList).map(([key, taskContainers]) => (
          <DroppableTaskContainer
            key={key}
            id={key as UUID}
            date={date}
            tasks={taskContainers.tasks}
            progressHeader={taskContainers.progressHeader}
            setTaskContainerList={setTaskContainerList}
          />
        ))}
      </HStack>
      <DragOverlay>
        <TaskCard
          id={activeTask.id}
          taskTitle={activeTask.data.taskTitle}
          taskDescription={activeTask.data.taskDescription}
          containerId={""}
        />
      </DragOverlay>
    </DndContext>
  );
}
