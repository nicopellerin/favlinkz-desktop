import { atom, selector } from "recoil"

import { db } from "../services/firebase"
import { userState } from "./user"

// export const rssData = selector({
//   key: "rssData",
//   get: ({ get }) => {
//     const user = get(userState)

//     const rssData = db.collection(`users`).doc(user.uid).collection("rss")
//     // .orderBy("created", "desc")
//     // .limit(itemsPerPage)

//     rssData.onSnapshot((feeds) => {
//       if (feeds.size) {
//         const docs: any = []
//         feeds.docs.forEach((link) => {
//           const newFeeds = { ...link.data() }
//           docs.push(newFeeds)
//         })
//         console.log(docs)
//         return docs
//       } else {
//         return null
//       }
//     })
//   },
// })

export const rssState = atom({
  key: "rssState",
  default: [],
})
