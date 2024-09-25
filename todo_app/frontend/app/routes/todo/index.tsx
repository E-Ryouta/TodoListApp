import { Box, VStack } from "@chakra-ui/react";
import { TodoDateBar } from "@/components/TodoDateBar";
import { TodoList } from "./TodoList";
import { useState } from "react";

export default function App() {
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  return (
    <VStack w={"100%"} h={"100%"} overflow={"hidden"}>
      <TodoDateBar date={date} handleSetDate={setDate} />
      <Box
        h={"100%"}
        w={"100%"}
        display={"flex"}
        alignItems={"flex-start"}
        overflowX={"auto"}
        pl={"60px"}
      >
        <TodoList date={date} />
      </Box>
    </VStack>
  );
}
