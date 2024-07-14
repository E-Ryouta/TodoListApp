import "./App.css";
import theme from "./theme";
import { DndContext, DragEndEvent, DragOverlay } from "@dnd-kit/core";
import { DroppableTaskContainer } from "./common/components/DroppableTaskContainer";
import {
  ChakraProvider,
  HStack,
  Box,
  IconButton,
  useBoolean,
} from "@chakra-ui/react";
import { SideBar } from "./common/components/SideBar/SideBar";
import { NavBar } from "./common/components/NavBar/NavBar";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import { useEffect, useState } from "react";
import { DraggableTaskCardProps } from "./common/components/DraggableTaskCard";
import { TaskCard } from "./common/components/DraggableTaskCard";
import { arrayMove } from "@dnd-kit/sortable";
import { UUID } from "crypto";
import { fetchGet } from "./common/lib/fetch";

export type TaskContanarListProps = {
  progressHeader: string;
  tasks: DraggableTaskCardProps[];
};

export type TaskContainerListContextType = {
  [key: UUID]: TaskContanarListProps;
};

function App() {
  const [isOpen, setIsOpen] = useBoolean();
  const [active, setActive] = useState({
    id: "",
    data: {
      taskTitle: "",
      taskDescription: "",
    },
  });

  const [taskContainerList, setTaskContainerList] =
    useState<TaskContainerListContextType>({});

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchGet("/api/todo_list", {});
      setTaskContainerList(
        Object.keys(data).reduce((acc: any, key: any) => {
          return {
            ...acc,
            [key]: {
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

    fetchData();
  }, []);

  const handleDragStart = (event: any) => {
    const { id } = event.active;
    const containerId = event.active.data.current.sortable.containerId;
    const activeTaskTitle =
      taskContainerList[containerId].tasks.find((task) => task.id === id)
        ?.taskTitle ?? "";
    const activeTaskDescription =
      taskContainerList[containerId].tasks.find((task) => task.id === id)
        ?.taskDescription ?? "";

    setActive({
      id: id,
      data: {
        taskTitle: activeTaskTitle,
        taskDescription: activeTaskDescription,
      },
    });
  };

  const handleDragOver = (event: any) => {
    const { active, over } = event;

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

    if (active.id === over?.id) {
      return;
    }

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
  };

  return (
    <ChakraProvider theme={theme}>
      <DndContext
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragOver={handleDragOver}
      >
        <Box h={"100vh"}>
          <NavBar></NavBar>
          <HStack h={"calc(100vh - 50px)"}>
            <HStack h={"100%"}>
              {isOpen && <SideBar></SideBar>}
              <IconButton
                aria-label="SideBarToggle"
                borderRadius={50}
                variant={"outline"}
                size={"lg"}
                mx={"1rem"}
                bg={"white"}
                icon={isOpen ? <IoIosArrowDropleft /> : <IoIosArrowDropright />}
                onClick={() => setIsOpen.toggle()}
              />
            </HStack>
            <HStack
              h={"100%"}
              pt={"1rem"}
              spacing={"2rem"}
              align={"flex-start"}
              overflowX={"auto"}
            >
              {Object.entries(taskContainerList).map(
                ([key, taskContainers]) => (
                  <DroppableTaskContainer
                    key={key}
                    id={key as UUID}
                    tasks={taskContainers.tasks}
                    progressHeader={taskContainers.progressHeader}
                    setTaskContainerList={setTaskContainerList}
                  />
                )
              )}
            </HStack>
          </HStack>
          <DragOverlay>
            {active ? (
              <TaskCard
                id={active.id}
                taskTitle={active.data.taskTitle}
                taskDescription={active.data.taskDescription}
                containerId={""}
              />
            ) : null}
          </DragOverlay>
        </Box>
      </DndContext>
    </ChakraProvider>
  );
}

export default App;
