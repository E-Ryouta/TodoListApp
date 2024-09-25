import { Box, Text } from "@chakra-ui/react";
import { DateSelector } from "@/components/DateSelector";

type AnalysisDataBarProps = {
  startDate: string;
  endDate: string;
  handleStartDate: (date: string) => void;
  handleEndDate: (date: string) => void;
};

export function AnalysisDateBar({
  startDate,
  endDate,
  handleStartDate,
  handleEndDate,
}: AnalysisDataBarProps) {
  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      w={"100%"}
      bg={"tertiary"}
      zIndex={1}
    >
      <DateSelector date={startDate} setDate={handleStartDate} />
      <Text fontSize={"2xl"} fontWeight={"bold"} color={"secondary"}>
        ~
      </Text>
      <DateSelector date={endDate} setDate={handleEndDate} />
    </Box>
  );
}
