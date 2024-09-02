import { useOutletContext } from "@remix-run/react";
import { TodoList } from "./TodoList";

export default function App() {
  const date: string = useOutletContext();
  return <TodoList date={date} />;
}
