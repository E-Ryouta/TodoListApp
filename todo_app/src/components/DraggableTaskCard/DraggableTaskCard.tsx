import { TaskCard } from "./TaskCard";
import { DraggableContainer } from "../DraggableContainer";
import { Box } from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";
import { TaskContainerListContextType } from "../TaskProvider/TaskContext";
import { UUID } from "crypto";

export type DraggableTaskCardProps = {
  id: UUID;
  taskTitle: string;
  taskDescription: string;
  containerId: string;
  setTaskContainerList?: Dispatch<SetStateAction<TaskContainerListContextType>>;
  sx?: any;
};

export function DraggableTaskCard({ ...props }: DraggableTaskCardProps) {
  return (
    <DraggableContainer id={props.id}>
      <Box sx={props.sx}>
        <TaskCard
          id={props.id}
          taskTitle={props.taskTitle}
          taskDescription={props.taskDescription}
          containerId={props.containerId}
          setTaskContainerList={props.setTaskContainerList}
        />
      </Box>
    </DraggableContainer>
  );
}
