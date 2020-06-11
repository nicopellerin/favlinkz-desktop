import { atom, selector } from "recoil"

import { latestState } from "./latest"
import { favoritesState } from "./favorites"

import { User } from "../models/user"

export const userState = atom<User>({
  key: "userState",
  default: JSON.parse(localStorage.getItem("userFavLinkz")!) || {
    displayName: "",
    photoUrl: "",
    uid: "",
    email: "",
  },
})

export const totalLinks = selector({
  key: "totalLinks",
  get: ({ get }) => {
    const latest = get(latestState)
    const favorites = get(favoritesState)

    const total = latest.length + favorites.length
    return total
  },
})
