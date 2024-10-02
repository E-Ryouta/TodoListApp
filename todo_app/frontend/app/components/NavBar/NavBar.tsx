import { Box, Flex, HStack, Text, Divider } from "@chakra-ui/react";

export function NavBar() {
  return (
    <Box pr={"2rem"} bg={"secondary"} h={"100%"}>
      <Flex alignItems={"center"} justifyContent={"space-between"} h={"100%"}>
        <HStack h={"100%"} pl={"2rem"}>
          <Text color={"primary"} fontWeight={"bold"} fontSize={"2rem"}>
            My Daily Todo
          </Text>
        </HStack>
      </Flex>
      <Divider />
    </Box>
  );
}
