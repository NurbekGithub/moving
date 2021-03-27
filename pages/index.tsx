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
  VStack,
} from "@chakra-ui/react";
import Head from "next/head";
import React, { ChangeEvent, ChangeEventHandler, ReactNode } from "react";
import { proxy, useSnapshot } from "valtio";
import { FiArrowRight } from "react-icons/fi";
import { addComputed } from "valtio/utils";

const state = proxy({
  smBoxes: 0,
  mdBoxes: 0,
  lgBoxes: 0,
  loaders: false,
  cleaning: false,
  furniturers: false,
  cargoVolumeDirty: false,
}) as {
  smBoxes: number;
  mdBoxes: number;
  lgBoxes: number;
  cargoVolumeDirty: boolean;
  loaders: boolean;
  cleaning: boolean;
  furniturers: boolean;
  cargoVolume: number;
  totalBoxVolume: number;
  canProceed: boolean;
};

addComputed(state, {
  totalBoxVolume: ({ smBoxes, mdBoxes, lgBoxes }) =>
    lgBoxes * 1 * 1 * 0.5 +
    mdBoxes * 0.5 * 0.5 * 0.5 +
    smBoxes * 0.5 * 0.5 * 0.2,
  cargoVolume: (snap) =>
    snap.cargoVolumeDirty ? snap.cargoVolume : snap.totalBoxVolume,
  canProceed: (snap) =>
    Boolean(
      snap.totalBoxVolume ||
        snap.cargoVolume ||
        snap.cleaning ||
        snap.furniturers ||
        snap.loaders
    ),
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
    <ButtonGroup size="sm" isAttached variant="outline" mt="0!important">
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
      color="teal"
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

function handleCheckboxChange({
  target: { name, checked },
}: ChangeEvent<HTMLInputElement>) {
  state[name as "cleaning" | "loaders" | "furniturers"] = checked;
}

function Parametrs() {
  const snap = useSnapshot(state);
  return (
    <Container flex="1" position="relative">
      <Box>
        <ParamHeader>
          <Heading p="1" background="gray.100" size="sm">
            Коробки
            {snap.totalBoxVolume > 0 && (
              <Badge ml="1" colorScheme="teal">
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
          <VStack alignItems="flex-start">
            <Text fontSize="xs" color="gray.600">
              Количество, штук
            </Text>
            <CountButtons
              count={snap.smBoxes}
              handleChange={(num: number) => (state.smBoxes += num)}
            />
          </VStack>
        </Flex>
        <Divider />
        <Flex justify="space-between" p="1.5">
          <Text position="relative">
            50 x 50 x 50
            <BoxBadge count={snap.mdBoxes} />
          </Text>
          <VStack alignItems="flex-start">
            <Text fontSize="xs" color="gray.600">
              Количество, штук
            </Text>
            <CountButtons
              count={snap.mdBoxes}
              handleChange={(num: number) => (state.mdBoxes += num)}
            />
          </VStack>
        </Flex>
        <Divider />
        <Flex justify="space-between" p="1.5">
          <Text position="relative">
            100 x 100 x 50
            <BoxBadge count={snap.lgBoxes} />
          </Text>
          <VStack alignItems="flex-start">
            <Text fontSize="xs" color="gray.600">
              Количество, штук
            </Text>
            <CountButtons
              count={snap.lgBoxes}
              handleChange={(num: number) => (state.lgBoxes += num)}
            />
          </VStack>
        </Flex>
        <Divider />
      </Box>
      <Box>
        <ParamHeader>
          <Heading p="1" background="gray.100" size="sm">
            Объем груза
            {snap.cargoVolume > 0 && (
              <Badge ml="1" colorScheme="teal">
                {snap.cargoVolume.toFixed(2)} m<sup>3</sup>
              </Badge>
            )}
          </Heading>
        </ParamHeader>
        <Flex justify="space-between" p="1.5">
          <CargoVehicle volume={snap.cargoVolume} />
          <VStack alignItems="flex-start">
            <Text fontSize="xs" color="gray.600">
              Количество, м<sup>3</sup>
            </Text>
            <CountButtons
              count={snap.cargoVolume}
              handleChange={(num: number) => {
                state.cargoVolume += num;
                state.cargoVolumeDirty = true;
              }}
            />
          </VStack>
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
          <Checkbox
            id="loaders"
            colorScheme="teal"
            name="loaders"
            isChecked={snap.loaders}
            onChange={handleCheckboxChange}
          />
        </Flex>
        <Divider />
        <Flex justify="space-between" p="1.5">
          <Text as="label" htmlFor="furniturers" flex="1">
            Разбор / сбор мебели
          </Text>
          <Checkbox
            id="furniturers"
            colorScheme="teal"
            name="furniturers"
            isChecked={snap.furniturers}
            onChange={handleCheckboxChange}
          />
        </Flex>
        <Divider />
        <Flex justify="space-between" p="1.5">
          <Text as="label" htmlFor="cleaning" flex="1">
            Уборка / вывоз мусора
          </Text>
          <Checkbox
            id="cleaning"
            colorScheme="teal"
            name="cleaning"
            isChecked={snap.cleaning}
            onChange={handleCheckboxChange}
          />
        </Flex>
      </Box>
      {snap.canProceed && (
        <Button
          rightIcon={<FiArrowRight />}
          colorScheme="teal"
          borderRadius="none"
          isFullWidth
          position="absolute"
          bottom="0"
        >
          Далее
        </Button>
      )}
    </Container>
  );
}

export default function Home() {
  return (
    <>
      <Head>
        <title>Moving App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box as="header" background="teal.400">
        <Container>
          <Heading fontSize="2xl">Moving App</Heading>
        </Container>
      </Box>
      <Parametrs />
    </>
  );
}
