import {
  Table as ChakraUiTable,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Text,
  VStack,
  HStack,
  IconButton,
  useBoolean,
} from "@chakra-ui/react";
import {
  FaTasks,
  FaCalendarDay,
  FaSortAmountDown,
  FaSortAmountUp,
} from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

type TableDataProps = {
  id: string;
  taskTitle: string;
  date: string;
};

export type TableProps = {
  tableTitle: string;
  data: TableDataProps[];
  handleDeleteTask: (taskId:string) => void;
};

export function Table({ tableTitle, data, handleDeleteTask }: TableProps) {
  const [isSortAsc, setIsSortAsc] = useBoolean(false);

  const handleSort = () => {
    setIsSortAsc.toggle();
    if (isSortAsc) {
      return data.sort((a, b) => a.date.localeCompare(b.date));
    } else {
      return data.sort((a, b) => b.date.localeCompare(a.date));
    }
  };

  return (
    <VStack w={"100%"} h={"100%"}>
      <Text fontSize={"xl"} color={"secondary"} as={"b"}>
        {tableTitle}
      </Text>
      <TableContainer w={"100%"} overflowY={"scroll"}>
        <ChakraUiTable>
          <Thead position={"sticky"} top={0} bgColor={"secondary"}>
            <Tr>
              <Th py={2}>
                <HStack color={"tertiary"}>
                  <FaTasks />
                  <Text>タスク</Text>
                </HStack>
              </Th>
              <Th py={2}>
                <HStack color={"tertiary"} justifyContent={"space-between"}>
                  <HStack>
                    <FaCalendarDay />
                    <Text>日付</Text>
                  </HStack>
                </HStack>
              </Th>
              <Th py={2} textAlign={"center"}>
                <IconButton
                    aria-label={"Sort"}
                    size={"sm"}
                    variant={"outline"}
                    onClick={handleSort}
                    color={"tertiary"}
                    _hover={{
                      bg: "rgba(255, 255, 255, 0.2)", // ホバー時のアイコンの色
                    }}
                  >
                    {isSortAsc ? <FaSortAmountDown /> : <FaSortAmountUp />}
                  </IconButton>
              </Th>
            </Tr>
          </Thead>
          <Tbody bgColor={"tertiary"}>
            {data.map((item) => {
              return (
                <Tr key={item.taskTitle}>
                  <Td>{item.taskTitle}</Td>
                  <Td>{item.date}</Td>
                  <Td textAlign={"center"}>
                    <IconButton
                      variant={"ghost"}
                      aria-label={"delete"}
                      icon={<MdDeleteOutline />}
                      onClick={() => handleDeleteTask(item.id)}
                    />
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </ChakraUiTable>
      </TableContainer>
    </VStack>
  );
}

