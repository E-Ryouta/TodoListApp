import { Box, HStack } from "@chakra-ui/react";
import { TaskCard } from "@/components/TaskCard";
import type { TaskCardProps } from "@/components/TaskCard";
import { DndContext, DragOverlay, closestCenter } from "@dnd-kit/core";
import { UUID } from "crypto";
import { TaskColumn } from "@/components/TaskColumn/TaskColumn";
import { TodoListLoaderData } from "./_endpoints/getTasks";
import { useTodoList } from "./TodoList.hook";

type TodoListProps = {
  date: string;
  tasks: TodoListLoaderData;
};

export function TodoList({ date, tasks }: TodoListProps) {
  const {
    todoState,
    activeTask,
    onAddTodoStateNewTask,
    onDeleteTodoStateNewTask,
    onUpdateTodoStateNewTask,
    handleDragStart,
    handleDragEnd,
    handleDragOver,
  } = useTodoList({ date, tasks });

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
    >
      <HStack w={"100%"} alignItems={"start"}>
        {Object.entries(todoState).map(([taskContainerId, tasks]) => (
          <Box key={taskContainerId} minW={"500px"} maxW={"800px"} w={"100%"}>
            <TaskColumn
              tasks={tasks}
              key={taskContainerId}
              date={date}
              containerId={taskContainerId}
              onAddTodoStateNewTask={onAddTodoStateNewTask}
              onDeleteStateNewTask={onDeleteTodoStateNewTask}
              onUpdateTodoStateNewTask={onUpdateTodoStateNewTask}
            />
          </Box>
        ))}
      </HStack>
      <DragOverlay>
        <TaskCard
          id={activeTask ? activeTask.id : ("" as UUID)}
          task={activeTask ? activeTask : ({} as TaskCardProps)}
          addTimerFlag={false}
          startClickApproveFlg={false}
          handleDeleteTask={() => {}}
          handleUpdateTask={() => {}}
        />
      </DragOverlay>
    </DndContext>
  );
}
