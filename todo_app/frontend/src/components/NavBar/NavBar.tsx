import {
  Box,
  Flex,
  IconButton,
  Link,
  HStack,
  Text,
  Divider,
} from "@chakra-ui/react";
import { GiHamburgerMenu } from "react-icons/gi";

export function NavBar() {
  return (
    <Box pr={"2rem"} h={"50px"} bg={"white"}>
      <Flex alignItems={"center"} justifyContent={"space-between"} h={"100%"}>
        <HStack h={"100%"}>
          <IconButton
            aria-label="Hambuger Menu"
            variant="ghost"
            icon={<GiHamburgerMenu />}
            size="lg"
            onClick={() => {}}
          />
          <Link>
            <Text>My Daily Todo</Text>
          </Link>
        </HStack>
      </Flex>
      <Divider />
    </Box>
  );
}
