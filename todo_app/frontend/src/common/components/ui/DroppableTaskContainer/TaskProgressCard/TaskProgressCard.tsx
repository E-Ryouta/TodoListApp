import { Card, Divider, Box, Button, Text } from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";
import { FaPlus } from "react-icons/fa6";
import {
  DraggableTaskCard,
  DraggableTaskCardProps,
} from "../../DraggableTaskCard";
import { TaskContainerListContextType } from "../../TaskProvider/TaskContext";
import { v4 as uuidv4 } from "uuid";
import { UUID } from "crypto";
import { fetchPut } from "../../../../lib/fetch";

type TaskProgressCardProps = {
  id: UUID;
  progressHeader: string;
  tasks: DraggableTaskCardProps[];
  containerId: string;
  date: string;
  setTaskContainerList: Dispatch<SetStateAction<TaskContainerListContextType>>;
};

export function TaskProgressCard({ ...props }: TaskProgressCardProps) {
  const fetchTask = async (data: {}) => {
    await fetchPut("/api/tasks", data);
  };

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
    fetchTask({
      task_id: newTasks[newTasks.length - 1].id,
      task_container_id: props.id,
      task_title: newTasks[newTasks.length - 1].taskTitle,
      task_description: newTasks[newTasks.length - 1].taskDescription,
      created_at: props.date,
    });
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
    <Card w={"500px"} borderRadius={30} bg={"tertiary"}>
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
