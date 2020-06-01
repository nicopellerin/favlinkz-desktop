import { atom, selector } from "recoil"

import { mockDataState } from "../state/latest"

interface Results {
  url: string
  title: string
  image: string
}

export const searchTextState = atom({
  key: "searchTextState",
  default: "",
})

export const searchResultsState = selector({
  key: "searchResultsState",
  get: ({ get }) => {
    const data = get(mockDataState)
    const searchText = get(searchTextState)

    return data.filter((item: Results) =>
      item.title.toLowerCase().includes(searchText.toLowerCase())
    )
  },
})
