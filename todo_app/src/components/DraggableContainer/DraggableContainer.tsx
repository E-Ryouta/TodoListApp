import { useSortable } from "@dnd-kit/sortable";
import { DraggableContext } from "./DraggableContext";
import { CSS } from "@dnd-kit/utilities";

type DraggableDataProps = {
  taskTitle: string;
  taskDescription: string;
};

type DraggableContainerProps = {
  id: string;
  children: React.ReactNode;
};

export function DraggableContainer({ ...props }: DraggableContainerProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });

  const style = {
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
