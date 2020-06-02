import { atom, selector } from "recoil"
import { latestState } from "./latest"
import { favoritesState } from "./favorites"

export const userState = atom({
  key: "userState",
  default: { displayName: "", photoUrl: "", uid: "", email: "" },
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
