import { HStack, VStack, Text, IconButton, Box } from "@chakra-ui/react";
import { MdOutlineNotStarted, MdOutlineStopCircle } from "react-icons/md";
import { IoReloadCircle } from "react-icons/io5";
import { useState, useEffect } from "react";
import "./timerAnimation.css";

type TimerProps = {
  isStart: boolean;
  defaultTime: number;
  startClickApproveFlg: boolean;
  animateTimerIcon: boolean;
  updateTimerSettings: (time: number) => void;
  resetTimerSettings: () => void;
};

export function Timer({
  isStart,
  defaultTime,
  startClickApproveFlg,
  animateTimerIcon,
  updateTimerSettings,
  resetTimerSettings,
}: TimerProps) {
  const [time, setTime] = useState(defaultTime);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isStart) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isStart]);

  const formatTime = (time: number) => {
    const getSeconds = `0${time % 60}`.slice(-2);
    const minutes: any = `${Math.floor(time / 60)}`;
    const getMinutes = `0${minutes % 60}`.slice(-2);
    const getHours = `0${Math.floor(time / 3600)}`.slice(-2);
    return `${getHours}:${getMinutes}:${getSeconds}`;
  };

  const handleResetClick = () => {
    setTime(0);
    resetTimerSettings();
  };

  return (
    <Box>
      <HStack w={"100%"} justifyContent={"center"} px={"2rem"}>
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
          onClick={() => updateTimerSettings(time)}
          isDisabled={startClickApproveFlg}
          className={animateTimerIcon ? "anim-box poyopoyo" : ""}
          icon={
            isStart ? (
              <MdOutlineStopCircle size={"2.5rem"} />
            ) : (
              <MdOutlineNotStarted size={"2.5rem"} />
            )
          }
        />
        <IconButton
          aria-label="ResetButton"
          variant={"ghost"}
          onClick={handleResetClick}
          isDisabled={startClickApproveFlg}
          icon={<IoReloadCircle size={"2.5rem"} fontStyle={"bold"} />}
        />
      </HStack>
    </Box>
  );
}
