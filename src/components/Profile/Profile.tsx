import * as React from "react"
import { useEffect } from "react"
import styled, { keyframes } from "styled-components"
import { motion } from "framer-motion"
import { HashRouter as Router, Switch, Route } from "react-router-dom"
import { ipcRenderer, remote } from "electron"
import { useRecoilState, useRecoilValue } from "recoil"

import Navbar from "../Navbar/Navbar"
import Sidebar from "../Sidebar"
import Latest from "../Latest"
import Favorites from "../Favorites"
import User from "../User"
import RssFeed from "../RssFeed"
import RssFeedUrls from "../RssFeed/RssFeedUrls"

import { db } from "../../services/firebase"

import { userState } from "../../state/user"
import {
  rssState,
  rssFeedsState,
  rssNewFeedSeen,
  rssNewFeedIds,
} from "../../state/rss"
import { alertNotifsOnState } from "../../state/notifications"

import Worker from "../../workers/parsing.worker"

const Profile = () => {
  const worker = new Worker()

  const [feeds, setFeeds] = useRecoilState(rssState)
  const [rss, setRss] = useRecoilState(rssFeedsState)
  const [newFeedSeen, setNewFeedSeen] = useRecoilState(rssNewFeedSeen)
  const [newFeedIds, setNewFeedIds] = useRecoilState(rssNewFeedIds)

  const alertNotifsOn = useRecoilValue(alertNotifsOnState)
  const user = useRecoilValue(userState)

  useEffect(() => {
    const rssData = db
      .collection(`users`)
      .doc(user.uid)
      .collection("rss")
      .orderBy("created", "desc")
    // .limit(itemsPerPage)

    rssData.onSnapshot((feeds) => {
      if (feeds.size) {
        const docs: any = []
        feeds.docs.forEach((link) => {
          const newFeeds = { ...link.data() }
          docs.push(newFeeds)
        })
        setFeeds(docs)
        worker.postMessage(docs)
      } else {
        return null
      }
    })
  }, [])

  const beep = new Audio(
    "https://cdn.glitch.com/35252802-b02a-4d63-9536-c72e10d1998c%2Fbeep.mp3?1558053587340"
  )

  useEffect(() => {
    worker.onmessage = (event) => {
      if (event.data.msg === "newRssFeed") {
        ipcRenderer.send("updateTrayIcon")
        setNewFeedSeen(false)
        setNewFeedIds((prevState) => [...prevState, event.data.id])

        beep.play()

        const newFeedsAlert = new remote.Notification({
          title: "New RSS Feeds",
          body: `from ${event.data.title}`,
          icon: "../../assets/icon_144.png",
        })
        alertNotifsOn ? newFeedsAlert.show() : null
      }

      setRss(event.data)
    }
  }, [])

  useEffect(() => {
    const data = localStorage.getItem("feeds")
    worker.postMessage({ type: "lastFeedsBuild", data })
  }, [rss])

  return (
    <Router>
      <Wrapper>
        <Sidebar />
        <div>
          <Navbar />
          <div style={{ height: "100%" }}>
            <Switch>
              <Route path="/profile" exact>
                <Latest />
              </Route>
              <Route path="/profile/favorites">
                <Favorites />
              </Route>
              <Route path="/profile/user">
                <User />
              </Route>
              <Route exact path="/profile/rssfeed">
                <RssFeed />
              </Route>
              <Route path="/profile/rssfeed/:id">
                <RssFeedUrls />
              </Route>
            </Switch>
          </div>
        </div>
      </Wrapper>
    </Router>
  )
}

export default Profile

// Styles
const anim = keyframes`
  from {
    opacity: 0
  }
  to {
    opacity: 1
  }
`

const Wrapper = styled(motion.div)`
  min-height: 100%;
  width: 100%;
  background: ${(props) => props.theme.background};
  display: grid;
  grid-template-columns: 80px 1fr;
  overflow: hidden;
  animation: ${anim} 1s normal forwards ease-in-out;
  animation-iteration-count: 1;
  transition: all 300ms ease-in-out;
`
