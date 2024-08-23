import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  Button,
  Box,
} from "@chakra-ui/react";
import { useState } from "react";
import { TimePicker } from "../TimePicker";

export type TimerSettingModalProps = {
  handleClose: (value: {
    ok: boolean;
    data: { taskTitle: string; timer: number };
  }) => void;
};

export function TimerSettingModal({ handleClose }: TimerSettingModalProps) {
  const [taskTitle, setTaskTitle] = useState<string>();
  const [taskTime, setTaskTime] = useState<number>();

  const handleTimerChange = (time: number) => {
    setTaskTime(time);
  };

  return (
    <Modal
      isOpen={true}
      onClose={() =>
        handleClose({ ok: false, data: { taskTitle: "", timer: 0 } })
      }
      border-radius={"10"}
      size={"lg"}
      isCentered
    >
      <ModalOverlay />
      <ModalContent bgColor={"#FBF9F1"}>
        <ModalHeader>タスクの内容とかかった時間を入力してください</ModalHeader>
        <ModalCloseButton
          onClick={() =>
            handleClose({
              ok: false,
              data: { taskTitle: "", timer: 0 },
            })
          }
        />
        <ModalBody>
          <Input
            size={"lg"}
            placeholder="タスクの内容"
            bgColor={"white"}
            mb={2}
            onChange={(e) => setTaskTitle(e.target.value)}
          />
          <Box w={"100%"} bgColor={"white"} p={"2"}>
            <TimePicker updateTimerSettings={handleTimerChange} />
          </Box>
        </ModalBody>
        <ModalFooter display="flex" justifyContent="center" width="100%">
          <Button
            colorScheme="blue"
            mr={3}
            onClick={() =>
              handleClose({
                ok: true,
                data: { taskTitle: taskTitle || "", timer: taskTime || 0 },
              })
            }
            bgColor={"#146C94"}
          >
            タスクを追加
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
