import { Timer } from "./Timer";
import { Meta, StoryObj } from "@storybook/react";

const uiTimerMeta: Meta<typeof Timer> = {
  title: "Timer",
  component: Timer,
};
export default uiTimerMeta;

type TimerStoryProps = StoryObj<typeof Timer>;

export const TimerCardStory: TimerStoryProps = {
  args: {},
};
