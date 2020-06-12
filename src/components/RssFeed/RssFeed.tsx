import * as React from "react"
import { ipcRenderer } from "electron"
import { useEffect, useState } from "react"
import styled from "styled-components"
import { motion } from "framer-motion"
import { useRecoilValue, useRecoilState } from "recoil"
import { FaRss } from "react-icons/fa"
import Parser from "rss-parser"
import Spinner from "react-spinkit"
import { useHistory } from "react-router-dom"

import RssCard from "./RssCard"

import { userState } from "../../state/user"
import { rssState, rssFeedsState } from "../../state/rss"

import { Feed, ParsedFeed } from "../../models/feed"

import Worker from "./parsing.worker.js"

import { db } from "../../services/firebase"

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
  const history = useHistory()

  const [loading, setLoading] = useState(false)

  const [feeds, setFeeds] = useRecoilState(rssState)
  const [rss, setRss] = useRecoilState(rssFeedsState)
  const user = useRecoilValue(userState)

  // let feedsLastBuild = []
  // useEffect(() => {
  //   ipcRenderer.send("updateTrayIcon")
  //   rss.map((feed) => {
  //     feedsLastBuild.push({ id: feed.id, lastBuildDate: feed.lastBuildDate })
  //   })
  //   localStorage.setItem("feeds", JSON.stringify(feedsLastBuild))
  // }, [rss])

  return (
    <Wrapper
      variants={userVariants}
      initial="hidden"
      animate="show"
      exit="exit"
    >
      {feeds?.length > 0 &&
        rss?.map((feed: ParsedFeed) => (
          <RssCard key={feed.title} feed={feed} />
        ))}

      {/* {loading && <Spinner name="ball-pulse-rise" color="#ff5c5b" />} */}

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
