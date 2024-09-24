import { LineChart } from "@/components/LineChart";
import { Box, HStack, VStack } from "@chakra-ui/react";
import { PieChart } from "@/components/PieChart";
import { Table } from "@/components/Table";

export function Analysis() {
  return (
    <HStack w={"100%"} h={"100%"} justify={"space-around"}>
      <VStack w={"100%"} h={"100%"}>
        <Box w={"100%"} h={"50%"} mb={10}>
          <LineChart
            lineChartTitle={"完了タスク数の推移"}
            data={[
              {
                日付: "2021-01-01",
                タスク数: 1,
              },
              {
                日付: "2021-01-02",
                タスク数: 2,
              },
              {
                日付: "2021-01-03",
                タスク数: 3,
              },
              {
                日付: "2021-01-04",
                タスク数: 4,
              },
              {
                日付: "2021-01-05",
                タスク数: 5,
              },
            ]}
          />
        </Box>
        <Box w={"90%"} maxH={{ base: "160px", "2xl": "300px" }}>
          <Table
            tableTitle={"未完了タスク一覧"}
            data={[
              {
                taskTitle: "test1",
                date: "2021-01-01",
              },
              {
                taskTitle: "test2",
                date: "2021-01-02",
              },
              {
                taskTitle: "test3",
                date: "2021-01-03",
              },
              {
                taskTitle: "test4",
                date: "2021-01-04",
              },
              {
                taskTitle: "test5",
                date: "2021-01-05",
              },
            ]}
          />
        </Box>
      </VStack>
      <PieChart
        pieChartTitle={"タスク種類別平均時間"}
        data={[
          {
            name: "test",
            value: 1,
            color: "#AFD3E2",
          },
          {
            name: "test",
            value: 2,
            color: "#146C94",
          },
          {
            name: "test",
            value: 3,
            color: "#FBF9F1",
          },
        ]}
      />
    </HStack>
  );
}
