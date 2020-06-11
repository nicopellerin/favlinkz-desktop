import { atom } from "recoil"

export const rssState = atom<Array<any>>({
  key: "rssState",
  default: [],
})

export const rssFeedsState = atom<Array<any>>({
  key: "rssFeedsState",
  default: [],
})
