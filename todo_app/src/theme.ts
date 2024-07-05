import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
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
          bgImage: "url('kahu.png')",
          bgSize: "cover",
          opacity: 0.7,
          zIndex: -1,
        },
      },
    },
  },
});

export default theme;
