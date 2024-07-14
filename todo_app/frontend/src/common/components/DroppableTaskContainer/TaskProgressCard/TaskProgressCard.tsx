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
import { v4 as uuidv4 } from "uuid";
import { UUID } from "crypto";

type TaskProgressCardProps = {
  id: UUID;
  progressHeader: string;
  tasks: DraggableTaskCardProps[];
  containerId: string;
  setTaskContainerList: Dispatch<SetStateAction<TaskContainerListContextType>>;
};

export function TaskProgressCard({ ...props }: TaskProgressCardProps) {
  const handleAddTask = () => {
    const newTasks = [
      ...props.tasks,
      {
        id: uuidv4() as UUID,
        taskTitle: "",
        taskDescription: "",
        containerId: props.id,
      },
    ];
    props.setTaskContainerList((prev) => {
      return {
        ...prev,
        [props.id]: {
          containerId: props.id,
          progressHeader: props.progressHeader,
          tasks: newTasks,
        },
      };
    });
  };

  return (
    <Card w={"500px"} borderRadius={30}>
      <Text textAlign={"center"} fontWeight={"bold"} fontSize={"xl"}>
        {props.progressHeader}
      </Text>
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
