import { atom, selector } from "recoil"

import { latestState } from "../state/latest"
import { favoritesState } from "./favorites"

interface Results {
  url: string
  title: string
  image: string
}

export const searchTextState = atom({
  key: "searchTextState",
  default: "",
})

export const locationState = atom({
  key: "locationState",
  default: "",
})

export const searchResultsState = selector({
  key: "searchResultsState",
  get: ({ get }) => {
    const pathname = get(locationState)
    const data =
      pathname === "favorites" ? get(favoritesState) : get(latestState)
    // console.log("data", data)
    console.log(pathname)

    if (data) {
      const searchText = get(searchTextState)

      return data.filter((item: Results) =>
        item.title.toLowerCase().includes(searchText.toLowerCase())
      )
    }
    return []
  },
})
