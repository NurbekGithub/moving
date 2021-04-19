import { Box, Button } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { FiArrowRight } from "react-icons/fi";
import {
  MapState,
  SearchControl,
  YMaps,
  ZoomControl,
  Map,
  // RoutePanel,
} from "react-yandex-maps";
import { useSnapshot } from "valtio";
import { useGeoPosition } from "../hooks/useGeoPosition";
import { store } from "../store";
import { changePage } from "../store/actions/pageStateActions";

const ASTANA_GEO_POINT = [51.128207, 71.430411];
const defaultState: MapState = {
  center: ASTANA_GEO_POINT,
  zoom: 9,
};
export function Maps() {
  const snap = useSnapshot(store);
  const isHidden = snap.pageState !== "maps";
  const [position] = useGeoPosition(!isHidden);
  const [state, setState] = useState(defaultState);

  useEffect(() => {
    if (position) {
      setState({
        center: [position.coords.latitude, position.coords.longitude],
        zoom: 15,
      });
    }
  }, [position]);
  return (
    <Box flex="1" d="flex" w="100%" hidden={isHidden} position="relative">
      <YMaps query={{ apikey: "922688b0-ec1e-4fe7-92f7-deea83d01c3d" }}>
        <Map width="100%" style={{ flex: 1 }} state={state}>
          <SearchControl />
          <ZoomControl />
        </Map>
      </YMaps>
      <Button
        rightIcon={<FiArrowRight />}
        colorScheme="teal"
        borderRadius="none"
        isFullWidth
        position="absolute"
        bottom="0"
        onClick={() => {
          changePage("results");
        }}
      >
        Далее
      </Button>
    </Box>
  );
}
