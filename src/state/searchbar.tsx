import { atom, selector } from "recoil"

import { latestState } from "../state/latest"
import { favoritesState } from "./favorites"
import { rssFeedsState } from "./rss"

import { Link } from "../models/link"

export const searchTextState = atom({
  key: "searchTextState",
  default: "",
})

export const locationState = atom({
  key: "locationState",
  default: "",
})

export const searchResultsState = selector<Array<any>>({
  key: "searchResultsState",
  get: ({ get }) => {
    const pathname = get(locationState)
    const searchText = get(searchTextState)

    let data

    switch (pathname) {
      case "favorites":
        data = get(favoritesState)
        return data.filter((item: Link) =>
          item.title.toLowerCase().includes(searchText.toLowerCase())
        )
      case "profile":
        data = get(latestState)
        return data.filter((item: Link) =>
          item.title.toLowerCase().includes(searchText.toLowerCase())
        )
      case "rssfeeds":
        data = get(rssFeedsState)
        return data.filter((item: any) =>
          item.title.toLowerCase().includes(searchText.toLowerCase())
        )
      default:
        return []
    }
  },
})
