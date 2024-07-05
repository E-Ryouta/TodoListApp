import { NavBar } from "./NavBar";
import { Meta, StoryObj } from "@storybook/react";

const uiNavBarMeta: Meta<typeof NavBar> = {
  title: "NavBar",
  component: NavBar,
};
export default uiNavBarMeta;

type NavBarStoryProps = StoryObj<typeof NavBar>;

export const NavBarStory: NavBarStoryProps = {};
