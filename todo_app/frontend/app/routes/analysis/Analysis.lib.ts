import type {
  DoingTodoTask,
  TaskSumWithDate,
} from "./_endpoints/getAnalysisTasks";

/**
 * 現在日付が含まれる週の最初の日付を取得
 * @returns 週の最初の日付
 */
export function getWeekStartDates() {
  const today = new Date();
  const dayOfWeek = today.getDay();

  const monday = new Date(today);
  monday.setDate(today.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 2));

  return monday.toISOString().split("T")[0];
}

/**
 * 現在日付が含まれる週の最後の日付を取得
 * @returns 週の最後の日付
 */
export function getWeekEndDates() {
  const today = new Date();
  const dayOfWeek = today.getDay();

  const monday = new Date(today);
  monday.setDate(today.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 2));

  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);

  return sunday.toISOString().split("T")[0];
}

/**
 * 日付ごとのタスク数を取得
 * @param taskSumWithDate
 * @returns
 */
export function generateLineChartData(
  taskSumWithDate: TaskSumWithDate[],
  startDate: string,
  endDate: string
) {
  const dateRange = [];
  let currentDate = new Date(startDate);
  while (currentDate <= new Date(endDate)) {
    dateRange.push(currentDate.toISOString().slice(0, 10));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  const taskDataMap = new Map();
  taskSumWithDate.forEach((task) => {
    taskDataMap.set(task.date, task.totalTasks);
  });

  console.log(dateRange);
  const lineChartData = dateRange.map((date) => {
    return {
      日付: date,
      タスク数: taskDataMap.get(date) || 0,
    };
  });

  return lineChartData;
}
