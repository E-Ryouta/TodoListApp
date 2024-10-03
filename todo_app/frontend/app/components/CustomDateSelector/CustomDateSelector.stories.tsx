import { CustomDateSelector } from "./CustomDateSelector";
import { Meta, StoryObj } from "@storybook/react";

const uiCustomDateSelectMeta: Meta<typeof CustomDateSelector> = {
  title: "CustomDateSelector",
  component: CustomDateSelector,
};
export default uiCustomDateSelectMeta;

type CustomDateSelectStoryProps = StoryObj<typeof CustomDateSelector>;

export const CustomDateSelectStory: CustomDateSelectStoryProps = {
  args: {
    date: "2022-01-01",
    handleSetDate: () => {},
  },
};
