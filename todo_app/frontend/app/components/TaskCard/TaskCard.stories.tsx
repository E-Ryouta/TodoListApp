import { TaskCard, TaskCardProps } from "./TaskCard";
import { Button } from "@chakra-ui/react";
import { Meta, StoryObj } from "@storybook/react";

const uiTaskCardMeta: Meta<typeof TaskCard> = {
  title: "TaskCard",
  component: TaskCard,
};
export default uiTaskCardMeta;

type TaskCardStoryProps = StoryObj<typeof TaskCard>;

export const TaskCardStory: TaskCardStoryProps = {
  args: {
    task: {
      id: "93fb86a6-61a7-7167-f7ad-4309382e1113",
      taskTitle: "string",
      taskDescription: "string",
      timer: 0,
    },
    addTimerFlag: true,
    startClickApproveFlg: true,
    handleDeleteTask: (taskId: string) => {},
    handleTimerUpdate: (taskId: string, task: TaskCardProps) => {},
    handleOnBlur: (taskId: string, task: TaskCardProps) => {},
  },
};
