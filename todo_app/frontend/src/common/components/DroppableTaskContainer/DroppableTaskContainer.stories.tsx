import { DroppableTaskContainer } from "./DroppableTaskContainer";
import { Meta, StoryObj } from "@storybook/react";
import { v4 as uuid4 } from "uuid";
import { UUID } from "crypto";

const uiDroppableTaskContainerdMeta: Meta<typeof DroppableTaskContainer> = {
  title: "DroppableTaskContainer",
  component: DroppableTaskContainer,
};
export default uiDroppableTaskContainerdMeta;

type DroppableTaskContainerStoryProps = StoryObj<typeof DroppableTaskContainer>;

export const DroppableTaskContainerStory: DroppableTaskContainerStoryProps = {
  args: {
    id: uuid4() as UUID,
    progressHeader: "In Progress",
    tasks: [],
    setTaskContainerList: () => {},
  },
};
