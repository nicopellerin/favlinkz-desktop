import { atom } from "recoil"

import { Link } from "../models/link"

export const favoritesState = atom<Array<Link>>({
  key: "favoritesState",
  default: [],
})
