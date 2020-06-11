import { atom, selector } from "recoil"

import { latestState } from "../state/latest"
import { favoritesState } from "./favorites"

import { Link } from "../models/link"

export const searchTextState = atom({
  key: "searchTextState",
  default: "",
})

export const locationState = atom({
  key: "locationState",
  default: "",
})

export const searchResultsState = selector<Array<Link>>({
  key: "searchResultsState",
  get: ({ get }) => {
    const pathname = get(locationState)
    const data =
      pathname === "favorites" ? get(favoritesState) : get(latestState)

    if (data) {
      const searchText = get(searchTextState)

      return data.filter((item: Link) =>
        item.title.toLowerCase().includes(searchText.toLowerCase())
      )
    }
    return []
  },
})
