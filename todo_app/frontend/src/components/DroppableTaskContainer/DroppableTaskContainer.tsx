import { TaskProgressCard } from "./TaskProgressCard/TaskProgressCard";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { DraggableTaskCardProps } from "../DraggableTaskCard";
import { Dispatch, SetStateAction } from "react";
import { TaskContainerListContextType } from "../TaskProvider/TaskContext";
import { useDroppable } from "@dnd-kit/core";
import { Box } from "@chakra-ui/react";
import { UUID } from "crypto";

export type DroppableTaskContainerProps = {
  id: UUID;
  progressHeader: string;
  tasks: DraggableTaskCardProps[];
  setTaskContainerList: Dispatch<SetStateAction<TaskContainerListContextType>>;
};

export function DroppableTaskContainer({
  ...props
}: DroppableTaskContainerProps) {
  const { setNodeRef } = useDroppable({
    id: props.id,
  });

  return (
    <SortableContext
      id={props.id}
      items={props.tasks}
      strategy={verticalListSortingStrategy}
    >
      <Box ref={setNodeRef} h={"100%"}>
        <TaskProgressCard
          id={props.id}
          progressHeader={props.progressHeader}
          tasks={props.tasks}
          setTaskContainerList={props.setTaskContainerList}
          containerId={props.id}
        />
      </Box>
    </SortableContext>
  );
}
