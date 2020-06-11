import { atom } from "recoil"

export const rssState = atom({
  key: "rssState",
  default: [],
})

export const rssFeedsState = atom({
  key: "rssFeedsState",
  default: [],
})
