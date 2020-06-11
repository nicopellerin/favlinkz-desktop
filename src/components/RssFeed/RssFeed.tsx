import * as React from "react"
import { useEffect, useState } from "react"
import styled from "styled-components"
import { motion } from "framer-motion"
import { useRecoilValue, useRecoilState } from "recoil"
import { FaRss } from "react-icons/fa"
import Parser from "rss-parser"

import RssCard from "./RssCard"

import { userState } from "../../state/user"
import { rssState, rssFeedsState } from "../../state/rss"
import { Feed } from "../../models/feed"

import { db } from "../../services/firebase"

const parser = new Parser()

const userVariants = {
  hidden: {
    y: -40,
  },
  show: {
    y: -50,
    transition: {
      type: "spring",
      damping: 10,
      stiffness: 80,
      velocity: 2,
      staggerChildren: 0.02,
    },
  },
  exit: {
    transition: {
      type: "tween",
      damping: 100,
      stiffness: 80,
      staggerChildren: 0.5,
    },
  },
}

// const cache = {}

const RssFeed = () => {
  const [loading, setLoading] = useState(false)

  const [feeds, setFeeds] = useRecoilState(rssState)
  const [rss, setRss] = useRecoilState(rssFeedsState)
  const user = useRecoilValue(userState)

  useEffect(() => {
    const rssData = db.collection(`users`).doc(user.uid).collection("rss")
    // .orderBy("created", "desc")
    // .limit(itemsPerPage)

    rssData.onSnapshot((feeds) => {
      if (feeds.size) {
        const docs: any = []
        feeds.docs.forEach((link) => {
          const newFeeds = { ...link.data() }
          docs.push(newFeeds)
        })
        setFeeds(docs)
      } else {
        return null
      }
    })
  }, [])

  const parseRss = async (feeds) => {
    // setLoading(true)
    const arr = []
    for (let feed of feeds) {
      const res = await parser.parseURL(feed.feed)
      arr.push(res)
    }
    // setLoading(false)
    return arr
  }

  const loadParsedRss = async () => {
    const res = await parseRss(feeds)
    setRss(res)
    // cache["allFeeds"] = res
  }

  useEffect(() => {
    loadParsedRss()
  }, [feeds])

  // if (loading) {
  //   return null
  // }

  return (
    <Wrapper
      variants={userVariants}
      initial="hidden"
      animate="show"
      exit="exit"
    >
      {feeds?.length > 0 &&
        rss?.map((feed: Feed) => <RssCard key={feed.title} feed={feed} />)}

      {!loading && feeds?.length < 1 && (
        <NoMatchingResults animate={{ y: [10, 0], opacity: [0, 1] }}>
          <h2>
            Found <span style={{ color: "var(--primaryColor)" }}>0</span> RSS
            feeds
          </h2>
          <h4 style={{ display: "flex", alignItems: "center" }}>
            Click the RSS icon{" "}
            <FaRss
              style={{ margin: "0 7px", color: "var(--secondaryColor)" }}
            />{" "}
            on cards to start building feed collection
          </h4>
        </NoMatchingResults>
      )}
    </Wrapper>
  )
}

export default RssFeed

// Styles
const Wrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100% - 100px);
`

const NoMatchingResults = styled(motion.div)`
  height: calc(100% - 300px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  user-select: none;
`
