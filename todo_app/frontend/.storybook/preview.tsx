import type { Preview } from "@storybook/react";
import { ChakraProvider } from "@chakra-ui/react";
import { DndContext } from "@dnd-kit/core";
import React from "react";
import { theme } from "../app/theme";

const preview: Preview = {
  decorators: [
    (Story) => {
      return (
        <ChakraProvider theme={theme}>
          <DndContext>
            <Story />
          </DndContext>
        </ChakraProvider>
      );
    },
  ],
};

export default preview;
