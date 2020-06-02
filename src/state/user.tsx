import { atom } from "recoil"

export const userState = atom({
  key: "userState",
  default: { displayName: "", photoUrl: "", uid: "", email: "" },
})
