import { LineChart } from "@/components/LineChart";
import { HStack, Box, VStack } from "@chakra-ui/react";

export function Analysis() {
  return (
    <HStack w={"100%"} h={"100%"} justify={"space-between"}>
      <VStack w={"100%"} h={"100%"} justify={"space-around"}>
        <LineChart
          lineChartTitle={"test"}
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
      </VStack>
      <LineChart
        lineChartTitle={"test"}
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
    </HStack>
  );
}
