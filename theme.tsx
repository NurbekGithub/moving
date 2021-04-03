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
        // background:
        //   "url(/images/globe.svg) center -50px / cover no-repeat, radial-gradient(37.86% 77.79% at 50% 100%, rgba(113, 128, 150, 0.25) 0%, rgba(113, 128, 150, 0) 100%), linear-gradient(rgb(26, 32, 44) 0%, rgb(45, 55, 72) 100%), linear-gradient(rgb(13, 15, 20) 0%, rgba(27, 32, 43, 0) 100%), rgb(47, 55, 71);",
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
