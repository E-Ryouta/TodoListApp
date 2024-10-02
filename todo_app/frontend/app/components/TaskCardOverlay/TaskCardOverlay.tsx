import {
  Card,
  CardHeader,
  Divider,
  Input,
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
import { Timer } from "../TimerCard";
import { TaskKindTag } from "../TaskKindTag/TaskKindTag";
import { SelectTagProps } from "../TaskKindTag/SelectTagPopOver";
import type { TaskCardProps } from "../TaskCard";

type TaskCardPropsWithSetters = {
  task: TaskCardProps;
  addTimerFlag: boolean;
  tagList: SelectTagProps[];
  startClickApproveFlg: boolean;
};

export function TaskCardOverlay({
  task,
  tagList,
  addTimerFlag,
  startClickApproveFlg,
}: TaskCardPropsWithSetters) {
  return (
    <>
      <TaskKindTag
        tagId={task.tagId}
        tagList={tagList}
        handleUpdateTag={() => {}}
      />
      <Card variant={"elevated"} size={"sm"}>
        <FormControl>
          {addTimerFlag && (
            <Box>
              <Timer
                isStart={false}
                animateTimerIcon={false}
                defaultTime={task.taskTimer}
                startClickApproveFlg={startClickApproveFlg}
                updateTimerSettings={() => {}}
                resetTimerSettings={() => {}}
              />
              <Divider />
            </Box>
          )}
          <CardHeader>
            <Flex>
              <IconButton
                variant={"ghost"}
                aria-label={"drag"}
                cursor={"grabbing"}
                icon={<MdDragIndicator />}
              />
              <Tooltip label={task.taskTitle || ""} placement={"top"}>
                <Input
                  ml={4}
                  variant={"unstyled"}
                  defaultValue={task.taskTitle || ""}
                />
              </Tooltip>
              <Tooltip label={"詳細を記載する"} placement={"top"}>
                <IconButton
                  variant={"ghost"}
                  aria-label="add description"
                  icon={<MdOutlineDescription />}
                />
              </Tooltip>
              <IconButton
                variant={"ghost"}
                aria-label="delete"
                icon={<MdDeleteOutline />}
              />
            </Flex>
          </CardHeader>
        </FormControl>
      </Card>
    </>
  );
}
