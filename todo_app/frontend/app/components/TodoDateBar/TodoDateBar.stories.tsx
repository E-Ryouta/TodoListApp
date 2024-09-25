import { TodoDateBar } from "./TodoDateBar";
import { Meta, StoryObj } from "@storybook/react";

const uiTableMeta: Meta<typeof TodoDateBar> = {
  title: "TodoDateBar",
  component: TodoDateBar,
};
export default uiTableMeta;

type TableStoryProps = StoryObj<typeof TodoDateBar>;

export const TableStory: TableStoryProps = {};
