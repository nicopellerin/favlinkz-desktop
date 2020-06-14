const Parser = require("rss-parser")
const parser = new Parser()
const hash = require("object-hash")

let parsedLastBuilds = {}

const getFeeds = async () => {
  const checkIfNewFeeds = (a, b) => {
    if (hash.sha1(a) !== b.items) {
      self.postMessage({ msg: "newRssFeed", id: b.id, title: b.title })
    }
  }

  self.addEventListener("message", async (event) => {
    if (event.data.type === "lastFeedsBuild") {
      parsedLastBuilds = JSON.parse(event.data.data)
    }
    const feeds = event.data

    const newFeeds = []

    if (feeds.length) {
      for (let feed of feeds) {
        let res = await parser.parseURL(feed.feed)

        res = {
          ...res,
          id: feed["id"],
          image: feed["image"],
        }

        if (parsedLastBuilds && parsedLastBuilds[res.id]) {
          checkIfNewFeeds(res.items, parsedLastBuilds[res.id])
        }

        newFeeds.push(res)
      }

      self.postMessage(newFeeds)
    }
  })
}

getFeeds()
