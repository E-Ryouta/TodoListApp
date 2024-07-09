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
import {
  MdOutlineDescription,
  MdDragIndicator,
  MdDeleteOutline,
} from "react-icons/md";
import { useContext, useRef, Dispatch, SetStateAction, useEffect } from "react";
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
  const draggableContext = useContext(DraggableContext);
  const inputRef = useRef<HTMLInputElement>(null);

  const updateTask = (
    field: "taskTitle" | "taskDescription",
    value: string
  ) => {
    props.setTaskContainerList?.((prev) => {
      return {
        ...prev,
        [props.containerId]: {
          progressHeader: prev[props.containerId].progressHeader,
          tasks: prev[props.containerId].tasks.map((task) => {
            if (task.id === props.id) {
              return {
                ...task,
                [field]: value,
              };
            }
            return task;
          }),
        },
      };
    });
  };

  const deleteTask = (taskId: string) => {
    props.setTaskContainerList?.((prev) => {
      return {
        ...prev,
        [props.containerId]: {
          progressHeader: prev[props.containerId].progressHeader,
          tasks: prev[props.containerId].tasks.filter(
            (task) => task.id !== taskId
          ),
        },
      };
    });
  };

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
            value={props.taskTitle}
            ml={4}
            ref={inputRef}
            onChange={(e) => updateTask("taskTitle", e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                inputRef.current?.blur();
              }
            }}
          />
          <IconButton
            variant={"ghost"}
            aria-label="add description"
            icon={<MdOutlineDescription />}
            onClick={setAddDescriptionFlag.toggle}
          />
          <IconButton
            variant={"ghost"}
            aria-label="delete"
            icon={<MdDeleteOutline />}
            onClick={() => deleteTask(props.id)}
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
              value={props.taskDescription}
              onChange={(e) => updateTask("taskDescription", e.target.value)}
            />
          </CardBody>
        </Box>
      )}
    </Card>
  );
}
