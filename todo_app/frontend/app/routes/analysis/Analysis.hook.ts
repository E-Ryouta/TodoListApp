import { useState } from "react";
import { getWeekEndDates, getWeekStartDates } from "./Analysis.lib";
import { useFetcher, useNavigate } from "@remix-run/react";
import { deleteTask } from "./_endpoints";

export const useAnalysis = () => {
  const fetcher = useFetcher();
  const navigation = useNavigate();
  const [startDate, setStartDate] = useState(getWeekStartDates());
  const [endDate, setEndDate] = useState(getWeekEndDates());

  const handleChangeStartDate = (date: string) => {
    setStartDate(date);
    navigation(`/analysis?startDate=${date}&endDate=${endDate}`);
  };

  const handleChangeEndDate = (date: string) => {
    setEndDate(date);
    navigation(`/analysis?startDate=${startDate}&endDate=${date}`);
  };

  const handleDeleteTask= async (taskId: string) => {
    fetcher.submit(
      { taskId: taskId },
      { method: "DELETE", encType: "application/json" }
    );
  };

  return {
    startDate,
    endDate,
    handleChangeStartDate,
    handleChangeEndDate,
    handleDeleteTask
  };
};
