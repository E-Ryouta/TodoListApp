import { TaskProgressCard } from "./TaskProgressCard/TaskProgressCard";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { DraggableTaskCardProps } from "../DraggableTaskCard";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { TaskContainerListContextType } from "../TaskProvider/TaskContext";

export type DroppableTaskContainerProps = {
  id: string;
  progressHeader: string;
  tasks: DraggableTaskCardProps[];
  setTaskContainerList: Dispatch<SetStateAction<TaskContainerListContextType>>;
};

export function DroppableTaskContainer({
  ...props
}: DroppableTaskContainerProps) {
  return (
    <SortableContext
      id={props.id}
      items={props.tasks}
      strategy={verticalListSortingStrategy}
    >
      <TaskProgressCard
        id={props.id}
        progressHeader={props.progressHeader}
        tasks={props.tasks}
        setTaskContainerList={props.setTaskContainerList}
        containerId={props.id}
      />
    </SortableContext>
  );
}
