import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  colors: {
    primary: "#AFD3E2",
    secondary: "#146C94",
    tertiary: "#FBF9F1",
  },
  styles: {
    global: {
      body: {
        bg: "transparent",
        _before: {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          bgSize: "cover",
          opacity: 0.7,
          zIndex: -1,
        },
      },
    },
  },
});
