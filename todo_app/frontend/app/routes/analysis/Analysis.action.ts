import type { ActionFunctionArgs } from "@remix-run/node";
import { deleteTask } from "./_endpoints";

export const analysisAction = async ({ request }: ActionFunctionArgs) => {
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
    default:
      return null;
  }
};
