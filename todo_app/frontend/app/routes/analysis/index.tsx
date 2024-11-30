import { Analysis } from "./Analysis";
import { Box, VStack } from "@chakra-ui/react";
import { AnalysisDateBar } from "@/components/AnalysisDataBar";
import { useLoaderData } from "@remix-run/react";
import { analysisLoader } from "./Analysis.loader";
import { useAnalysis } from "./Analysis.hook";
import { analysisAction } from "./Analysis.action";

export const loader = analysisLoader;
export const action = analysisAction;

export default function App() {
  const { startDate, endDate, handleChangeStartDate, handleChangeEndDate, handleNavigationTodo, handleDeleteTask } =
    useAnalysis();
  const tasksWithTag = useLoaderData<typeof loader>();

  return (
    <VStack w={"100%"} h={"100%"} overflow={"hidden"}>
      <AnalysisDateBar
        startDate={startDate}
        endDate={endDate}
        handleStartDate={handleChangeStartDate}
        handleEndDate={handleChangeEndDate}
      />
      <Box
        h={"100%"}
        w={"100%"}
        display={"flex"}
        alignItems={"flex-start"}
        pl={"60px"}
      >
        <Analysis
          tasksWithTag={tasksWithTag}
          startDate={startDate}
          endDate={endDate}
          handleNavigationTodo={handleNavigationTodo}
          handleDeleteTask={handleDeleteTask}
        />
      </Box>
    </VStack>
  );
}
