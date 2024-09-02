import { SortableContext } from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import { Box } from "@chakra-ui/react";
import type { TaskCardProps } from "../TaskCard/TaskCard";
import { verticalListSortingStrategy } from "@dnd-kit/sortable/dist";

export type DroppableContainerProps = {
  id: string;
  items: TaskCardProps[];
  children?: React.ReactNode;
};

export function DroppableContainer({
  id,
  items,
  children,
}: DroppableContainerProps) {
  const { setNodeRef } = useDroppable({
    id: id,
  });

  return (
    <SortableContext
      id={id}
      items={items}
      strategy={verticalListSortingStrategy}
    >
      <Box ref={setNodeRef}>{children}</Box>
    </SortableContext>
  );
}
