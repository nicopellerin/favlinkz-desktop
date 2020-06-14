import { atom } from "recoil"

export const soundNotifsOnState = atom<boolean>({
  key: "soundNotifsOnState",
  default:
    JSON.parse(localStorage.getItem("soundNotifsOn")!) !== null
      ? JSON.parse(localStorage.getItem("soundNotifsOn")!)
      : true,
})

export const alertNotifsOnState = atom<boolean>({
  key: "alertNotifsOnState",
  default:
    JSON.parse(localStorage.getItem("alertNotifsOn")!) !== null
      ? JSON.parse(localStorage.getItem("alertNotifsOn")!)
      : false,
})
