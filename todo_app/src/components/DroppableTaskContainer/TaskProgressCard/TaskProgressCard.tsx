import {
  Card,
  Divider,
  Input,
  Box,
  useBoolean,
  Button,
  Text,
} from "@chakra-ui/react";
import { useState, useRef, Dispatch, SetStateAction } from "react";
import { FaPlus } from "react-icons/fa6";
import {
  DraggableTaskCard,
  DraggableTaskCardProps,
} from "../../DraggableTaskCard";
import { TaskContainerListContextType } from "../../TaskProvider/TaskContext";

type TaskProgressCardProps = {
  id: string;
  progressHeader: string;
  tasks: DraggableTaskCardProps[];
  containerId: string;
  setTaskContainerList: Dispatch<SetStateAction<TaskContainerListContextType>>;
};

export function TaskProgressCard({ ...props }: TaskProgressCardProps) {
  const [isEditing, setIsEditing] = useBoolean();
  const [progressHeader, setProgressHeader] = useState(props.progressHeader);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleOnEditClicked = () => {
    setIsEditing.on();
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  const handleAddTask = () => {
    const newTasks = [
      ...props.tasks,
      {
        id: `${progressHeader}-${props.tasks.length + 1}`,
        taskTitle: "",
        taskDescription: "",
        containerId: props.id,
      },
    ];
    props.setTaskContainerList((prev) => {
      return {
        ...prev,
        [props.id]: {
          progressHeader: progressHeader,
          tasks: newTasks,
          containerId: props.id,
        },
      };
    });
  };

  return (
    <Card w={"500px"} borderRadius={30}>
      <Button
        variant={"ghost"}
        onClick={handleOnEditClicked}
        w={"100%"}
        borderTopRadius={30}
      >
        {isEditing ? (
          <Input
            ref={inputRef}
            value={progressHeader}
            textAlign={"center"}
            borderRadius={30}
            sx={{
              fontWeight: "bold",
              fontSize: "lg",
            }}
            onChange={(e) => setProgressHeader(e.target.value)}
            onBlur={setIsEditing.off}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setIsEditing.off();
              }
            }}
          />
        ) : (
          <Text
            sx={{
              fontWeight: "bold",
              fontSize: "lg",
            }}
          >
            {progressHeader}
          </Text>
        )}
      </Button>
      <Divider />
      <Box px={4}>
        {props.tasks.map((task) => (
          <DraggableTaskCard
            key={task.id}
            {...task}
            containerId={props.containerId}
            setTaskContainerList={props.setTaskContainerList}
            sx={{ margin: "1em" }}
          ></DraggableTaskCard>
        ))}
      </Box>
      <Button
        variant={"ghost"}
        gap={"2px"}
        borderBottomRadius={30}
        onClick={handleAddTask}
      >
        <FaPlus />
        <Text>タスクを追加</Text>
      </Button>
    </Card>
  );
}
