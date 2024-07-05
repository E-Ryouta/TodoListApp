import { DraggableTaskCard } from "./DraggableTaskCard";
import { Meta, StoryObj } from "@storybook/react";

const uiDraggableTaskCardCardMeta: Meta<typeof DraggableTaskCard> = {
  title: "DraggableTaskCard",
  component: DraggableTaskCard,
};
export default uiDraggableTaskCardCardMeta;

type DraggableTaskCardStoryProps = StoryObj<typeof DraggableTaskCard>;

export const DraggableTaskCardStory: DraggableTaskCardStoryProps = {
  args: {
    id: "1",
    taskTitle: "Task Title",
    taskDescription: "Task Description",
  },
};
