import * as React from "react"
import { useState, useEffect } from "react"
import styled from "styled-components"
import { motion, AnimateSharedLayout, AnimatePresence } from "framer-motion"
import { useRecoilState, useRecoilValue } from "recoil"
import { FaRss } from "react-icons/fa"
import { ipcRenderer } from "electron"
import hash from "object-hash"

import RssCard from "./RssCard"

import {
  rssFeedsState,
  rssNewFeedSeen,
  rssFeedsLoadingState,
  rssFeedsUrlsState,
} from "../../state/rss"
import { soundNotifsOnState } from "../../state/notifications"
import { searchResultsState, locationState } from "../../state/searchbar"
import { pageState } from "../../state/pagination"

import { ParsedFeed } from "../../models/feed"

interface StyledProps {
  disabled: boolean
}

const RssFeed = () => {
  const [feeds, setFeeds] = useRecoilState(rssFeedsState)
  const [rss, setRss] = useRecoilState(rssFeedsUrlsState)
  const [newFeedSeen, setNewFeedSeen] = useRecoilState(rssNewFeedSeen)
  const [location, setLocation] = useRecoilState(locationState)
  const [page, setPage] = useRecoilState(pageState)

  const results = useRecoilValue(searchResultsState)
  const soundNotifsOn = useRecoilValue(soundNotifsOnState)
  const rssFeedsLoading = useRecoilValue(rssFeedsLoadingState)

  let totalPages = Math.ceil(feeds.length / 4)

  const prevPage = (page: number) => {
    page - 1 > 0 ? setPage((prevState) => prevState - 1) : null
  }

  const nextPage = (page: number) => {
    page + 1 <= totalPages ? setPage((prevState) => prevState + 1) : null
  }

  useEffect(() => {
    setLocation("rssfeeds")
  }, [])

  let feedsLastBuild = {}
  useEffect(() => {
    ipcRenderer.send("updateTrayIconNotifsSeen")
    setNewFeedSeen(true)
    if (Object.keys(rss).length) {
      Object.values(rss).map((feed) => {
        feedsLastBuild[feed.id] = {
          lastBuildDate: feed.lastBuildDate,
          id: feed.id,
          title: feed.title,
          items: hash.sha1(feed.items),
        }
      })
      localStorage.setItem("feeds", JSON.stringify(feedsLastBuild))
    }
  }, [])

  const swoosh = new Audio(
    "https://raw.github.com/nicopellerin/favlinkz-desktop/master/sounds/tap-hollow.mp3"
  )

  const errorSound = new Audio(
    "https://raw.github.com/nicopellerin/favlinkz-desktop/master/sounds/error-smooth.mp3"
  )

  return (
    <Wrapper>
      <AnimatePresence>
        <RssCardList>
          {results?.length > 0 &&
            results
              ?.slice((page - 1) * 4, (page - 1) * 4 + 4)
              .map((feed: ParsedFeed) => <RssCard key={feed.id} feed={feed} />)}
        </RssCardList>
      </AnimatePresence>
      {results?.length < 1 && (
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
          onClick={() => {
            prevPage(page)
            if (soundNotifsOn && page === 1) {
              errorSound.play()
            } else if (soundNotifsOn) {
              swoosh.play()
            }
          }}
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
          disabled={page + 1 > totalPages || feeds?.length <= 4}
          onClick={() => {
            nextPage(page)
            if (
              (soundNotifsOn && page + 1 > totalPages) ||
              feeds?.length <= 4
            ) {
              errorSound.play()
            } else if (soundNotifsOn) {
              swoosh.play()
            }
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="10" height="18">
            <path
              d="M 0.429 0.318 C 0.843 -0.106 1.525 -0.106 1.94 0.318 L 9.493 8.055 C 9.913 8.485 9.913 9.172 9.493 9.602 L 9.493 9.602 C 9.079 10.026 8.397 10.026 7.982 9.602 L 0.429 1.865 C 0.009 1.435 0.009 0.748 0.429 0.318 Z M 9.379 8.229 C 9.799 8.659 9.799 9.346 9.379 9.776 L 1.826 17.513 C 1.412 17.937 0.729 17.937 0.315 17.513 L 0.315 17.513 C -0.105 17.083 -0.105 16.396 0.315 15.966 L 7.869 8.229 C 8.283 7.805 8.965 7.805 9.379 8.229 Z"
              transform="translate(0.016 0.085) rotate(-360 4.904 8.916)"
              fill={
                page + 1 > totalPages || feeds?.length <= 4
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

const RssCardList = styled(motion.div)`
  position: absolute;
  margin-top: 0.2rem;
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
  bottom: 5rem;
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
`
