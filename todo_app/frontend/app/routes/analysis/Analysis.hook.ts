import { useState } from "react";
import { getWeekEndDates, getWeekStartDates } from "./Analysis.lib";
import { useNavigate } from "@remix-run/react";

export const useAnalysis = () => {
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

  return {
    startDate,
    endDate,
    handleChangeStartDate,
    handleChangeEndDate,
  };
};
