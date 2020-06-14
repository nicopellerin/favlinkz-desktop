import { atom } from "recoil"

import { User } from "../models/user"

export const userState = atom<User>({
  key: "userState",
  default: JSON.parse(localStorage.getItem("userFavLinkz")!) || {
    displayName: "",
    photoUrl: "",
    uid: "",
    email: "",
  },
})
