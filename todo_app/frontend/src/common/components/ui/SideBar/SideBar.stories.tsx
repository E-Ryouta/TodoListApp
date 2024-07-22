import { SideBar } from "./SideBar";
import { Meta, StoryObj } from "@storybook/react";

const uiSideBarMeta: Meta<typeof SideBar> = {
  title: "SideBar",
  component: SideBar,
};
export default uiSideBarMeta;

type SideBarStoryProps = StoryObj<typeof SideBar>;

export const SideBarStory: SideBarStoryProps = {};
