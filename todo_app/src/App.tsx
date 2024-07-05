import "./App.css";
import theme from "./theme";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import { DroppableTaskContainer } from "./components/DroppableTaskContainer";
import {
  ChakraProvider,
  HStack,
  Box,
  IconButton,
  useBoolean,
} from "@chakra-ui/react";
import { SideBar } from "./components/SideBar/SideBar";
import { NavBar } from "./components/NavBar/NavBar";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import { useState } from "react";
import { DraggableTaskCardProps } from "./components/DraggableTaskCard";
import { TaskCard } from "./components/DraggableTaskCard";

export type TaskContanarListProps = {
  progressHeader: string;
  tasks: DraggableTaskCardProps[];
};

export type TaskContainerListContextType = {
  [key: string]: TaskContanarListProps;
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
    useState<TaskContainerListContextType>({
      "To Do": {
        progressHeader: "To Do",
        tasks: [],
      },
      "In Progress": {
        progressHeader: "In Progress",
        tasks: [],
      },
      Done: {
        progressHeader: "Done",
        tasks: [],
      },
    });

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

  return (
    <ChakraProvider theme={theme}>
      <DndContext onDragStart={handleDragStart}>
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
                    id={key}
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
              // <DraggableTaskCard
              //   id={active.id}
              //   taskTitle={active.data.taskTitle}
              //   taskDescription={""}
              // />
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
