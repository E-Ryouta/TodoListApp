import { LineChart } from "./LineChart";
import { Meta, StoryObj } from "@storybook/react";

const uiLineChartMeta: Meta<typeof LineChart> = {
  title: "LineChart",
  component: LineChart,
};
export default uiLineChartMeta;

type LineChartStoryProps = StoryObj<typeof LineChart>;

export const LineChartStory: LineChartStoryProps = {
  args: {
    lineChartTitle: "Line Chart",
    data: [
      {
        日付: "2022-01-01",
        タスク数: 10,
      },
      {
        日付: "2022-01-02",
        タスク数: 20,
      },
      {
        日付: "2022-01-03",
        タスク数: 30,
      },
      {
        日付: "2022-01-04",
        タスク数: 40,
      },
      {
        日付: "2022-01-05",
        タスク数: 50,
      },
    ],
  },
};
