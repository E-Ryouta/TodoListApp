import { LoaderFunctionArgs } from "@remix-run/node";
import { getTasks } from "./_endpoints/getTasks";
import { redirect } from "@remix-run/react";

export const todoListLoader = async ({ request }: LoaderFunctionArgs) => {
  const date = new URL(request.url).searchParams.get("date");

  if (!date) {
    return redirect(`/todo?date=${new Date().toISOString().split("T")[0]}`);
  }

  const tasks = await getTasks(date);
  return tasks;
};
