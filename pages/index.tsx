import {
  Badge,
  Box,
  Button,
  ButtonGroup,
  Checkbox,
  Container,
  Divider,
  Flex,
  Heading,
  Spacer,
  Text,
} from "@chakra-ui/react";
import Head from "next/head";
import React, { ReactNode } from "react";
import { proxy, useSnapshot } from "valtio";
import { addComputed } from "valtio/utils";

const state = proxy({
  smBoxes: 0,
  mdBoxes: 0,
  lgBoxes: 0,
  cargoVolumeDirty: false,
}) as {
  smBoxes: number;
  mdBoxes: number;
  lgBoxes: number;
  cargoVolumeDirty: boolean;
  cargoVolume: number;
  totalBoxVolume: number;
};

addComputed(state, {
  totalBoxVolume: ({ smBoxes, mdBoxes, lgBoxes }) =>
    lgBoxes * 1 * 1 * 0.5 +
    mdBoxes * 0.5 * 0.5 * 0.5 +
    smBoxes * 0.5 * 0.5 * 0.2,
  cargoVolume: (snap) =>
    snap.cargoVolumeDirty ? snap.cargoVolume : snap.totalBoxVolume,
});

type ParamHeaderProps = {
  children: ReactNode;
};

type CountButtonsProps = {
  count: number;
  handleChange: (num: number) => void;
};

function CountButtons(props: CountButtonsProps) {
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

type CargoVehicleType = {
  volume: number;
};

function CargoVehicle(props: CargoVehicleType) {
  const { volume } = props;
  if (volume <= 2) {
    return <Text>Машина</Text>;
  }
  if (volume > 2 && volume < 5) {
    return <Text>Минивен</Text>;
  }
  return <Text>Газель</Text>;
}

export default function Home() {
  const snap = useSnapshot(state);

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
              {snap.totalBoxVolume > 0 && (
                <Badge ml="1" colorScheme="green">
                  {snap.totalBoxVolume.toFixed(2)} m<sup>3</sup>
                </Badge>
              )}
            </Heading>
          </ParamHeader>
          <Flex justify="space-between" p="1.5">
            <Text position="relative">
              50 x 50 x 20
              <BoxBadge count={snap.smBoxes} />
            </Text>
            <CountButtons
              count={snap.smBoxes}
              handleChange={(num: number) => (state.smBoxes += num)}
            />
          </Flex>
          <Divider />
          <Flex justify="space-between" p="1.5">
            <Text position="relative">
              50 x 50 x 50
              <BoxBadge count={snap.mdBoxes} />
            </Text>
            <CountButtons
              count={snap.mdBoxes}
              handleChange={(num: number) => (state.mdBoxes += num)}
            />
          </Flex>
          <Divider />
          <Flex justify="space-between" p="1.5">
            <Text position="relative">
              100 x 100 x 50
              <BoxBadge count={snap.lgBoxes} />
            </Text>
            <CountButtons
              count={snap.lgBoxes}
              handleChange={(num: number) => (state.lgBoxes += num)}
            />
          </Flex>
          <Divider />
        </Box>
        <Box>
          <ParamHeader>
            <Heading p="1" background="gray.100" size="sm">
              Объем груза
              {snap.cargoVolume > 0 && (
                <Badge ml="1" colorScheme="green">
                  {snap.cargoVolume.toFixed(2)} m<sup>3</sup>
                </Badge>
              )}
            </Heading>
          </ParamHeader>
          <Flex justify="space-between" p="1.5">
            <CargoVehicle volume={snap.cargoVolume} />
            <CountButtons
              count={snap.cargoVolume}
              handleChange={(num: number) => {
                state.cargoVolume += num;
                state.cargoVolumeDirty = true;
              }}
            />
          </Flex>
        </Box>
        <Box>
          <ParamHeader>
            <Heading p="1" background="gray.100" size="sm">
              Дополнительная помощь
            </Heading>
          </ParamHeader>
          <Flex justify="space-between" p="1.5">
            <Text as="label" htmlFor="loaders" flex="1">
              Грузчики
            </Text>
            <Checkbox id="loaders" name="loaders" />
          </Flex>
          <Divider />
          <Flex justify="space-between" p="1.5">
            <Text as="label" htmlFor="furniturers" flex="1">
              Разбор / сбор мебели
            </Text>
            <Checkbox id="furniturers" name="furniturers" />
          </Flex>
          <Divider />
          <Flex justify="space-between" p="1.5">
            <Text as="label" htmlFor="furniturers" flex="1">
              Уборка / вывоз мусора
            </Text>
            <Checkbox id="furniturers" name="furniturers" />
          </Flex>
        </Box>
      </Container>
    </div>
  );
}
