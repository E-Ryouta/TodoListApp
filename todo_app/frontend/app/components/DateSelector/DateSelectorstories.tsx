import { DateSelector } from "./DateSelector";
import { Meta, StoryObj } from "@storybook/react";

const uiDateSelectMeta: Meta<typeof DateSelector> = {
  title: "DateSelector",
  component: DateSelector,
};
export default uiDateSelectMeta;

type DateSelectStoryProps = StoryObj<typeof DateSelector>;

export const DateSelectStory: DateSelectStoryProps = {
  args: {
    date: "2022-01-01",
    setDate: () => {},
  },
};
