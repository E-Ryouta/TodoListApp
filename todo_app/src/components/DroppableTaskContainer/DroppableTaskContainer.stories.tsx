import { DroppableTaskContainer } from "./DroppableTaskContainer";
import { Meta, StoryObj } from "@storybook/react";

const uiDroppableTaskContainerdMeta: Meta<typeof DroppableTaskContainer> = {
  title: "DroppableTaskContainer",
  component: DroppableTaskContainer,
};
export default uiDroppableTaskContainerdMeta;

type DroppableTaskContainerStoryProps = StoryObj<typeof DroppableTaskContainer>;

export const DroppableTaskContainerStory: DroppableTaskContainerStoryProps = {
  args: {
    progressHeader: "To Do",
    tasks: [],
  },
};
