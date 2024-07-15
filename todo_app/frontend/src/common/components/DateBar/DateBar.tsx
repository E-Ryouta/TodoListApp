import { HStack, Input, IconButton } from "@chakra-ui/react";
import { useState } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

type DateBarProps = {
  date: string;
  setDate: (date: string) => void;
};

export function DateBar({ date, setDate }: DateBarProps) {
  const handlePrevDate = () => {
    const prevDate = new Date(date);
    prevDate.setDate(prevDate.getDate() - 1);
    const formattedDate = prevDate.toISOString().split("T")[0];
    setDate(formattedDate);
  };

  const handleNextDate = () => {
    const nextDate = new Date(date);
    nextDate.setDate(nextDate.getDate() + 1);
    const formattedDate = nextDate.toISOString().split("T")[0];
    setDate(formattedDate);
  };

  return (
    <HStack>
      <IconButton
        aria-label={"Prev Date"}
        icon={<MdKeyboardArrowLeft />}
        variant={"ghost"}
        onClick={handlePrevDate}
        size={"lg"}
      />
      <Input
        type={"date"}
        variant={"unstyled"}
        size={"lg"}
        w={"200px"}
        onChange={(e) => setDate(e.target.value)}
        value={date}
      />
      <IconButton
        aria-label={"Next Date"}
        icon={<MdKeyboardArrowRight />}
        variant={"ghost"}
        onClick={handleNextDate}
        size={"lg"}
      />
    </HStack>
  );
}
