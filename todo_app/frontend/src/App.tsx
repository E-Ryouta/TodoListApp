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
  VStack,
} from "@chakra-ui/react";
import { SideBar } from "./common/components/SideBar/SideBar";
import { NavBar } from "./common/components/NavBar/NavBar";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import { useEffect, useState } from "react";
import { DraggableTaskCardProps } from "./common/components/DraggableTaskCard";
import { TaskCard } from "./common/components/DraggableTaskCard";
import { arrayMove } from "@dnd-kit/sortable";
import { UUID } from "crypto";
import { fetchGet, fetchPut } from "./common/lib/fetch";
import { DateBar } from "./common/components/DateBar";
import { create } from "domain";

export type TaskContanarListProps = {
  progressHeader: string;
  tasks: DraggableTaskCardProps[];
};

export type TaskContainerListContextType = {
  [key: UUID]: TaskContanarListProps;
};

function App() {
  const [isOpen, setIsOpen] = useBoolean();
  const [activeTask, setActiveTask] = useState({
    id: "",
    data: {
      taskTitle: "",
      taskDescription: "",
    },
  });

  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [isChange, setIsChange] = useBoolean(false);
  const [taskContainerList, setTaskContainerList] =
    useState<TaskContainerListContextType>({});

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchGet("/api/todo_lists", { created_at: date });
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

    fetchData();
  }, [date]);

  const fetchTask = async (data: {}) => {
    await fetchPut("/api/tasks", data);
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
    <ChakraProvider theme={theme}>
      <DndContext
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragOver={handleDragOver}
      >
        <Box h={"100vh"}>
          <NavBar />
          <Box
            position="fixed"
            top="50px"
            bg={"gray.100"}
            pl={isOpen ? "200px" : "50px"}
            display="flex"
            justifyContent="center"
            w={"100%"}
          >
            <DateBar date={date} setDate={setDate} />
          </Box>
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
              pt={"70px"}
              spacing={"2rem"}
              align={"flex-start"}
              overflowX={"auto"}
            >
              {Object.entries(taskContainerList).map(
                ([key, taskContainers]) => (
                  <DroppableTaskContainer
                    key={key}
                    id={key as UUID}
                    date={date}
                    tasks={taskContainers.tasks}
                    progressHeader={taskContainers.progressHeader}
                    setTaskContainerList={setTaskContainerList}
                  />
                )
              )}
            </HStack>
          </HStack>
          <DragOverlay>
            {activeTask ? (
              <TaskCard
                id={activeTask.id}
                taskTitle={activeTask.data.taskTitle}
                taskDescription={activeTask.data.taskDescription}
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
