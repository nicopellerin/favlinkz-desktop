import * as React from "react"
import { useEffect, useState } from "react"
import styled from "styled-components"
import { motion, AnimatePresence } from "framer-motion"
import { rssState } from "../../state/rss"
import { useRecoilValue, useRecoilState } from "recoil"
import { userState } from "../../state/user"
import { db } from "../../services/firebase"

import Parser from "rss-parser"
import RssCard from "./RssCard"
import { Switch, Route, HashRouter as Router } from "react-router-dom"

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

const RssFeed = () => {
  const [feeds, setFeeds] = useRecoilState(rssState)
  const [rss, setRss] = useState([])
  const [loading, setLoading] = useState(true)

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
    if (feeds?.length) {
      let feed = await parser.parseURL(feeds[0].feed)
      // let feed2 = await parser.parseURL(feeds[1].feed)
      console.log(feeds)
      setRss([...rss, { id: feeds[0].id, feed }])
      setLoading(false)
    } else {
      setLoading(false)
    }
  }

  useEffect(() => {
    // TODO - Add proper loop
    parseRss(feeds)
  }, [feeds])

  if (loading) {
    return null
  }

  return (
    <Wrapper
      variants={userVariants}
      initial="hidden"
      animate="show"
      exit="exit"
    >
      {rss?.length > 0 &&
        rss.map((feed) => (
          <RssCard key={feed.title} id={feed.id} feed={feed.feed} />
        ))}
      {!loading && rss?.length < 1 && (
        <NoMatchingResults animate={{ y: [10, 0], opacity: [0, 1] }}>
          <h2>Found 0 RSS feeds</h2>
          <h4>Click the RSS icon on cards to start building feed</h4>
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
