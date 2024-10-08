import { Card, Divider, Button, Text } from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa6";
import type { ModalParams } from "../../todoList/TaskColumn/TaskColumn";
import { TimerSettingModal } from "../TimerSettingModal";

type TaskProgressCardProps = {
  id: string;
  progressHeader: string;
  modalOpen: ModalParams | null;
  handleAddTask: (containerId: string) => void;
  children?: React.ReactNode;
};

export function TaskProgressCard({ ...props }: TaskProgressCardProps) {
  return (
    <>
      {props.modalOpen && (
        <TimerSettingModal handleClose={props.modalOpen.onClose} />
      )}
      <Card borderRadius={30} bg={"tertiary"}>
        <Text textAlign={"center"} fontWeight={"bold"} fontSize={"xl"}>
          {props.progressHeader}
        </Text>
        <Divider />
        {props.children}
        <Button
          variant={"ghost"}
          gap={"2px"}
          borderBottomRadius={30}
          onClick={() => props.handleAddTask(props.id)}
        >
          <FaPlus />
          <Text>タスクを追加</Text>
        </Button>
      </Card>
    </>
  );
}
