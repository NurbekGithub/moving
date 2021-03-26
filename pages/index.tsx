import {
  Badge,
  Box,
  Button,
  ButtonGroup,
  Container,
  Divider,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react";
import Head from "next/head";
import React, { ReactNode, useMemo } from "react";
import { proxy, useSnapshot } from "valtio";

const state = proxy({
  smBoxes: 0,
  mdBoxes: 0,
  lgBoxes: 0,
});

type ParamHeaderProps = {
  children: ReactNode;
};

type BoxCountButtonsProps = {
  count: number;
  handleChange: (num: number) => void;
};

function BoxCountButtons(props: BoxCountButtonsProps) {
  const { handleChange, count } = props;
  return (
    <ButtonGroup size="sm" isAttached variant="outline">
      <Button onClick={() => handleChange(-5)} disabled={count < 5}>
        -5
      </Button>
      <Button onClick={() => handleChange(-1)} disabled={count === 0}>
        -1
      </Button>
      <Button onClick={() => handleChange(+1)}>+1</Button>
      <Button onClick={() => handleChange(+5)}>+5</Button>
    </ButtonGroup>
  );
}

type BoxBadgeProps = {
  count: number;
};

function BoxBadge(props: BoxBadgeProps) {
  const { count } = props;

  return count > 0 ? (
    <Badge
      color="green"
      position="absolute"
      fontSize="xx-small"
      top="-4px"
      left="100%"
    >
      {count}
    </Badge>
  ) : null;
}

function ParamHeader(props: ParamHeaderProps) {
  const { children } = props;

  return (
    <Box position="sticky" top="0">
      {children}
    </Box>
  );
}

export default function Home() {
  const snap = useSnapshot(state);

  const totalBoxVolume = useMemo(() => {
    return (
      snap.lgBoxes * 1 * 1 * 0.5 +
      snap.mdBoxes * 0.5 * 0.5 * 0.5 +
      snap.smBoxes * 0.5 * 0.5 * 0.2
    ).toFixed(2);
  }, [snap.lgBoxes, snap.mdBoxes, snap.smBoxes]);
  return (
    <div>
      <Head>
        <title>Moving App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box as="header" background="teal.400">
        <Container>
          <Heading fontSize="2xl">Moving App</Heading>
        </Container>
      </Box>
      <Container maxW="4xl" p="0">
        <Box>
          <ParamHeader>
            <Heading p="1" background="gray.100" size="sm">
              Коробки
              {+totalBoxVolume > 0 && (
                <Badge colorScheme="green">
                  {totalBoxVolume} m<sup>3</sup>
                </Badge>
              )}
              <sup></sup>
            </Heading>
          </ParamHeader>
          <Flex justify="space-between" p="1.5">
            <Text position="relative">
              50 x 50 x 20
              <BoxBadge count={snap.smBoxes} />
            </Text>
            <BoxCountButtons
              count={state.smBoxes}
              handleChange={(num: number) => (state.smBoxes += num)}
            />
          </Flex>
          <Divider />
          <Flex justify="space-between" p="1.5">
            <Text position="relative">
              50 x 50 x 50
              <BoxBadge count={snap.mdBoxes} />
            </Text>
            <BoxCountButtons
              count={state.mdBoxes}
              handleChange={(num: number) => (state.mdBoxes += num)}
            />
          </Flex>
          <Divider />
          <Flex justify="space-between" p="1.5">
            <Text position="relative">
              100 x 100 x 50
              <BoxBadge count={snap.lgBoxes} />
            </Text>
            <BoxCountButtons
              count={state.lgBoxes}
              handleChange={(num: number) => (state.lgBoxes += num)}
            />
          </Flex>
          <Divider />
        </Box>
        <Box>
          <ParamHeader>
            <Heading p="1" background="gray.100" size="sm">
              Помощь с погрузкой
            </Heading>
          </ParamHeader>
        </Box>
        <Box>
          <ParamHeader>
            <Heading p="1" background="gray.100" size="sm">
              Помощь с подготовкой
            </Heading>
          </ParamHeader>
        </Box>
      </Container>
    </div>
  );
}
