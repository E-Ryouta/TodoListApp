import {
  Card,
  CardHeader,
  CardBody,
  Divider,
  Input,
  Textarea,
  useBoolean,
  IconButton,
  Flex,
  Box,
  FormControl,
} from "@chakra-ui/react";
import {
  MdOutlineDescription,
  MdDragIndicator,
  MdDeleteOutline,
} from "react-icons/md";
import { useContext, useRef } from "react";
import { DraggableContext } from "../DraggableContainer/DraggableContext";
import { Timer } from "../TimerCard";
import type { UUID } from "crypto";

export type TaskCardProps = {
  id: UUID;
  taskTitle: string;
  taskDescription: string;
};

type TaskCardPropsWithSetters = {
  id: UUID;
  containerId: string;
  task: TaskCardProps;
  handleDeleteTask: (containerId: string, taskId: string) => void;
  handleUpdateTask: (
    containerId: string,
    taskId: string,
    task: TaskCardProps
  ) => void;
  handleOnBlur: (
    containerId: string,
    taskId: string,
    task: TaskCardProps
  ) => void;
};

export function TaskCard({
  id,
  containerId,
  task,
  handleDeleteTask,
  handleUpdateTask,
  handleOnBlur,
}: TaskCardPropsWithSetters) {
  const [addDescriptionFlag, setAddDescriptionFlag] = useBoolean(false);
  const [addTimerFlag, setAddTimerFlag] = useBoolean(false);
  const draggableContext = useContext(DraggableContext);
  const inputRef = useRef<HTMLInputElement>(null);

  const updateTask = (
    field: "taskTitle" | "taskDescription",
    value: string
  ) => {
    handleUpdateTask(containerId, id, {
      ...task,
      [field]: value,
    });
  };

  return (
    <Card variant={"elevated"} size={"sm"}>
      <FormControl>
        {addTimerFlag && (
          <Box>
            <Timer />
            <Divider />
          </Box>
        )}
        <CardHeader>
          <Flex>
            <IconButton
              variant={"ghost"}
              aria-label={"drag"}
              icon={<MdDragIndicator />}
              {...draggableContext?.attributes}
              {...draggableContext?.listeners}
            />
            <Input
              ml={4}
              variant={"unstyled"}
              value={task.taskTitle}
              onBlur={() => handleOnBlur(containerId, id, task)}
              onChange={(e) => updateTask("taskTitle", e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  inputRef.current?.blur();
                }
              }}
            />
            <IconButton
              variant={"ghost"}
              aria-label="add description"
              icon={<MdOutlineDescription />}
              onClick={setAddDescriptionFlag.toggle}
            />
            <IconButton
              variant={"ghost"}
              aria-label="delete"
              icon={<MdDeleteOutline />}
              onClick={() => handleDeleteTask(containerId, id)}
            />
          </Flex>
        </CardHeader>
        {addDescriptionFlag && (
          <Box>
            <Divider />
            <CardBody ml={4}>
              <Textarea
                variant={"unstyled"}
                placeholder={"Task Description"}
                value={task.taskDescription}
                onBlur={() => handleOnBlur(containerId, id, task)}
                onChange={(e) => updateTask("taskDescription", e.target.value)}
              />
            </CardBody>
          </Box>
        )}
      </FormControl>
    </Card>
  );
}
