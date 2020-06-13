import { atom } from "recoil"

export const soundNotifsOnState = atom<boolean>({
  key: "soundNotifsOnState",
  default: true,
})

export const alertNotifsOnState = atom<boolean>({
  key: "alertNotifsOnState",
  default: false,
})
