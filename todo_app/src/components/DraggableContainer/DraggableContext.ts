import { createContext } from "react";

type DraggableContextType = {
  attributes: any;
  listeners: any;
  transform: any;
};

export const DraggableContext = createContext<DraggableContextType | undefined>(
  undefined
);
