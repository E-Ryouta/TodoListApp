import { useOutletContext } from "@remix-run/react";
import { Analysis } from "./Analysis";

export default function App() {
  const date: string = useOutletContext();
  return <Analysis />;
}
