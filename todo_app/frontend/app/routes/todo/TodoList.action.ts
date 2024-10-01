import type { ActionFunctionArgs } from "@remix-run/node";
import { putTask, putContainerOrder, deleteTask } from "./_endpoints";
import { TaskCardProps } from "@/components/TaskCard";

export const todoListAction = async ({ request }: ActionFunctionArgs) => {
  const data = await request.json();

  switch (request.method) {
    case "DELETE":
      const { taskId } = data;
      const deleteRes = await deleteTask(taskId);

      if (deleteRes) {
        return {
          status: 200,
          body: { message: "Task deleted successfully" },
        };
      } else {
        return {
          status: 400,
          body: { message: "Task deletion failed" },
        };
      }
    case "PUT":
      let putRes;
      if (data.putType === "task") {
        putRes = await putTask({
          taskId: data.taskId,
          tagId: data.tagId,
          taskContainerId:
            data.taskContainerId === "inProgress"
              ? "in_progress"
              : data.taskContainerId,
          taskTitle: data.taskTitle,
          taskDescription: data.taskDescription,
          taskTimer: data.taskTimer,
          taskSortOrder: data.taskSortOrder,
          createdAt: data.createdAt,
        });
      } else {
        const todo = (data.todo as TaskCardProps[]).map((task, index) => {
          return {
            taskId: task.id,
            taskContainerId: "todo",
            taskSortOrder: index.toString(),
          };
        });
        const inProgress = (data.inProgress as TaskCardProps[]).map(
          (task, index) => {
            return {
              taskId: task.id,
              taskContainerId: "in_progress",
              taskSortOrder: index.toString(),
            };
          }
        );
        const done = (data.done as TaskCardProps[]).map((task, index) => {
          return {
            taskId: task.id,
            taskContainerId: "done",
            taskSortOrder: index.toString(),
          };
        });
        putRes = await putContainerOrder([...todo, ...inProgress, ...done]);
      }

      if (putRes) {
        return {
          status: 200,
          body: { message: "Task updated successfully" },
        };
      } else {
        return {
          status: 400,
          body: { message: "Task update failed" },
        };
      }
    default:
      return null;
  }
};
