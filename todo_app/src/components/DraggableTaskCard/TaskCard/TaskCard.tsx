import {
  Card,
  CardHeader,
  CardBody,
  Divider,
  Input,
  Textarea,
  useBoolean,
  IconButton,
  Flex,
  Box,
} from "@chakra-ui/react";
import { MdOutlineDescription, MdDragIndicator } from "react-icons/md";
import { useState, useContext, Dispatch, SetStateAction } from "react";
import { DraggableContext } from "../../DraggableContainer/DraggableContext";
import { TaskContainerListContextType } from "../../TaskProvider/TaskContext";

type TaskCardProps = {
  id: string;
  taskTitle: string;
  taskDescription: string;
  containerId: string;
  setTaskContainerList?: Dispatch<SetStateAction<TaskContainerListContextType>>;
};

export function TaskCard({ ...props }: TaskCardProps) {
  const [addDescriptionFlag, setAddDescriptionFlag] = useBoolean(false);
  const [task, setTaskTitle] = useState(props.taskTitle);
  const [taskDescription, setTaskDescription] = useState(props.taskDescription);
  const draggableContext = useContext(DraggableContext);

  return (
    <Card variant={"elevated"} size={"sm"}>
      <CardHeader>
        <Flex>
          <IconButton
            variant={"ghost"}
            aria-label="drag"
            icon={<MdDragIndicator />}
            {...draggableContext?.attributes}
            {...draggableContext?.listeners}
          />
          <Input
            variant={"unstyled"}
            value={task}
            ml={4}
            onChange={(e) => {
              setTaskTitle(e.target.value);
              props.setTaskContainerList?.((prev) => {
                return {
                  ...prev,
                  [props.containerId]: {
                    progressHeader: prev[props.containerId].progressHeader,
                    tasks: prev[props.containerId].tasks.map((task) => {
                      if (task.id === props.id) {
                        return {
                          ...task,
                          taskTitle: e.target.value,
                        };
                      }
                      return task;
                    }),
                  },
                };
              });
            }}
          />
          <IconButton
            variant={"ghost"}
            aria-label="add description"
            icon={<MdOutlineDescription />}
            onClick={setAddDescriptionFlag.toggle}
          />
        </Flex>
      </CardHeader>
      {addDescriptionFlag && (
        <Box>
          <Divider />
          <CardBody ml={4}>
            <Textarea
              variant={"unstyled"}
              placeholder={"Task Description"}
              value={taskDescription}
              onChange={(e) => {
                setTaskDescription(e.target.value);
              }}
            />
          </CardBody>
        </Box>
      )}
    </Card>
  );
}
