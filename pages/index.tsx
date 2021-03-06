import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Badge,
  Box,
  Button,
  ButtonGroup,
  Checkbox,
  Container,
  Divider,
  Flex,
  Heading,
  List,
  ListIcon,
  ListItem,
  Text,
  VStack,
} from "@chakra-ui/react";
import Head from "next/head";
import React, { ChangeEvent, ReactNode } from "react";
import { useSnapshot } from "valtio";
import { FiArrowRight, FiCheck } from "react-icons/fi";
import { BoxSVG } from "../components/Box";
import { AdditionalHelpTypes, store } from "../store";
import {
  changeBoxCheckbox,
  changeBoxCount,
  setCargoVolumeDirty,
} from "../store/actions/boxStateActions";
import { changePage } from "../store/actions/pageStateActions";
import { Maps } from "../components/Maps";
import { Header } from "../components/Header";
import { MainLayout } from "../components/MainLayout";

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
      <Button onClick={() => handleChange(count > 5 ? -5 : -count)}>-5</Button>
      <Button onClick={() => handleChange(count > 1 ? -1 : -count)}>-1</Button>
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
      fontSize="x-small"
      position="absolute"
      top="2px"
      right="20px"
    >
      {count}
    </Badge>
  ) : null;
}

function ParamHeader(props: ParamHeaderProps) {
  const { children } = props;

  return (
    <Box position="sticky" top="0" zIndex="1">
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
    return <Text>????????????</Text>;
  }
  if (volume > 2 && volume < 5) {
    return <Text>??????????????</Text>;
  }
  return <Text>????????????</Text>;
}

function handleCheckboxChange({
  target: { name, checked },
}: ChangeEvent<HTMLInputElement>) {
  changeBoxCheckbox(name as keyof AdditionalHelpTypes, checked);
}

function Parametrs() {
  const snap = useSnapshot(store);

  return (
    <Container flex="1" pb="40px">
      <Box>
        <ParamHeader>
          <Heading p="1" background="gray.100" size="sm">
            ??????????????
            {snap.boxState.totalBoxVolume > 0 && (
              <Badge ml="1" colorScheme="teal">
                {snap.boxState.totalBoxVolume.toFixed(2)} m<sup>3</sup>
              </Badge>
            )}
          </Heading>
        </ParamHeader>
        <Flex justify="space-between" p="1.5">
          <Box pos="relative" flex="1">
            <BoxSVG h={30} w={50} l={50} />
            <BoxBadge count={snap.boxState.smBoxes} />
          </Box>
          <VStack alignItems="flex-start">
            <Text fontSize="xs" color="gray.600">
              ????????????????????, ????????
            </Text>
            <CountButtons
              count={snap.boxState.smBoxes}
              handleChange={(num: number) => changeBoxCount("smBoxes", num)}
            />
          </VStack>
        </Flex>
        <Divider />
        <Flex justify="space-between" p="1.5" position="relative">
          <Box flex="1" pos="relative">
            <BoxSVG h={50} w={50} l={50} />
            <BoxBadge count={snap.boxState.mdBoxes} />
          </Box>
          <VStack alignItems="flex-start">
            <Text fontSize="xs" color="gray.600">
              ????????????????????, ????????
            </Text>
            <CountButtons
              count={snap.boxState.mdBoxes}
              handleChange={(num: number) => changeBoxCount("mdBoxes", num)}
            />
          </VStack>
        </Flex>
        <Divider />
        <Flex justify="space-between" p="1.5">
          <Box flex="1" pos="relative">
            <BoxSVG h={50} w={100} l={100} />
            <BoxBadge count={snap.boxState.lgBoxes} />
          </Box>
          <VStack alignItems="flex-start">
            <Text fontSize="xs" color="gray.600">
              ????????????????????, ????????
            </Text>
            <CountButtons
              count={snap.boxState.lgBoxes}
              handleChange={(num: number) => changeBoxCount("lgBoxes", num)}
            />
          </VStack>
        </Flex>
        <Divider />
      </Box>
      <Box>
        <ParamHeader>
          <Heading p="1" background="gray.100" size="sm">
            ?????????? ??????????
            {snap.boxState.cargoVolume > 0 && (
              <Badge ml="1" colorScheme="teal">
                {snap.boxState.cargoVolume.toFixed(2)} m<sup>3</sup>
              </Badge>
            )}
          </Heading>
        </ParamHeader>
        <Flex justify="space-between" p="1.5">
          <CargoVehicle volume={snap.boxState.cargoVolume} />
          <VStack alignItems="flex-start">
            <Text fontSize="xs" color="gray.600">
              ??????????, ??<sup>3</sup>
            </Text>
            <CountButtons
              count={snap.boxState.cargoVolume}
              handleChange={(num: number) => {
                changeBoxCount("cargoVolume", num);
                setCargoVolumeDirty();
              }}
            />
          </VStack>
        </Flex>
      </Box>
      <Box>
        <ParamHeader>
          <Heading p="1" background="gray.100" size="sm">
            ???????????????????????????? ????????????
          </Heading>
        </ParamHeader>
        <Flex justify="space-between" p="1.5">
          <Text as="label" htmlFor="loaders" flex="1">
            ????????????????
          </Text>
          <Checkbox
            id="loaders"
            colorScheme="teal"
            name="loaders"
            isChecked={snap.boxState.loaders}
            onChange={handleCheckboxChange}
          />
        </Flex>
        <Divider />
        <Flex justify="space-between" p="1.5">
          <Text as="label" htmlFor="furniturers" flex="1">
            ???????????? / ???????? ????????????
          </Text>
          <Checkbox
            id="furniturers"
            colorScheme="teal"
            name="furniturers"
            isChecked={snap.boxState.furniturers}
            onChange={handleCheckboxChange}
          />
        </Flex>
        <Divider />
        <Flex justify="space-between" p="1.5">
          <Text as="label" htmlFor="cleaning" flex="1">
            ???????????? / ?????????? ????????????
          </Text>
          <Checkbox
            id="cleaning"
            colorScheme="teal"
            name="cleaning"
            isChecked={snap.boxState.cleaning}
            onChange={handleCheckboxChange}
          />
        </Flex>
      </Box>
      {snap.boxState.canProceed && (
        <Button
          rightIcon={<FiArrowRight />}
          colorScheme="teal"
          borderRadius="none"
          isFullWidth
          zIndex={2}
          position="fixed"
          bottom="0"
          onClick={() => {
            changePage("maps");
          }}
        >
          ??????????
        </Button>
      )}
    </Container>
  );
}

const results = [];

function Results() {
  return (
    <Accordion allowMultiple>
      <AccordionItem>
        <AccordionButton>
          <Box flex="1" textAlign="left">
            <Heading size="lg">?????????????????? 1</Heading>
            <Box>???????????????? 1 + ???????????????? 2 + ???????????????? 3</Box>
          </Box>
          <Badge colorScheme="green" textShadow="2xl">
            T25040
          </Badge>
        </AccordionButton>
        <AccordionPanel pb={4}>
          <List spacing={3}>
            <ListItem
              d="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Flex alignItems="center">
                <ListIcon as={FiCheck} color="green.500" />
                <Box>
                  ?????????????? 1: ??????????????
                  <Text>Rating: 5</Text>
                </Box>
              </Flex>
              <Badge colorScheme="teal" textShadow="2xl">
                T10000
              </Badge>
            </ListItem>
            <ListItem
              d="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Flex alignItems="center">
                <ListIcon as={FiCheck} color="green.500" />
                <Box>
                  ?????????????? 2: ?????????????????? + ????????????????
                  <Text>Rating: 4</Text>
                </Box>
              </Flex>
              <Badge colorScheme="teal" textShadow="2xl">
                T5040
              </Badge>
            </ListItem>
            <ListItem
              d="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Flex alignItems="center">
                <ListIcon as={FiCheck} color="green.500" />
                <Box>
                  ???????????????? 3: ???????????? / ???????? ????????????
                  <Text>Rating: 4</Text>
                </Box>
              </Flex>
              <Badge colorScheme="teal" textShadow="2xl">
                T10000
              </Badge>
            </ListItem>
          </List>
        </AccordionPanel>
      </AccordionItem>

      <AccordionItem>
        <AccordionButton>
          <Box flex="1" textAlign="left">
            <Heading size="lg">?????????????????? 2</Heading>
            <Box>???????????????? 1 + ???????????????? 2 + ???????????????? 4</Box>
          </Box>
          <Badge colorScheme="green" textShadow="2xl">
            T26100
          </Badge>
        </AccordionButton>
        <AccordionPanel pb={4}>
          <List spacing={3}>
            <ListItem
              d="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Flex alignItems="center">
                <ListIcon as={FiCheck} color="green.500" />
                <Box>
                  ?????????????? 1: ??????????????
                  <Text>Rating: 5</Text>
                </Box>
              </Flex>
              <Badge colorScheme="teal" textShadow="2xl">
                T10000
              </Badge>
            </ListItem>
            <ListItem
              d="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Flex alignItems="center">
                <ListIcon as={FiCheck} color="green.500" />
                <Box>
                  ?????????????? 2: ?????????????????? + ????????????????
                  <Text>Rating: 4</Text>
                </Box>
              </Flex>
              <Badge colorScheme="teal" textShadow="2xl">
                T5040
              </Badge>
            </ListItem>
            <ListItem
              d="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Flex alignItems="center">
                <ListIcon as={FiCheck} color="green.500" />
                <Box>
                  ???????????????? 4: ???????????? / ???????? ????????????
                  <Text>Rating: 4.2</Text>
                </Box>
              </Flex>
              <Badge colorScheme="teal" textShadow="2xl">
                T11060
              </Badge>
            </ListItem>
          </List>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}

export default function Home() {
  const snap = useSnapshot(store);
  return (
    <MainLayout>
      <Head>
        <title>Moving App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {snap.pageState === "parametrs" && <Parametrs />}
      {snap.pageState === "results" && <Results />}
      <Maps />
    </MainLayout>
  );
}
