import { Box } from "@chakra-ui/react";
import { CustomDateSelector } from "../CustomDateSelector";

type TodoDateBarProps = {
  date: string;
  handleSetDate: (date: string) => void;
};

export function TodoDateBar({ date, handleSetDate }: TodoDateBarProps) {
  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      w={"100%"}
      bg={"tertiary"}
      zIndex={1}
    >
      <CustomDateSelector date={date} setDate={handleSetDate} />
    </Box>
  );
}
