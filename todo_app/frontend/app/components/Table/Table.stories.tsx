import { Table } from "./Table";
import { Meta, StoryObj } from "@storybook/react";

const uiTableMeta: Meta<typeof Table> = {
  title: "Table",
  component: Table,
};
export default uiTableMeta;

type TableStoryProps = StoryObj<typeof Table>;

export const TableStory: TableStoryProps = {};
