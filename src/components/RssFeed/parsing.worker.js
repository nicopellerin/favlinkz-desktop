const Parser = require("rss-parser")
const parser = new Parser()

let parsedLastBuilds = {}
const newFeeds = []

;(async () => {
  const checkIfNewFeeds = (a, b) => {
    console.log(a, b)
    if (a !== b) {
      self.postMessage("new RSS feed")
    }
  }

  self.addEventListener("message", async (event) => {
    if (event.data.type === "lastFeedsBuild") {
      parsedLastBuilds = JSON.parse(event.data.data)
    }

    const feeds = event.data
    if (feeds.length) {
      for (let feed of feeds) {
        let res = await parser.parseURL(feed.feed)
        res = { ...res, id: feed["id"], image: feed["image"] }

        if (parsedLastBuilds[res.id]) {
          checkIfNewFeeds(
            res.lastBuildDate,
            parsedLastBuilds[res.id].lastBuildDate
          )
        }

        newFeeds.push(res)
      }
      self.postMessage(newFeeds)
    }
  })
})()
// checkFeeds()
// intervalId = setInterval(() => checkFeeds(), 10000)
