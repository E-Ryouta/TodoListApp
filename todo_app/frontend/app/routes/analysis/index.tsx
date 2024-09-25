import { Analysis } from "./Analysis";
import { Box, VStack } from "@chakra-ui/react";
import { AnalysisDateBar } from "@/components/AnalysisDataBar";
import { useState } from "react";

function getWeekStartAndEndDates() {
  const today = new Date();
  const dayOfWeek = today.getDay();

  const monday = new Date(today);
  monday.setDate(today.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 2));

  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);

  return {
    startDate: monday.toISOString().split("T")[0],
    endDate: sunday.toISOString().split("T")[0],
  };
}

export default function App() {
  const { startDate: initialStartDate, endDate: initialEndDate } =
    getWeekStartAndEndDates();
  const [startDate, setStartDate] = useState(initialStartDate);
  const [endDate, setEndDate] = useState(initialEndDate);

  return (
    <VStack w={"100%"} h={"100%"} overflow={"hidden"}>
      <AnalysisDateBar
        startDate={startDate}
        endDate={endDate}
        handleStartDate={setStartDate}
        handleEndDate={setEndDate}
      />
      <Box
        h={"100%"}
        w={"100%"}
        display={"flex"}
        alignItems={"flex-start"}
        overflowX={"auto"}
        pl={"60px"}
      >
        <Analysis />
      </Box>
    </VStack>
  );
}
