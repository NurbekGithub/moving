import { Flex, Button } from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion";
import React from "react";
import { MotionBox } from "./MotionBox";

const pageState = { page: "" };
const snap = pageState;
function Exp() {
  return (
    <AnimatePresence exitBeforeEnter initial={false}>
      <Flex flex="1" key={snap.page}>
        {snap.page === "parametrs" && (
          <MotionBox
            d="flex"
            flex="1"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
          >
            {/* <Parametrs /> */}
          </MotionBox>
        )}
        {snap.page === "map" && (
          <MotionBox
            d="flex"
            flex="1"
            initial={{ x: "100%" }}
            animate={{ x: "0" }}
            exit={{ x: "100%" }}
            // transition={{ duration: 0.3 }}
          >
            Hello There
            <Button onClick={() => (pageState.page = "parametrs")}>Back</Button>
          </MotionBox>
        )}
      </Flex>
    </AnimatePresence>
  );
}
