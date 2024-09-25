import { AnalysisDateBar } from "./AnalysisDateBar";
import { Meta, StoryObj } from "@storybook/react";

const uiTableMeta: Meta<typeof AnalysisDateBar> = {
  title: "AnalysisDateBar",
  component: AnalysisDateBar,
};
export default uiTableMeta;

type TableStoryProps = StoryObj<typeof AnalysisDateBar>;

export const TableStory: TableStoryProps = {};
