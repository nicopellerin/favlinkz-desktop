import * as React from "react"
import { useEffect, useState } from "react"
import styled from "styled-components"
import { motion } from "framer-motion"
import { rssState } from "../../state/rss"
import { useRecoilValue, useRecoilState } from "recoil"
import { userState } from "../../state/user"
import { db } from "../../services/firebase"

import Parser from "rss-parser"

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

  useEffect(() => {
    ;(async () => {
      let feed = await parser.parseURL(feeds[0].feed)
      console.log(feed)
      setRss(feed)
      // feed.items.forEach((item) => {
      //   console.log(item.title + ":" + item.link)
      // })
    })()
  }, [feeds])

  return (
    <Wrapper
      variants={userVariants}
      initial="hidden"
      animate="show"
      exit="exit"
    >
      <Card>
        <Title>{rss?.title}</Title>
        <Desc>{rss?.description}</Desc>
        <FeedList>
          {rss?.items?.map((feed) => (
            <Feed key={feed.title}>
              <a href={feed.link} target="_blank">
                {feed.title}
              </a>
            </Feed>
          ))}
        </FeedList>
      </Card>
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
  height: calc(100% - 100px);
`

const Card = styled.div``

const Title = styled.h3`
  color: var(--primaryColor);
  margin-bottom: 1rem;
  font-size: 4rem;
`

const Desc = styled.h5`
  font-size: 1.6rem;
`

const FeedList = styled.ul`
  list-style: none;
  padding: 0;

  a {
    color: #333;

    &:hover {
      text-decoration: underline;
    }
  }
`

const Feed = styled.li`
  color: #333;
  font-size: 1.6rem;

  &:not(:last-child) {
    margin-bottom: 1rem;
  }
`
