import { Button, Box, Container, Flex, Heading } from "@chakra-ui/react";
import { signIn, signOut, useSession } from "next-auth/client";
import React from "react";
import { FiChevronLeft } from "react-icons/fi";
import { useSnapshot } from "valtio";
import { store } from "../store";
import { changePage } from "../store/actions/pageStateActions";

export function Header() {
  const snap = useSnapshot(store);
  const [session] = useSession();
  return (
    <Box as="header" background="teal.400">
      <Container d="flex" alignItems="center">
        {snap.pageState === "maps" && (
          <Box
            as={FiChevronLeft}
            w="30px"
            p="1"
            size="xl"
            onClick={() => changePage("parametrs")}
          />
        )}
        {snap.pageState === "results" && (
          <Box
            as={FiChevronLeft}
            w="30px"
            p="1"
            size="xl"
            onClick={() => changePage("maps")}
          />
        )}
        <Flex justify="space-between" alignItems="center" flex="1">
          <Heading fontSize="2xl">Moving App</Heading>
          {!session && (
            <Button
              variant="ghost"
              borderRadius="none"
              onClick={() => signIn("google")}
            >
              Login
            </Button>
          )}
          {session && (
            <Button
              variant="ghost"
              borderRadius="none"
              onClick={() => signOut()}
            >
              Logout
            </Button>
          )}
        </Flex>
      </Container>
    </Box>
  );
}
