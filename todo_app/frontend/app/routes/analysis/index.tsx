import { useOutletContext } from "@remix-run/react";

export default function App() {
  const date: string = useOutletContext();
  return <div>TodoList</div>;
}
