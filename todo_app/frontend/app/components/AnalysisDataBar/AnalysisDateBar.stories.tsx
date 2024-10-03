import { AnalysisDateBar } from "./AnalysisDateBar";
import { Meta, StoryObj } from "@storybook/react";

const uiAnalysisDateBarMeta: Meta<typeof AnalysisDateBar> = {
  title: "AnalysisDateBar",
  component: AnalysisDateBar,
};
export default uiAnalysisDateBarMeta;

type AnalysisDateBarStoryProps = StoryObj<typeof AnalysisDateBar>;

export const AnalysisDateBarStory: AnalysisDateBarStoryProps = {
  args: {
    startDate: "2022-01-01",
    endDate: "2022-01-31",
    handleStartDate: () => {},
    handleEndDate: () => {},
  },
};
