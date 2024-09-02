import { TimerSettingModal } from "./TimerSettingModal";
import { Meta, StoryObj } from "@storybook/react";

const uiTimerMeta: Meta<typeof TimerSettingModal> = {
  title: "TimerSettingModalr",
  component: TimerSettingModal,
};
export default uiTimerMeta;

type TimerStoryProps = StoryObj<typeof TimerSettingModal>;

export const TimerCardStory: TimerStoryProps = {
  args: {},
};
