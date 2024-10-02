import { Box, VStack } from "@chakra-ui/react";
import { TodoDateBar } from "@/components/TodoDateBar";
import { TodoList } from "./TodoList";
import { useState } from "react";
import { todoListLoader } from "./TodoList.loader";
import { useLoaderData, useNavigate, useSearchParams } from "@remix-run/react";
import { todoListAction } from "./TodoList.action";

export const loader = todoListLoader;
export const action = todoListAction;

export default function App() {
  const navigation = useNavigate();
  const [searchParams] = useSearchParams();
  const { tasks, tagList } = useLoaderData<typeof loader>();
  const [date, setDate] = useState(
    searchParams.get("date") || new Date().toISOString().split("T")[0]
  );

  const handleSetDate = (date: string) => {
    setDate(date);
    return navigation(`/todo?date=${date}`);
  };

  return (
    <VStack w={"100%"} h={"100%"} overflow={"hidden"}>
      <TodoDateBar date={date} handleSetDate={handleSetDate} />
      <Box
        h={"100%"}
        w={"100%"}
        display={"flex"}
        alignItems={"flex-start"}
        overflow={"auto"}
        pl={"60px"}
      >
        <TodoList date={date} tasks={tasks} tagList={tagList} />
      </Box>
    </VStack>
  );
}
