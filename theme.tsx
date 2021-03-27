import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  styles: {
    global: {
      "html, body": {
        height: "100%",
      },
      "#__next": {
        minH: "100%",
        display: "flex",
        flexDir: "column",
      },
    },
  },
  components: {
    Container: {
      baseStyle: {
        maxW: "4xl",
        p: "0",
      },
    },
  },
});
