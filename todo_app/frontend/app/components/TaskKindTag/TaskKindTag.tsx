import { Tag, TagLabel, TagRightIcon, Button, Tooltip } from "@chakra-ui/react";
import { MdChangeCircle } from "react-icons/md";
import { SelectTagPopOver } from "./SelectTagPopOver";
import { SelectTagProps } from "./SelectTagPopOver";
import { useState } from "react";

export function TaskKindTag({
  tagLabel,
  color,
  tagList,
}: SelectTagProps & { tagList: SelectTagProps[] }) {
  const [selectedTag, setSelectedTag] = useState<SelectTagProps>({
    tagLabel: tagLabel,
    color: color,
  });

  const handleSelectTag = (tag: SelectTagProps) => {
    setSelectedTag(tag);
  };

  return (
    <Tooltip label={"タグを変更する"} aria-label={"タグを変更する"}>
      <SelectTagPopOver tagList={tagList} handleSelectTag={handleSelectTag}>
        <Button p={0} borderBottomRadius={0} size={"sm"}>
          <Tag
            size={"lg"}
            variant={"subtle"}
            colorScheme={selectedTag?.color}
            borderBottomRadius={0}
            height={"100%"}
          >
            <TagLabel w={"50px"}>{selectedTag?.tagLabel}</TagLabel>
            <TagRightIcon boxSize={"20px"}>
              <MdChangeCircle size={"lg"} />
            </TagRightIcon>
          </Tag>
        </Button>
      </SelectTagPopOver>
    </Tooltip>
  );
}
