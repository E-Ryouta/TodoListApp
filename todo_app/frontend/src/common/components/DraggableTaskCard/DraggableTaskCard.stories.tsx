import { DraggableTaskCard } from "./DraggableTaskCard";
import { Meta, StoryObj } from "@storybook/react";
import { UUID } from "crypto";
import { v4 as uuidv4 } from "uuid";

const uiDraggableTaskCardCardMeta: Meta<typeof DraggableTaskCard> = {
  title: "DraggableTaskCard",
  component: DraggableTaskCard,
};
export default uiDraggableTaskCardCardMeta;

type DraggableTaskCardStoryProps = StoryObj<typeof DraggableTaskCard>;

export const DraggableTaskCardStory: DraggableTaskCardStoryProps = {
  args: {
    id: uuidv4() as UUID,
    taskTitle: "Task Title",
    taskDescription: "Task Description",
    containerId: uuidv4() as UUID,
  },
};
