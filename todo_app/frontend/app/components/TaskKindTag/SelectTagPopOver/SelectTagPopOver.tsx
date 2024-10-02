import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  Tag,
  TagLabel,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import type { UUID } from "crypto";

export type SelectTagProps = {
  tagId: UUID;
  tagLabel: string;
  tagColor: string;
};

type SelectTagPopOverProps = {
  children: React.ReactNode;
  tagList: SelectTagProps[];
  handleSelectTag: (tag_id: UUID) => void;
};

export function SelectTagPopOver({
  children,
  tagList,
  handleSelectTag,
}: SelectTagPopOverProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleClick = (tag_id: UUID) => {
    handleSelectTag(tag_id);
    onClose();
  };

  return (
    <Popover isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverHeader>タグを選択</PopoverHeader>
        <PopoverBody>
          {tagList.map((tag) => (
            <Button
              size={"sm"}
              borderRadius={"12"}
              p={0}
              mx={"0.2rem"}
              mb={"0.2rem"}
              onClick={() => handleClick(tag.tagId)}
            >
              <Tag variant={"subtle"} bg={tag.tagColor} h={"100%"}>
                <TagLabel>{tag.tagLabel}</TagLabel>
              </Tag>
            </Button>
          ))}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
