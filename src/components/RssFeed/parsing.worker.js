const Parser = require("rss-parser")
const parser = new Parser()

;(async () => {
  self.addEventListener("message", async (event) => {
    const feeds = event.data
    if (feeds) {
      console.log("yo")
      const arr = []
      for (let feed of feeds) {
        let res = await parser.parseURL(feed.feed)
        res = { ...res, id: feed["id"], image: feed["image"] }
        arr.push(res)
      }
      self.postMessage(arr)
    }
  })
})()
