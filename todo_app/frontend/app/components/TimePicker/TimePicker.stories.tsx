import { TimePicker } from "./TimePicker";
import { Meta, StoryObj } from "@storybook/react";

const uiTimePickerMeta: Meta<typeof TimePicker> = {
  title: "TimePicker",
  component: TimePicker,
};
export default uiTimePickerMeta;

type TimePickerStoryProps = StoryObj<typeof TimePicker>;

export const TimePickerStory: TimePickerStoryProps = {
  args: {
    updateTimerSettings: () => {},
  },
};
