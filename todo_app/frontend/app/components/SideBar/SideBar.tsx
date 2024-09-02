import { Heading, VStack } from "@chakra-ui/react";
import { SideBarButton } from "./SideBarButton";
import { FcTodoList } from "react-icons/fc";

export function SideBar() {
  return (
    <VStack w={"200px"} h={"100%"} bg={"tertiary"}>
      <Heading color={"secondary"}>Menu</Heading>
      <SideBarButton buttonTitle={"Todo List"} leftIcon={<FcTodoList />} />
    </VStack>
  );
}
