import { Box, Flex, Link, HStack, Text, Divider } from "@chakra-ui/react";

export function NavBar() {
  return (
    <Box pr={"2rem"} h={"80px"} bg={"secondary"}>
      <Flex alignItems={"center"} justifyContent={"space-between"} h={"100%"}>
        <HStack h={"100%"} pl={"2rem"}>
          <Link>
            <Text color={"primary"} fontWeight={"bold"} fontSize={"2rem"}>
              My Daily Todo
            </Text>
          </Link>
        </HStack>
      </Flex>
      <Divider />
    </Box>
  );
}
