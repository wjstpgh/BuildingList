import { atom } from "recoil";

export const buildingList = atom<string[]>({
  key: "buildingList",
  default: [],
});
