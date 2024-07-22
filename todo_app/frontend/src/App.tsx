import "./App.css";
import { HStack, Box, IconButton, useBoolean } from "@chakra-ui/react";
import { SideBar } from "./common/components/ui/SideBar/SideBar";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import { useState } from "react";
import { DateBar } from "./common/components/ui/DateBar";
import { TodoList } from "./common/components/todoList";

function App() {
  const [isOpen, setIsOpen] = useBoolean();
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  return (
    <div>
      <Box
        position={"fixed"}
        top={"80px"}
        pl={isOpen ? "200px" : "50px"}
        display={"flex"}
        justifyContent="center"
        w={"100%"}
        bg={"tertiary"}
      >
        <DateBar date={date} setDate={setDate} />
      </Box>
      <HStack h={"calc(100vh - 80px)"}>
        <HStack h={"100%"}>
          {isOpen && <SideBar></SideBar>}
          <IconButton
            aria-label="SideBarToggle"
            borderRadius={50}
            variant={"outline"}
            size={"lg"}
            mx={"1rem"}
            bg={"white"}
            icon={isOpen ? <IoIosArrowDropleft /> : <IoIosArrowDropright />}
            onClick={() => setIsOpen.toggle()}
          />
        </HStack>
        <TodoList date={date} />
      </HStack>
    </div>
  );
}

export default App;
