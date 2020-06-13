import { atom } from "recoil"

export const rssState = atom<Array<any>>({
  key: "rssState",
  default: [],
})

export const rssFeedsState = atom<Array<any>>({
  key: "rssFeedsState",
  default: [],
})

export const rssNewFeedSeen = atom<boolean>({
  key: "rssNewFeedSeen",
  default: true,
})
