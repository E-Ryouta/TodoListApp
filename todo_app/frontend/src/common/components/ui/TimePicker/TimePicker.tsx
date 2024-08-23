import {
  HStack,
  VStack,
  Text,
  Box,
  Button,
  Input,
  PopoverTrigger,
  Popover,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
  useNumberInput,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

type TimePickerProps = {
  updateTimerSettings: (time: number) => void;
};

export function TimePicker({ updateTimerSettings }: TimePickerProps) {
  const [time, setTime] = useState({ Hour: 0, Minute: 0, Second: 0 });

  const handleUpdateTimer = (time: number, timeType: string) => {
    setTime((prevTime) => {
      return { ...prevTime, [timeType]: time };
    });
  };

  useEffect(() => {
    console.log(time.Hour);
    const timeToSeconds = time.Hour * 3600 + time.Minute * 60 + time.Second;
    console.log(timeToSeconds);
    updateTimerSettings(timeToSeconds);
  }, [time]);

  return (
    <Box>
      <HStack w={"100%"} justifyContent={"center"}>
        <VStack gap={0}>
          <TimerSettingsPopover
            handleUpdateTimer={handleUpdateTimer}
            timeType={"Hour"}
          />
          <Text>Hours</Text>
        </VStack>
        <Text fontSize={"3xl"}>:</Text>
        <VStack gap={0}>
          <TimerSettingsPopover
            handleUpdateTimer={handleUpdateTimer}
            timeType={"Minute"}
          />
          <Text>Minutes</Text>
        </VStack>
        <Text fontSize={"3xl"}>:</Text>
        <VStack gap={0}>
          <TimerSettingsPopover
            handleUpdateTimer={handleUpdateTimer}
            timeType={"Second"}
          />
          <Text>Seconds</Text>
        </VStack>
      </HStack>
    </Box>
  );
}

type TimerSettingsPopoverProps = {
  timeType: string;
  handleUpdateTimer: (time: number, timeType: string) => void;
};
const TimerSettingsPopover = ({
  timeType,
  handleUpdateTimer,
}: TimerSettingsPopoverProps) => {
  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
      step: 1,
      defaultValue: 0,
      min: timeType === "Hour" ? 0 : 0,
      max: timeType === "Hour" ? 23 : 59,
    });

  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps();

  useEffect(() => {
    const numericValue = parseInt(input.value);
    handleUpdateTimer(numericValue, timeType);
  }, [input.value]);

  return (
    <Popover>
      <PopoverTrigger>
        <Button fontSize={"2xl"} size={"sm"}>
          {`0${input.value}`.slice(-2)}
        </Button>
      </PopoverTrigger>
      <PopoverContent width={"100px"}>
        <PopoverArrow />
        <PopoverBody>
          <VStack>
            <Button {...inc} w={"100%"}>
              +
            </Button>
            <Input {...input} textAlign={"center"} />
            <Button {...dec} w={"100%"}>
              -
            </Button>
          </VStack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};
