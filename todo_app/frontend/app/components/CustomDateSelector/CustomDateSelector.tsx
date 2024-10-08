import { HStack, IconButton } from "@chakra-ui/react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import "react-datepicker/dist/react-datepicker.css";
import React from "react";
import { DateSelector } from "../DateSelector";

type DateBarProps = {
  date: string;
  handleSetDate: (date: string) => void;
};

export function CustomDateSelector({ date, handleSetDate }: DateBarProps) {
  const changeDate = (days: number) => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + days);
    handleSetDate(newDate.toISOString().split("T")[0]);
  };

  return (
    <HStack>
      <IconButton
        size={"lg"}
        variant={"ghost"}
        fontSize={"3rem"}
        color={"secondary"}
        aria-label={"Prev Date"}
        onClick={() => changeDate(-1)}
        icon={<MdKeyboardArrowLeft />}
      />
      <React.Suspense fallback={<div>Loading...</div>}>
        <DateSelector date={date} handleSetDate={handleSetDate} />
      </React.Suspense>
      <IconButton
        size={"lg"}
        fontSize={"3rem"}
        variant={"ghost"}
        color={"secondary"}
        aria-label={"Next Date"}
        onClick={() => changeDate(1)}
        icon={<MdKeyboardArrowRight />}
      />
    </HStack>
  );
}
