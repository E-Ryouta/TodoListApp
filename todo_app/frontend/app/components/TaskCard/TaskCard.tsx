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
  Tooltip,
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
  addTimerFlag: boolean;
  startClickApproveFlg: boolean;
  handleDeleteTask: (taskId: string) => void;
  handleTimerUpdate: (taskId: string, task: TaskCardProps) => void;
  handleOnBlur: (taskId: string, task: TaskCardProps) => void;
};

export function TaskCard({
  id,
  task,
  addTimerFlag,
  startClickApproveFlg,
  handleDeleteTask,
  handleTimerUpdate,
  handleOnBlur,
}: TaskCardPropsWithSetters) {
  const [addDescriptionFlag, setAddDescriptionFlag] = useBoolean(false);
  const [isStart, setIsStart] = useBoolean();
  const [taskTitle, setTaskTitle] = useState(task.taskTitle || "");
  const [taskDescription, setTaskDescription] = useState(
    task.taskDescription || ""
  );
  const [animateTimerIcon, setAnimateTimerIcon] = useBoolean(false);
  const draggableContext = useContext(DraggableContext);
  const inputTitleRef = useRef<HTMLInputElement>(null);

  const handleTimerStartSettings = (time: number) => {
    if (isStart) {
      handleTimerUpdate(id, { ...task, timer: time });
    }
    setIsStart.toggle();
  };

  const handleTimerResetSettings = () => {
    handleTimerUpdate(id, { ...task, timer: 0 });
    setIsStart.off();
  };

  const handleAnimateTimerIcon = () => {
    if (isStart) setAnimateTimerIcon.on();
    setTimeout(() => {
      setAnimateTimerIcon.off();
    }, 1000);
  };

  return (
    <Card variant={"elevated"} size={"sm"}>
      <FormControl>
        {addTimerFlag && (
          <Box>
            <Timer
              isStart={isStart}
              animateTimerIcon={animateTimerIcon}
              defaultTime={task.timer}
              startClickApproveFlg={startClickApproveFlg}
              updateTimerSettings={handleTimerStartSettings}
              resetTimerSettings={handleTimerResetSettings}
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
              onMouseDown={handleAnimateTimerIcon}
              {...(!isStart && draggableContext?.attributes)}
              {...(!isStart && draggableContext?.listeners)}
            />
            <Tooltip label={taskTitle} placement={"top"}>
              <Input
                ml={4}
                variant={"unstyled"}
                value={taskTitle}
                ref={inputTitleRef}
                onBlur={() => handleOnBlur(id, { ...task, taskTitle })}
                onChange={(e) => setTaskTitle(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    inputTitleRef.current?.blur();
                  }
                }}
              />
            </Tooltip>
            <Tooltip label={"詳細を記載する"} placement={"top"}>
              <IconButton
                variant={"ghost"}
                aria-label="add description"
                icon={<MdOutlineDescription />}
                onClick={setAddDescriptionFlag.toggle}
              />
            </Tooltip>
            <IconButton
              variant={"ghost"}
              aria-label="delete"
              icon={<MdDeleteOutline />}
              onClick={() => handleDeleteTask(id)}
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
                onBlur={() => handleOnBlur(id, { ...task, taskDescription })}
                onChange={(e) => setTaskDescription(e.target.value)}
              />
            </CardBody>
          </Box>
        )}
      </FormControl>
    </Card>
  );
}