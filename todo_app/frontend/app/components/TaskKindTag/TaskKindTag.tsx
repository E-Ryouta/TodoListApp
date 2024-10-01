import { Tag, TagLabel, TagRightIcon, Button, Tooltip } from "@chakra-ui/react";
import { MdChangeCircle } from "react-icons/md";
import { SelectTagPopOver } from "./SelectTagPopOver";
import { SelectTagProps } from "./SelectTagPopOver";
import { UUID } from "crypto";

type TaskKindTagProps = {
  tagId: UUID;
  tagList: SelectTagProps[];
  handleUpdateTag: (tag_id: UUID) => void;
};

export function TaskKindTag({
  tagId,
  tagList,
  handleUpdateTag,
}: TaskKindTagProps) {
  const handleSelectTag = (tag_id: UUID) => {
    handleUpdateTag(tag_id);
  };

  return (
    <Tooltip label={"タグを変更する"} aria-label={"タグを変更する"}>
      <SelectTagPopOver tagList={tagList} handleSelectTag={handleSelectTag}>
        <Button p={0} borderBottomRadius={0} size={"sm"}>
          <Tag
            size={"lg"}
            variant={"subtle"}
            colorScheme={
              tagList.find((tag) => tag.tagId === tagId)?.tagColor || "gray"
            }
            borderBottomRadius={0}
          >
            <TagLabel w={"50px"}>
              {tagList.find((tag) => tag.tagId === tagId)?.tagLabel || "None"}
            </TagLabel>
            <TagRightIcon boxSize={"20px"}>
              <MdChangeCircle size={"lg"} />
            </TagRightIcon>
          </Tag>
        </Button>
      </SelectTagPopOver>
    </Tooltip>
  );
}
