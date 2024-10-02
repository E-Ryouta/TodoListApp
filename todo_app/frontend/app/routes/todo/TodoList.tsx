import { Box, HStack } from "@chakra-ui/react";
import type { TaskCardProps } from "@/components/TaskCard";
import { DndContext, DragOverlay, closestCenter } from "@dnd-kit/core";
import { TaskColumn } from "@/components/TaskColumn/TaskColumn";
import type { TodoListLoaderData } from "./_endpoints/getTasks";
import { useTodoList } from "./TodoList.hook";
import type { SelectTagProps } from "@/components/TaskKindTag/SelectTagPopOver";
import { TaskCardOverlay } from "@/components/TaskCardOverlay";

type TodoListProps = {
  date: string;
  tasks: TodoListLoaderData;
  tagList: SelectTagProps[];
};

export function TodoList({ date, tasks, tagList }: TodoListProps) {
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
              tagList={tagList}
              containerId={taskContainerId}
              onAddTodoStateNewTask={onAddTodoStateNewTask}
              onDeleteStateNewTask={onDeleteTodoStateNewTask}
              onUpdateTodoStateNewTask={onUpdateTodoStateNewTask}
            />
          </Box>
        ))}
      </HStack>
      <DragOverlay>
        <Box cursor={"grabbing"}>
          <TaskCardOverlay
            task={activeTask ? activeTask : ({} as TaskCardProps)}
            addTimerFlag={activeTask?.containerId !== "todo"}
            tagList={tagList}
            startClickApproveFlg={false}
          />
        </Box>
      </DragOverlay>
    </DndContext>
  );
}
