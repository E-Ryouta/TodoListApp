import { useSortable } from "@dnd-kit/sortable";
import { DraggableContext } from "./DraggableContext";
import { CSS } from "@dnd-kit/utilities";
import { UUID } from "crypto";

type DraggableContainerProps = {
  id: UUID;
  children: React.ReactNode;
};

export function DraggableContainer({ ...props }: DraggableContainerProps) {
  const { active, attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });

  const style = {
    opacity: props.id === active?.id ? 0.5 : 1,
    transform: CSS.Translate.toString(transform),
    transition,
  };

  return (
    <DraggableContext.Provider value={{ attributes, listeners, transform }}>
      <div ref={setNodeRef} style={style}>
        {props.children}
      </div>
    </DraggableContext.Provider>
  );
}
