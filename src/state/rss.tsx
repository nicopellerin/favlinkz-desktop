import { atom } from "recoil"

export const rssFeedsState = atom<Array<any>>({
  key: "rssFeedsState",
  default: [],
})

export const rssFeedsUrlsState = atom<any>({
  key: "rssFeedsUrlsState",
  default: {},
})

export const rssNewFeedSeen = atom<boolean>({
  key: "rssNewFeedSeen",
  default: true,
})

export const rssNewFeedIds = atom<Array<any>>({
  key: "rssNewFeedIds",
  default: [],
})

export const rssFeedsLoadingState = atom<boolean>({
  key: "rssFeedsLoadingState",
  default: false,
})

export const rssSubscribedState = atom<any>({
  key: "rssSubscribedState",
  default: [],
})
