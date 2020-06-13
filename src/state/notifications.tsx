import { atom } from "recoil"

export const soundNotifsOnState = atom<boolean>({
  key: "soundNotifsOnState",
  default: true,
})
