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
import { useContext, useRef, useState } from "react";
import { DraggableContext } from "../DraggableContainer/DraggableContext";
import { Timer } from "../TimerCard";
import type { UUID } from "crypto";

export type TaskCardProps = {
  id: UUID;
  taskTitle: string;
  taskDescription: string;
  timer: number;
};

type TaskCardPropsWithSetters = {
  id: UUID;
  task: TaskCardProps;
  containerId: string;
  addTimerFlag: boolean;
  startClickApproveFlg: boolean;
  handleDeleteTask: (containerId: string, taskId: string) => void;
  handleTimerUpdate: (
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
  task,
  containerId,
  addTimerFlag,
  startClickApproveFlg,
  handleDeleteTask,
  handleTimerUpdate,
  handleOnBlur,
}: TaskCardPropsWithSetters) {
  const [addDescriptionFlag, setAddDescriptionFlag] = useBoolean(false);
  const [taskTitle, setTaskTitle] = useState(task.taskTitle || "");
  const [taskDescription, setTaskDescription] = useState(
    task.taskDescription || ""
  );
  const draggableContext = useContext(DraggableContext);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <Card variant={"elevated"} size={"sm"}>
      <FormControl>
        {addTimerFlag && (
          <Box>
            <Timer
              defaultTime={task.timer}
              startClickApproveFlg={startClickApproveFlg}
              updateTimerSettings={(time) =>
                handleTimerUpdate(containerId, id, { ...task, timer: time })
              }
            />
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
              value={taskTitle}
              onBlur={() =>
                handleOnBlur(containerId, id, { ...task, taskTitle })
              }
              onChange={(e) => setTaskTitle(e.target.value)}
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
                value={taskDescription}
                onBlur={() =>
                  handleOnBlur(containerId, id, { ...task, taskDescription })
                }
                onChange={(e) => setTaskDescription(e.target.value)}
              />
            </CardBody>
          </Box>
        )}
      </FormControl>
    </Card>
  );
}
