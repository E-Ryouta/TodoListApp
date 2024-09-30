import { ActionFunctionArgs } from "@remix-run/node";
import { putTasks, deleteTasks } from "./_endpoints";

export const todoListAction = async ({ request }: ActionFunctionArgs) => {
  const data = await request.json();

  switch (request.method) {
    case "DELETE":
      const { taskId } = data;
      const deleteRes = await deleteTasks(taskId);

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
      const putRes = await putTasks({
        taskId: data.taskId,
        tagId: data.tagId,
        taskContainerId: data.taskContainerId,
        taskTitle: data.taskTitle,
        taskDescription: data.taskDescription,
        taskTimer: data.taskTimer,
        createdAt: data.createdAt,
      });

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
