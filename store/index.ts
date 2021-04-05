import { proxy } from "valtio";
import { addComputed } from "valtio/utils";

export type BoxCountTypes = {
  smBoxes: number;
  mdBoxes: number;
  lgBoxes: number;
  cargoVolume: number;
};

export type ComputedTypes = {
  cargoVolumeDirty: boolean;
  totalBoxVolume: number;
  canProceed: boolean;
};

export type AdditionalHelpTypes = {
  loaders: boolean;
  cleaning: boolean;
  furniturers: boolean;
};

export type pageEnums = "parametrs" | "maps" | "results";

export const store = proxy({
  boxState: {
    smBoxes: 0,
    mdBoxes: 0,
    lgBoxes: 0,
    loaders: false,
    cleaning: false,
    furniturers: false,
    cargoVolumeDirty: false,
  },
  pageState: "parametrs",
}) as {
  boxState: BoxCountTypes & AdditionalHelpTypes & ComputedTypes;
  pageState: pageEnums;
};

addComputed(store.boxState, {
  totalBoxVolume: ({ smBoxes, mdBoxes, lgBoxes }) =>
    lgBoxes * 1 * 1 * 0.5 +
    mdBoxes * 0.5 * 0.5 * 0.5 +
    smBoxes * 0.5 * 0.5 * 0.2,
  cargoVolume: ({ cargoVolumeDirty, cargoVolume, totalBoxVolume }) =>
    cargoVolumeDirty ? cargoVolume : totalBoxVolume,
  canProceed: ({
    totalBoxVolume,
    cargoVolume,
    cleaning,
    furniturers,
    loaders,
  }) =>
    Boolean(
      totalBoxVolume || cargoVolume || cleaning || furniturers || loaders
    ),
});
