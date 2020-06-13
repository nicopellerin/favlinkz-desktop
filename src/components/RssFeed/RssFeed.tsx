import * as React from "react"
import { useState, useEffect } from "react"
import styled from "styled-components"
import { motion } from "framer-motion"
import { useRecoilState } from "recoil"
import { FaRss } from "react-icons/fa"
import Spinner from "react-spinkit"
import { ipcRenderer } from "electron"

import RssCard from "./RssCard"

import { rssState, rssFeedsState, rssNewFeedSeen } from "../../state/rss"

import { ParsedFeed } from "../../models/feed"

// interface A {
//   lastBuildDate: Date
// }

interface StyledProps {
  disabled: boolean
}

const RssFeed = () => {
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)

  const [feeds, setFeeds] = useRecoilState(rssState)
  const [newFeedSeen, setNewFeedSeen] = useRecoilState(rssNewFeedSeen)
  const [rss, setRss] = useRecoilState(rssFeedsState)

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

  let totalPages = Math.ceil(rss.length / 4)

  const prevPage = (page: number) => {
    page - 1 > 0 ? setPage((prevState) => prevState - 1) : null
  }

  const nextPage = (page: number) => {
    page + 1 <= totalPages ? setPage((prevState) => prevState + 1) : null
  }

  let feedsLastBuild = {}
  useEffect(() => {
    ipcRenderer.send("updateTrayIconNotifsSeen")
    setNewFeedSeen(true)
    rss.map((feed) => {
      feedsLastBuild[feed.id] = {
        lastBuildDate: feed.lastBuildDate,
        id: feed.id,
      }
    })
    localStorage.setItem("feeds", JSON.stringify(feedsLastBuild))
  }, [rss])

  return (
    <Wrapper
      variants={userVariants}
      initial="hidden"
      animate="show"
      exit="exit"
    >
      {feeds?.length > 0 &&
        rss
          ?.slice((page - 1) * 4, (page - 1) * 4 + 4)
          .map((feed: ParsedFeed) => <RssCard key={feed.id} feed={feed} />)}

      {loading && <Spinner name="ball-pulse-rise" color="#ff5c5b" />}

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

      <PaginateControls
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          type: "spring",
          damping: 10,
          stiffness: 80,
          delay: 0.3,
        }}
      >
        <PrevIcon
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={page === 1}
          onClick={() => prevPage(page)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="10" height="18">
            <path
              d="M 0.429 0.318 C 0.843 -0.106 1.525 -0.106 1.94 0.318 L 9.493 8.055 C 9.913 8.485 9.913 9.172 9.493 9.602 L 9.493 9.602 C 9.079 10.026 8.397 10.026 7.982 9.602 L 0.429 1.865 C 0.009 1.435 0.009 0.748 0.429 0.318 Z M 9.379 8.229 C 9.799 8.659 9.799 9.346 9.379 9.776 L 1.826 17.513 C 1.412 17.937 0.729 17.937 0.315 17.513 L 0.315 17.513 C -0.105 17.083 -0.105 16.396 0.315 15.966 L 7.869 8.229 C 8.283 7.805 8.965 7.805 9.379 8.229 Z"
              transform="translate(0.016 0.085) rotate(-180 4.904 8.916)"
              fill={page === 1 ? "#bbb" : "var(--primaryColor)"}
            ></path>
          </svg>
        </PrevIcon>
        <NextIcon
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={page + 1 > totalPages || rss?.length <= 4}
          onClick={() => nextPage(page)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="10" height="18">
            <path
              d="M 0.429 0.318 C 0.843 -0.106 1.525 -0.106 1.94 0.318 L 9.493 8.055 C 9.913 8.485 9.913 9.172 9.493 9.602 L 9.493 9.602 C 9.079 10.026 8.397 10.026 7.982 9.602 L 0.429 1.865 C 0.009 1.435 0.009 0.748 0.429 0.318 Z M 9.379 8.229 C 9.799 8.659 9.799 9.346 9.379 9.776 L 1.826 17.513 C 1.412 17.937 0.729 17.937 0.315 17.513 L 0.315 17.513 C -0.105 17.083 -0.105 16.396 0.315 15.966 L 7.869 8.229 C 8.283 7.805 8.965 7.805 9.379 8.229 Z"
              transform="translate(0.016 0.085) rotate(-360 4.904 8.916)"
              fill={
                page + 1 > totalPages || rss?.length <= 4
                  ? "#bbb"
                  : "var(--primaryColor)"
              }
            ></path>
          </svg>
        </NextIcon>
      </PaginateControls>
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

const PaginateControls = styled(motion.div)`
  display: flex;
  position: fixed;
  bottom: 1rem;
  justify-content: space-around;
  width: 12rem;
  z-index: 9999;
`

const PrevIcon = styled(motion.div)`
  user-select: none;
  cursor: ${(props: StyledProps) => (props.disabled ? "normal" : "pointer")};
  z-index: 2;
  background: ${(props) => props.theme.prevIcon};
  height: 40px;
  width: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: ${(props: StyledProps) => (props.disabled ? "none" : "all")};
  filter: drop-shadow(0 0 0.75rem rgba(89, 86, 213, 0.2));
`

const NextIcon = styled(motion.div)`
  user-select: none;
  cursor: ${(props: StyledProps) => (props.disabled ? "normal" : "pointer")};
  z-index: 2;
  background: ${(props) => props.theme.nextIcon};
  height: 40px;
  width: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  filter: drop-shadow(0 0 0.75rem rgba(89, 86, 213, 0.2));
  pointer-events: ${(props: StyledProps) => (props.disabled ? "none" : "all")};
`
