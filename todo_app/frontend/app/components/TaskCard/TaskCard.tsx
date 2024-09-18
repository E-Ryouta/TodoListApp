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
import { useContext, useEffect, useRef, useState } from "react";
import { DraggableContext } from "../DraggableContainer/DraggableContext";
import { Timer } from "../TimerCard";
import type { UUID } from "crypto";
import { TaskKindTag } from "../TaskKindTag/TaskKindTag";
import { getTags } from "@/endpoints";
import { SelectTagProps } from "../TaskKindTag/SelectTagPopOver";

// Timerの処理をhooksに切り出す

export type TaskCardProps = {
  id: UUID;
  taskTitle: string;
  taskDescription: string;
  timer: number;
  tag_id: UUID;
};

type TaskCardPropsWithSetters = {
  id: UUID;
  task: TaskCardProps;
  addTimerFlag: boolean;
  startClickApproveFlg: boolean;
  handleDeleteTask: (taskId: string) => void;
  handleUpdateTask: (taskId: string, task: TaskCardProps) => void;
  handleTodoUpdate: (updatedTask: TaskCardProps) => void;
};

export function TaskCard({
  id,
  task,
  addTimerFlag,
  startClickApproveFlg,
  handleDeleteTask,
  handleUpdateTask,
}: TaskCardPropsWithSetters) {
  const [isStart, setIsStart] = useBoolean();
  const [addDescriptionFlag, setAddDescriptionFlag] = useBoolean(false);
  const [animateTimerIcon, setAnimateTimerIcon] = useBoolean(false);
  const [taskTitle, setTaskTitle] = useState(task.taskTitle || "");
  const [taskDescription, setTaskDescription] = useState(
    task.taskDescription || ""
  );
  const [tag_id, setTag_id] = useState(task.tag_id);
  const [tagList, setTagList] = useState<SelectTagProps[]>([]);

  // TODO：今のところタグの更新は実装しないため、親コンポーネントでタグの更新を行う
  useEffect(() => {
    const fetchTags = async () => {
      const tags = await getTags();
      setTagList(
        tags.map((tag: any) => ({
          tag_id: tag.tag_id,
          tagLabel: tag.tag_label,
          color: tag.tag_color,
        }))
      );
    };

    fetchTags();
  }, []);

  const draggableContext = useContext(DraggableContext);
  const inputTitleRef = useRef<HTMLInputElement>(null);

  const handleTimerStartSettings = (time: number) => {
    if (isStart) {
      handleUpdateTask(id, { ...task, timer: time });
    }
    setIsStart.toggle();
  };

  const handleTimerResetSettings = () => {
    handleUpdateTask(id, { ...task, timer: 0 });
    setIsStart.off();
  };

  const handleAnimateTimerIcon = () => {
    if (isStart) setAnimateTimerIcon.on();
    setTimeout(() => {
      setAnimateTimerIcon.off();
    }, 1000);
  };

  const handleUpdateTag = (tag_id: UUID) => {
    setTag_id(tag_id);
    handleUpdateTask(id, { ...task, tag_id });
  };

  return (
    <>
      <TaskKindTag
        tag_id={tag_id}
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
                  onBlur={(e) =>
                    handleUpdateTask(id, { ...task, taskTitle: e.target.value })
                  }
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
                  onBlur={(e) =>
                    handleUpdateTask(id, {
                      ...task,
                      taskDescription: e.target.value,
                    })
                  }
                  onChange={(e) => setTaskDescription(e.target.value)}
                />
              </CardBody>
            </Box>
          )}
        </FormControl>
      </Card>
    </>
  );
}
