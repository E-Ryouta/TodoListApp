import { createContext, useCallback } from "react";
import { useBoolean } from "@chakra-ui/react";

export type TimerContextType = {
  isStart: boolean;
  toggleIsStart: () => void;
  offIsStart: () => void;
};

export const TimerContext = createContext<TimerContextType>({
  isStart: false,
  toggleIsStart: () => {},
  offIsStart: () => {},
});

export const useTimer = () => {
  const [isStart, setIsStart] = useBoolean(false);

  const toggleIsStart = useCallback(() => {
    setIsStart.toggle();
  }, []);

  const offIsStart = useCallback(() => {
    setIsStart.off();
  }, []);

  return {
    isStart,
    toggleIsStart,
    offIsStart,
  };
};
