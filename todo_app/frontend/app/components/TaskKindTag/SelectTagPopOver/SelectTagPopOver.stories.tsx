import { SelectTagPopOver } from "./SelectTagPopOver";
import { Button } from "@chakra-ui/react";
import { Meta, StoryObj } from "@storybook/react";

const uiSelectTagPopOverMeta: Meta<typeof SelectTagPopOver> = {
  title: "SelectTagPopOver",
  component: SelectTagPopOver,
};
export default uiSelectTagPopOverMeta;

type SelectTagPopOverStoryProps = StoryObj<typeof SelectTagPopOver>;

export const SelectTagPopOverStory: SelectTagPopOverStoryProps = {
  args: {
    tagList: [
      {
        tagLabel: "Task",
        color: "blue",
      },
      {
        tagLabel: "Event",
        color: "green",
      },
      {
        tagLabel: "Memo",
        color: "red",
      },
    ],
  },
};
