import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  components: {
    Container: {
      baseStyle: {
        maxW: "4xl",
        p: "0",
      },
    },
  },
});
