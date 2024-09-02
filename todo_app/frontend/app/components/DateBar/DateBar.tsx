import { forwardRef, useEffect, useState } from "react";
import { HStack, IconButton, Button, useBoolean } from "@chakra-ui/react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { FaRegCalendar } from "react-icons/fa";
import "react-datepicker/dist/react-datepicker.css";
import React from "react";

const DatePicker = React.lazy(() => import("react-datepicker"));

type DateBarProps = {
  date: string;
  setDate: (date: string) => void;
};

type CustomInputProps = {
  value?: string;
  onClick?: () => void;
};

export function DateBar({ date, setDate }: DateBarProps) {
  const [isClient, setIsClient] = useState(false);
  const [showDatePicker, setShowDatePicker] = useBoolean(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const CustomInput = forwardRef<HTMLButtonElement, CustomInputProps>(
    ({ value, onClick }, ref) => (
      <Button
        gap={2}
        variant={"ghost"}
        color={"secondary"}
        rightIcon={<FaRegCalendar />}
        fontSize={"30px"}
        ref={ref}
        onClick={onClick}
      >
        {value}
      </Button>
    )
  );

  const handleDateChange = (date: any) => {
    if (date) setDate(date.toISOString().split("T")[0]);
    setShowDatePicker.off();
  };

  const changeDate = (days: number) => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + days);
    setDate(newDate.toISOString().split("T")[0]);
  };

  if (!isClient) return null;

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
        <DatePicker
          selected={new Date(date)}
          onChange={handleDateChange}
          onInputClick={setShowDatePicker.toggle}
          onClickOutside={setShowDatePicker.off}
          open={showDatePicker}
          customInput={<CustomInput />}
        />
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
