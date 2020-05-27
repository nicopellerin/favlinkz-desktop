import { atom } from "recoil"

import { mockData } from "../utils/mock"

export const mockDataState = atom({
  key: "mockDataState",
  default: mockData,
})
