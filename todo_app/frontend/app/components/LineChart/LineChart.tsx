import {
  LineChart as RechartsLineChar,
  Line,
  XAxis,
  CartesianGrid,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { VStack, Text, useTheme } from "@chakra-ui/react";

type LineChartData = {
  日付: string;
  タスク数: number;
};

type LineChartProps = {
  lineChartTitle: string;
  data: LineChartData[];
};

export function LineChart({ lineChartTitle, data }: LineChartProps) {
  const theme = useTheme();

  return (
    <VStack w={"100%"} h={"100%"}>
      <Text fontSize={"xl"} color={"secondary"} as={"b"}>
        {lineChartTitle}
      </Text>
      <ResponsiveContainer width={"100%"} height={"100%"}>
        <RechartsLineChar
          width={800}
          height={300}
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid
            strokeDasharray={"3 3"}
            strokeWidth={2}
            stroke={"gray"}
          />
          <XAxis
            dataKey={"日付"}
            className={"font"}
            strokeWidth={3}
            stroke={"gray"}
          />
          <YAxis strokeWidth={3} stroke={"gray"} />
          <Tooltip />
          <Legend display={""} iconSize={20} />
          <Line
            type={"monotone"}
            dataKey={"タスク数"}
            stroke={theme.colors.secondary}
            strokeWidth={3}
            activeDot={{ r: 10 }}
            dot={{ r: 5 }}
          />
        </RechartsLineChar>
      </ResponsiveContainer>
    </VStack>
  );
}
