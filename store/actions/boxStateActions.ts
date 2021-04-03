import { AdditionalHelpTypes, BoxCountTypes, store } from "../index";

export function changeBoxCheckbox(
  name: keyof AdditionalHelpTypes,
  checked: boolean
) {
  store.boxState[name] = checked;
}

export function changeBoxCount(type: keyof BoxCountTypes, value: number) {
  store.boxState[type] += value;
}

export function setCargoVolumeDirty() {
  store.boxState.cargoVolumeDirty = true;
}
