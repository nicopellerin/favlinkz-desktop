import { atom } from "recoil"

import { Link } from "../models/link"

export const latestState = atom<Array<Link>>({
  key: "latestState",
  default: [],
})
