import { LineChart } from "@/components/LineChart";
import { Box, HStack, VStack } from "@chakra-ui/react";
import { PieChart } from "@/components/PieChart";
import { Table } from "@/components/Table";
import type { getTasksWithTagResponse } from "./_endpoints/getTasksWithTag";
import { generateLineChartData } from "./Analysis.lib";

type AnalysisProps = {
  startDate: string;
  endDate: string;
  tasksWithTag: getTasksWithTagResponse;
};

export function Analysis({ tasksWithTag, startDate, endDate }: AnalysisProps) {
  const lineChartData = generateLineChartData(
    tasksWithTag.taskSumWithDate,
    startDate,
    endDate
  );

  const tableData = tasksWithTag.doingTodoTasks.map((task) => {
    return {
      taskTitle: task.taskTitle,
      date: task.createdAt,
    };
  });

  const pieChartData = tasksWithTag.averageTimePerTag.map((task) => {
    return {
      name: task.tagLabel,
      value: parseFloat((task.averageDuration / 3600).toFixed(3)),
      color: task.tagColor,
    };
  });

  return (
    <HStack w={"100%"} h={"100%"} justify={"space-around"}>
      <VStack w={"100%"} h={"100%"}>
        <Box w={"100%"} h={"50%"} mb={10}>
          <LineChart
            lineChartTitle={"完了タスク数の推移"}
            data={lineChartData}
          />
        </Box>
        <Box w={"90%"} maxH={{ base: "160px", "2xl": "300px" }}>
          <Table tableTitle={"未完了タスク一覧"} data={tableData} />
        </Box>
      </VStack>
      <PieChart pieChartTitle={"タスク種類別平均時間"} data={pieChartData} />
    </HStack>
  );
}
