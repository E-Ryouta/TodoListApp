import { forwardRef, useEffect, useState } from "react";
import { Button, useBoolean } from "@chakra-ui/react";
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

export function DateSelector({ date, setDate }: DateBarProps) {
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

  if (!isClient) return null;

  return (
    <DatePicker
      selected={new Date(date)}
      onChange={handleDateChange}
      onInputClick={setShowDatePicker.toggle}
      onClickOutside={setShowDatePicker.off}
      open={showDatePicker}
      customInput={<CustomInput />}
    />
  );
}
