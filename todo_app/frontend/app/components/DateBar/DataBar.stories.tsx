import { DateBar } from "./DateBar";
import { Meta, StoryObj } from "@storybook/react";

const uiDateBarMeta: Meta<typeof DateBar> = {
  title: "DateBar",
  component: DateBar,
};
export default uiDateBarMeta;

type DateBarStoryProps = StoryObj<typeof DateBar>;

export const DateBarStory: DateBarStoryProps = {
  args: {
    date: "2022-01-01",
    setDate: () => {},
  },
};
