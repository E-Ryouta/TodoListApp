import { CustomDateSelector } from "./CustomDateSelector";
import { Meta, StoryObj } from "@storybook/react";

const uiDateSelectMeta: Meta<typeof CustomDateSelector> = {
  title: "CustomDateSelector",
  component: CustomDateSelector,
};
export default uiDateSelectMeta;

type DateSelectStoryProps = StoryObj<typeof CustomDateSelector>;

export const DateSelectStory: DateSelectStoryProps = {
  args: {
    date: "2022-01-01",
    setDate: () => {},
  },
};
