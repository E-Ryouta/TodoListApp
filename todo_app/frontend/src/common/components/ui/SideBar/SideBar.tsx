import { Box, Heading, VStack } from "@chakra-ui/react";
import { SideBarButton } from "./SideBarButton";
import { FcTodoList } from "react-icons/fc";

export function SideBar() {
  return (
    <VStack
      top={0}
      left={0}
      pt={2}
      pb={4}
      w={"200px"}
      h={"100%"}
      textAlign={"center"}
      position={"relative"}
      bg={"tertiary"}
    >
      <Heading color={"secondary"}>Menu</Heading>
      <SideBarButton buttonTitle={"Todo List"} leftIcon={<FcTodoList />} />
    </VStack>
  );
}
