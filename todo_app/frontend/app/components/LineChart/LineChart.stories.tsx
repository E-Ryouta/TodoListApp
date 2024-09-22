import { LineChart } from "./LineChart";
import { Meta, StoryObj } from "@storybook/react";

const uiLineChartMeta: Meta<typeof LineChart> = {
  title: "LineChart",
  component: LineChart,
};
export default uiLineChartMeta;

type LineChartStoryProps = StoryObj<typeof LineChart>;

export const LineChartStory: LineChartStoryProps = {};
