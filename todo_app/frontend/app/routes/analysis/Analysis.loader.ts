import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import { getWeekEndDates, getWeekStartDates } from "./Analysis.lib";
import { getTasksWithTag } from "@/endpoints";

export const analysisLoader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const startDate = url.searchParams.get("startDate");
  const endDate = url.searchParams.get("endDate");

  if (!startDate || !endDate) {
    const defaultStartDate = getWeekStartDates();
    const defaultEndDate = getWeekEndDates();

    return redirect(
      `/analysis?startDate=${defaultStartDate}&endDate=${defaultEndDate}`
    );
  }

  const tasksWithTag = await getTasksWithTag(startDate, endDate);

  return tasksWithTag;
};
