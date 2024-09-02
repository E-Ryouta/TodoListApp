import { TimerContext, useTimer } from "./Timer.hook";

export function TimerProvider({ children }: { children: JSX.Element }) {
  const TimerItems = useTimer();
  return (
    <TimerContext.Provider value={TimerItems}>{children}</TimerContext.Provider>
  );
}
