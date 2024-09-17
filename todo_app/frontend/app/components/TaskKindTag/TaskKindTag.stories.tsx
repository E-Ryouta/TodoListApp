import { TaskKindTag } from "./TaskKindTag";
import { Meta, StoryObj } from "@storybook/react";

const uiTaskKindTagMeta: Meta<typeof TaskKindTag> = {
  title: "TaskKindTag",
  component: TaskKindTag,
};
export default uiTaskKindTagMeta;

type TaskKindTagStoryProps = StoryObj<typeof TaskKindTag>;

export const TaskKindTagStory: TaskKindTagStoryProps = {
  args: {
    tagLabel: "Task",
  },
};
