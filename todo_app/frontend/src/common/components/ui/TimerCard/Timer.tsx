import { HStack, VStack, Text, IconButton, Box } from "@chakra-ui/react";
import { MdOutlineNotStarted, MdOutlineStopCircle } from "react-icons/md";
import { useBoolean } from "@chakra-ui/react";
import { useState, useEffect } from "react";

type TimerProps = {
  startClickApproveFlg: boolean;
};

export function Timer({ startClickApproveFlg }: TimerProps) {
  const [isStart, setIsStart] = useBoolean();
  const [time, setTime] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isStart) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isStart]);

  const handleIconClick = () => {
    setIsStart.toggle();
  };

  const formatTime = (time: number) => {
    const getSeconds = `0${time % 60}`.slice(-2);
    const minutes: any = `${Math.floor(time / 60)}`;
    const getMinutes = `0${minutes % 60}`.slice(-2);
    const getHours = `0${Math.floor(time / 3600)}`.slice(-2);
    return `${getHours}:${getMinutes}:${getSeconds}`;
  };

  return (
    <Box>
      <HStack w={"100%"} justifyContent={"center"}>
        <VStack gap={0}>
          <Text fontSize={"2xl"}>{formatTime(time).split(":")[0]}</Text>
          <Text>Hours</Text>
        </VStack>
        <Text fontSize={"3xl"}>:</Text>
        <VStack gap={0}>
          <Text fontSize={"2xl"}>{formatTime(time).split(":")[1]}</Text>
          <Text>Minutes</Text>
        </VStack>
        <Text fontSize={"3xl"}>:</Text>
        <VStack gap={0}>
          <Text fontSize={"2xl"}>{formatTime(time).split(":")[2]}</Text>
          <Text>Seconds</Text>
        </VStack>
        <IconButton
          ml={"1rem"}
          aria-label="StartAndStopButton"
          variant={"ghost"}
          onClick={handleIconClick}
          isDisabled={startClickApproveFlg}
          icon={
            isStart ? (
              <MdOutlineStopCircle size={"lg"} />
            ) : (
              <MdOutlineNotStarted size={"lg"} />
            )
          }
        />
      </HStack>
    </Box>
  );
}
