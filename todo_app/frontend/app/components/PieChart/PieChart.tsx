import { VStack, Text, useTheme } from "@chakra-ui/react";
import {
  PieChart as RechartPieChart,
  ResponsiveContainer,
  Pie,
  Cell,
  type PieLabelRenderProps,
} from "recharts";

type PieChartData = {
  name: string;
  value: number;
  color: string;
};

export type PieChartProps = {
  pieChartTitle: string;
  data: PieChartData[];
};

const RADIAN = Math.PI / 180;

const createRenderCustomizedLabel =
  (data: PieChartData[]) => (props: PieLabelRenderProps) => {
    const { cx, cy, midAngle, outerRadius, index, percent } = props;
    if (
      index === undefined ||
      cx === undefined ||
      cy === undefined ||
      percent === undefined
    ) {
      return null;
    }
    const radius = (Number(outerRadius) ?? 0) + 60;
    const x = (Number(cx) || 0) + radius * Math.cos(-(midAngle ?? 0) * RADIAN);
    const y = (Number(cy) || 0) + radius * Math.sin(-(midAngle ?? 0) * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill={"#FBF9F1"}
        textAnchor={"middle"}
        dominantBaseline={"middle"}
        fontWeight={"bold"}
      >
        <tspan x={x} dy={"0"}>
          {`${data[index].name}`}
        </tspan>
        <tspan x={x} dy={"1em"}>
          {`${(percent * 100).toFixed(0)}%`}
        </tspan>
        <tspan x={x} dy={"1em"}>
          {`(${data[index].value}時間)`}
        </tspan>
      </text>
    );
  };

export function PieChart({ pieChartTitle, data }: PieChartProps) {
  const theme = useTheme();

  return (
    <VStack w={"100%"} h={"100%"}>
      <Text fontSize={"xl"} color={"secondary"} as={"b"}>
        {pieChartTitle}
      </Text>
      <ResponsiveContainer width={"100%"} height={"100%"}>
        <RechartPieChart>
          <Pie
            dataKey={"value"}
            data={data}
            label={createRenderCustomizedLabel(data)}
            cx={"50%"}
            cy={"50%"}
            stroke={theme.colors.secondary}
            outerRadius={"50%"}
            labelLine={true}
            rootTabIndex={-1}
            style={{
              outline: "none",
            }}
          >
            {data.map((entry) => (
              <Cell key={`cell-${entry.name}`} fill={entry.color} />
            ))}
          </Pie>
        </RechartPieChart>
      </ResponsiveContainer>
    </VStack>
  );
}
