import { forwardRef } from "react";
import DatePicker from "react-datepicker";
import { HStack, IconButton, Button, useBoolean } from "@chakra-ui/react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { FaRegCalendar } from "react-icons/fa";
import "react-datepicker/dist/react-datepicker.css";

type DateBarProps = {
  date: string;
  setDate: (date: string) => void;
};

type CustomInputProps = {
  value?: string;
  onClick?: () => void;
};

export function DateBar({ date, setDate }: DateBarProps) {
  const [showDatePicker, setShowDatePicker] = useBoolean(false);

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

  const handleDataChange = (date: any) => {
    if (date) setDate(date.toISOString().split("T")[0]);
    setShowDatePicker.off();
  };

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

  return (
    <HStack>
      <IconButton
        size={"lg"}
        variant={"ghost"}
        fontSize={"3rem"}
        color={"secondary"}
        aria-label={"Prev Date"}
        onClick={handlePrevDate}
        icon={<MdKeyboardArrowLeft />}
      />
      <DatePicker
        selected={new Date(date)}
        onChange={(e) => handleDataChange(e)}
        onInputClick={() => setShowDatePicker.toggle()}
        onClickOutside={() => setShowDatePicker.off()}
        open={showDatePicker}
        customInput={<CustomInput />}
        enableTabLoop={false}
      />
      <IconButton
        size={"lg"}
        fontSize={"3rem"}
        variant={"ghost"}
        color={"secondary"}
        aria-label={"Next Date"}
        onClick={handleNextDate}
        icon={<MdKeyboardArrowRight />}
      />
    </HStack>
  );
}
