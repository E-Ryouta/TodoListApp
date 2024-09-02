import { DroppableContainer } from "./DroppableContainer";
import { Meta, StoryObj } from "@storybook/react";
import { v4 as uuid4 } from "uuid";
import { UUID } from "crypto";

const uiDroppableContainerMeta: Meta<typeof DroppableContainer> = {
  title: "DroppableContainer",
  component: DroppableContainer,
};
export default uiDroppableContainerMeta;

type DroppableContainerStoryProps = StoryObj<typeof DroppableContainer>;

export const DroppableContainerStory: DroppableContainerStoryProps = {
  args: {
    id: uuid4() as UUID,
    items: [],
  },
};
