import * as React from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"
import { useRecoilState, useRecoilValue } from "recoil"
import { FaLink, FaRss } from "react-icons/fa"

import { ParsedFeed } from "../../models/feed"
import { db } from "../../services/firebase"

import { rssState, rssNewFeedIds } from "../../state/rss"
import { userState } from "../../state/user"

import { maxLength } from "../../utils"
import { motion } from "framer-motion"

interface Props {
  feed: ParsedFeed
}

const RssCard: React.FC<Props> = ({ feed }) => {
  const [feeds, setFeeds] = useRecoilState(rssState)
  const [newFeedIds, setNewFeedIds] = useRecoilState(rssNewFeedIds)
  const user = useRecoilValue(userState)

  const removeFeed = (id: string) => {
    const newFeeds = feeds.filter((f) => f.id !== id)
    const rssFeed = db.collection(`users`).doc(user.uid).collection("rss")
    rssFeed.doc(id).delete()
    setFeeds(newFeeds)
  }

  const toggleFeedToSeen = (id: string) => {
    const rssNewFeedIdsArr = newFeedIds.filter((f) => f !== id)
    setNewFeedIds(rssNewFeedIdsArr)
  }

  return (
    <Card animate>
      <Heading>
        <div>
          <Title title={feed?.title}>
            {newFeedIds.includes(feed?.id) && <NotifyRSS />}
            {maxLength(
              feed?.title ||
                feed?.link?.split(".")[1][0].toUpperCase() +
                  feed?.link?.split(".")[1].slice(1),
              36
            )}
          </Title>
          <Desc>{maxLength(feed?.description, 70)}</Desc>
          <Url>
            <FaLink size={14} style={{ marginRight: 5 }} />{" "}
            <a href={feed?.link} target="_blank">
              {feed?.link}
            </a>
          </Url>
        </div>
        <ButtonGroup>
          <Link
            to={{ pathname: `/profile/rssfeed/${feed?.id}`, state: { feed } }}
          >
            <ShowFeedButton onClick={() => toggleFeedToSeen(feed?.id)}>
              Show feed <FaRss style={{ marginLeft: 5 }} />
            </ShowFeedButton>
          </Link>
          <RemoveButton onClick={() => removeFeed(feed?.id)}>
            Remove
          </RemoveButton>
        </ButtonGroup>
      </Heading>
    </Card>
  )
}

export default RssCard

// Styles
const Card = styled(motion.div)`
  width: 80rem;

  &:not(:first-child) {
    padding-top: 2rem;
  }
`

const Heading = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #ddd;
`

const Title = styled.h3`
  color: ${(props) => props.theme.rssCardTitle};
  margin-bottom: 1rem;
  font-size: 2.8rem;
  font-weight: 500;
  transition: color 300ms ease-in-out;
  position: relative;
`

const Desc = styled.h5`
  font-size: 1.6rem;
  margin-bottom: 1.6rem;
  transition: color 300ms ease-in-out;
  color: ${(props) => props.theme.textColor};
`

const Url = styled.h5`
  font-size: 1.6rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  transition: color 300ms ease-in-out;
  color: ${(props) => props.theme.textColor};
  position: relative;

  a {
    transition: color 300ms ease-in-out;
    color: ${(props) => props.theme.textColor};
    text-decoration: underline;
  }
`

const ButtonGroup = styled.div`
  display: flex;
  align-self: flex-start;
  margin-top: 2px;
`

const RemoveButton = styled.button`
  background: crimson;
  border: none;
  border-radius: 5px;
  color: ghostwhite;
  padding: 5px;
  transition: transform 100ms ease-in;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  font-weight: 600;
  cursor: pointer;
  font-size: 1.4rem;
  outline: none;
`

const ShowFeedButton = styled(RemoveButton)`
  background: #4b36dc;
  outline: none;
  margin-right: 1rem;
  display: flex;
  align-items: center;
`

const NotifyRSS = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: -20px;
  background: #ff3636;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  z-index: 2;
`
