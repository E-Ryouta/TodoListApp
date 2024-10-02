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
import { useContext, useRef } from "react";
import { DraggableContext } from "../DraggableContainer/DraggableContext";
import { Timer } from "../TimerCard";
import type { UUID } from "crypto";
import { TaskKindTag } from "../TaskKindTag/TaskKindTag";
import { SelectTagProps } from "../TaskKindTag/SelectTagPopOver";

export type TaskCardProps = {
  id: UUID;
  taskTitle: string;
  taskDescription: string;
  taskTimer: number;
  taskSortOrder: number;
  tagId: UUID;
};

type TaskCardPropsWithSetters = {
  id: UUID;
  task: TaskCardProps;
  addTimerFlag: boolean;
  tagList: SelectTagProps[];
  startClickApproveFlg: boolean;
  handleDeleteTask: (taskId: string) => void;
  handleUpdateTask: (task: TaskCardProps) => void;
};

export function TaskCard({
  id,
  task,
  tagList,
  addTimerFlag,
  startClickApproveFlg,
  handleDeleteTask,
  handleUpdateTask,
}: TaskCardPropsWithSetters) {
  const [isStart, setIsStart] = useBoolean();
  const [addDescriptionFlag, setAddDescriptionFlag] = useBoolean(false);
  const [animateTimerIcon, setAnimateTimerIcon] = useBoolean(false);

  const draggableContext = useContext(DraggableContext);
  const inputTitleRef = useRef<HTMLInputElement>(null);

  console.log(draggableContext);

  const handleTimerStartSettings = (time: number) => {
    if (isStart) {
      handleUpdateTask({ ...task, taskTimer: time });
    }
    setIsStart.toggle();
  };

  const handleTimerResetSettings = () => {
    handleUpdateTask({ ...task, taskTimer: 0 });
    setIsStart.off();
  };

  const handleAnimateTimerIcon = () => {
    if (isStart) setAnimateTimerIcon.on();
    setTimeout(() => {
      setAnimateTimerIcon.off();
    }, 1000);
  };

  const handleUpdateTag = (tagId: UUID) => {
    handleUpdateTask({ ...task, tagId });
  };

  return (
    <>
      <TaskKindTag
        tagId={task.tagId}
        tagList={tagList}
        handleUpdateTag={handleUpdateTag}
      />
      <Card variant={"elevated"} size={"sm"}>
        <FormControl>
          {addTimerFlag && (
            <Box>
              <Timer
                isStart={isStart}
                animateTimerIcon={animateTimerIcon}
                defaultTime={task.taskTimer}
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
                cursor={"grab"}
                {...(!isStart && draggableContext?.attributes)}
                {...(!isStart && draggableContext?.listeners)}
              />
              <Tooltip label={task.taskTitle || ""} placement={"top"}>
                <Input
                  ml={4}
                  variant={"unstyled"}
                  defaultValue={task.taskTitle || ""}
                  ref={inputTitleRef}
                  onBlur={(e) =>
                    handleUpdateTask({ ...task, taskTitle: e.target.value })
                  }
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
                  defaultValue={task.taskDescription || ""}
                  onBlur={(e) =>
                    handleUpdateTask({
                      ...task,
                      taskDescription: e.target.value,
                    })
                  }
                />
              </CardBody>
            </Box>
          )}
        </FormControl>
      </Card>
    </>
  );
}
