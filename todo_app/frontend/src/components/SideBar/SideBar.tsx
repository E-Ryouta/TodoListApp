import { Box, Heading, Divider } from "@chakra-ui/react";

export function SideBar() {
  return (
    <Box
      left={0}
      p={5}
      w={"200px"}
      top={0}
      h={"100%"}
      textAlign={"center"}
      position={"relative"}
      bg={"white"}
    >
      <Heading>Menu</Heading>
      <Divider />
    </Box>
  );
}
