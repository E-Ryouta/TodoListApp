import { Heading, VStack } from "@chakra-ui/react";
import { SideBarButton } from "./SideBarButton";
import { FcTodoList } from "react-icons/fc";
import { BsGraphUp } from "react-icons/bs";

export function SideBar() {
  return (
    <VStack h={"100%"} bg={"tertiary"}>
      <Heading color={"secondary"}>Menu</Heading>
      <SideBarButton
        buttonTitle={"Todo List"}
        leftIcon={<FcTodoList />}
        navigateTo={"/todo"}
      />
      <SideBarButton
        buttonTitle={"Analysis"}
        leftIcon={<BsGraphUp />}
        navigateTo={"/analysis"}
      />
    </VStack>
  );
}
