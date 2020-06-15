import * as React from "react"
import { useState, useEffect } from "react"
import { FaHeart, FaStickyNote, FaRss } from "react-icons/fa"
import styled from "styled-components"
import {
  motion,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion"
import { useRecoilState, useRecoilValue } from "recoil"
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterIcon,
  TwitterShareButton,
  EmailShareButton,
  EmailIcon,
} from "react-share"
import ReactTooltip from "react-tooltip"
import { useLocation } from "react-router-dom"

import { latestState } from "../../state/latest"
import { favoritesState } from "../../state/favorites"

import { Link } from "../../models/link"
import { userState } from "../../state/user"
import { rssSubscribedState } from "../../state/rss"

import { db } from "../../services/firebase"

import { maxLength, maxLengthUrl, spliceUrl } from "../../utils"

interface Props {
  link: Link
  showheart: boolean
}

interface StyledProps {
  showheart: boolean
  subscribed: boolean
}

const Card: React.FC<Props> = ({ link, showheart }) => {
  const { pathname } = useLocation()

  const [showNote, setShowNote] = useState(false)
  const [favorited, setFavorited] = useState(false)
  const [copied, setCopied] = useState(false)
  const [addedToRssFeed, setAddedToRssFeed] = useState(false)

  const [latest, setLatest] = useRecoilState(latestState)
  const [favorites, setFavorites] = useRecoilState(favoritesState)

  const user = useRecoilValue(userState)

  const y = useSpring(0, { stiffness: 300, damping: 20 })
  const scale = useMotionValue(1)

  const itemVariants = {
    hidden: {
      y: 5,
    },
    show: {
      y: 0,
      transition: {
        type: "spring",
        damping: 10,
        stiffness: 80,
      },
    },
  }

  // Copy url to clipboard
  const copyToClipboard = (url: string) => {
    const clipboard = window.navigator.clipboard
    setCopied(true)
    return clipboard.writeText(url)
  }

  useEffect(() => {
    const id = setTimeout(() => {
      setCopied(false)
    }, 1000)

    return () => clearTimeout(id)
  }, [copied])

  // Add website to rss feed collection
  const subscribeToRssFeed = (
    rss: string,
    id: string,
    title: string,
    url: string,
    image: string,
    description: string
  ) => {
    const newSubscription = db
      .collection(`users`)
      .doc(user.uid)
      .collection("rss")
      .doc(id)

    newSubscription.set({
      title,
      url,
      feed: rss,
      id,
      created: Date.now(),
      image,
      description,
    })
    setAddedToRssFeed(true)

    if (pathname.includes("profile")) {
      const latestLinks = db
        .collection(`users`)
        .doc(user.uid)
        .collection("latest")

      latestLinks.doc(id).set({ isRssSubscribed: true }, { merge: true })
    }

    if (pathname.includes("favorites")) {
      const favoriteLinks = db
        .collection(`users`)
        .doc(user.uid)
        .collection("favorites")

      favoriteLinks.doc(id).set({ isRssSubscribed: true }, { merge: true })
    }

    setTimeout(() => setAddedToRssFeed(false), 1500)
  }

  // Remove links
  const handleDelete = (id: string) => {
    scale.set(0)
    if (pathname.includes("profile")) {
      setTimeout(() => {
        const newData = latest.filter((item) => item.id !== id)
        const latestLinks = db
          .collection(`users`)
          .doc(user.uid)
          .collection("latest")

        latestLinks.doc(id).delete()

        setLatest(newData)
      }, 200)
    }

    if (pathname.includes("favorites")) {
      setTimeout(() => {
        const newData = favorites.filter((item) => item.id !== id)
        const favoriteLinks = db
          .collection(`users`)
          .doc(user.uid)
          .collection("favorites")

        favoriteLinks.doc(id).delete()

        setFavorites(newData)
      }, 200)
    }
  }

  // Like page
  const handleLike = (link: Link) => {
    const created = Date.now()
    const newLink = { ...link, created }
    setFavorites([...favorites, newLink])
    setFavorited(true)
    const favoritesLinks = db
      .collection("users")
      .doc(user.uid)
      .collection("favorites")
      .doc(link.id)

    favoritesLinks.set(newLink)

    setTimeout(() => handleDelete(link.id), 700)
  }

  const ogImage = (image: string, url: string) => {
    if (image.match(/\.(jpg|gif|png)$/) === null) {
      return `https://i0.wp.com/www.littlebitesofbeauty.com/wp-content/uploads/2015/06/default-placeholder.png`
    }
    if (!image.startsWith("http")) {
      return `https://images.weserv.nl/?url=${encodeURI(
        `${url}/${image}`
      )}&w=550`
    }

    return `https://images.weserv.nl/?url=${encodeURI(image)}&w=550`
  }

  return (
    <motion.div
      animate
      variants={itemVariants}
      transition={{ type: "spring", damping: 15 }}
    >
      <LinksCardItem
        key={link.url}
        style={{ scale }}
        transition={{ type: "tween", duration: 0.18 }}
      >
        <ImageContainer
          drag="y"
          dragConstraints={{ left: 0, bottom: 50, top: 0 }}
          dragElastic={0.1}
          dragMomentum={true}
          title="Drag down image to access Move & Remove functions :)"
          style={{ y }}
          onClick={() => y.set(0)}
        >
          <img
            draggable="false"
            src={
              link.image
                ? ogImage(link.image, link.url)
                : `https://i0.wp.com/www.littlebitesofbeauty.com/wp-content/uploads/2015/06/default-placeholder.png`
            }
            alt={link.title}
          />
          {favorited && (
            <FavLinksBg>
              <FavLinksAdded
                initial={{ x: "-50%", y: "-50%" }}
                animate={{ scale: [0.9, 1.1, 1] }}
                transition={{ type: "spring", damping: 8 }}
              >
                Link added to favorites
              </FavLinksAdded>
            </FavLinksBg>
          )}
          {addedToRssFeed && (
            <FavLinksBg>
              <RssAdded
                initial={{ x: "-50%", y: "-50%" }}
                animate={{ scale: [0.9, 1.1, 1] }}
                transition={{ type: "spring", damping: 8 }}
              >
                Added to RSS feed collection
              </RssAdded>
            </FavLinksBg>
          )}
          <UrlAddr>{spliceUrl(maxLengthUrl(link.url))}</UrlAddr>
          <AnimatePresence>
            {showNote && (
              <NoteDisplay
                initial={{ y: "-100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-105%" }}
                transition={{ type: "spring", damping: 13 }}
              >
                <h4>Notes</h4>
                <span>{link.note}</span>
              </NoteDisplay>
            )}
          </AnimatePresence>
          {link.rss && (
            <RssIcon
              title="Subscribe to RSS feed"
              showheart={showheart}
              subscribed={link.isRssSubscribed}
              onClick={() =>
                subscribeToRssFeed(
                  link.rss,
                  link.id,
                  link.title,
                  link.url,
                  link.image,
                  link.description
                )
              }
            />
          )}
          {showheart && (
            <FaHeartWrapper
              title="Add to favorites"
              onClick={() => {
                handleLike(link)
              }}
            />
          )}
        </ImageContainer>
        {/* <PullCard></PullCard> */}
        <div
          style={{
            padding: "1.5rem 1.5rem ",
          }}
        >
          <a href={`${link.url}`} target="_blank" rel="noopener noreferrer">
            <Title data-tip="Click to open">{maxLength(link.title)}</Title>
          </a>
          <ReactTooltip
            backgroundColor="#5856d7"
            border={true}
            borderColor="#615de0"
            delayShow={1000}
            delayUpdate={0}
          />
        </div>
        {link.note && (
          <FaStickyNoteWrapper
            title="Show note"
            onClick={() => setShowNote((prevState) => !prevState)}
          />
        )}
        <FacebookShareButton
          style={{
            position: "absolute",
            top: 10,
            left: 10,
            zIndex: 0,
          }}
          url={link.url}
        >
          <FacebookIcon size={26} round={true} />
        </FacebookShareButton>
        <TwitterShareButton
          style={{
            position: "absolute",
            top: 10,
            left: 42,
            zIndex: 0,
          }}
          url={link.url}
        >
          <TwitterIcon size={26} round={true} />
        </TwitterShareButton>
        <EmailShareButton
          style={{
            position: "absolute",
            top: 10,
            left: 74,
            zIndex: 0,
          }}
          url={link.url}
        >
          <EmailIcon size={26} round={true} />
        </EmailShareButton>
        <ShareButton
          copied={copied ? true : false}
          style={{ position: "absolute", top: 10, right: 80, zIndex: 0 }}
          onClick={() => copyToClipboard(link.url)}
        >
          {copied ? `Link copied` : `Copy link`}
        </ShareButton>
        <RemoveButton
          style={{ position: "absolute", top: 10, right: 10, zIndex: 0 }}
          onClick={() => handleDelete(link.id)}
        >
          Remove
        </RemoveButton>
      </LinksCardItem>
    </motion.div>
  )
}

export default Card

// Styles
const LinksCardItem = styled(motion.div)`
  min-width: 300px;
  height: 250px;
  background: ${(props) => props.theme.cardBackground};
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  transition: all 300ms ease-in-out;
  position: relative;
  user-select: none;
  -moz-user-select: none;
  border-bottom: 5px solid ${(props) => props.theme.cardBorderBottom};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    border-radius: 10px;
  }
`

const Title = styled.h2`
  margin: 0;
  word-wrap: break-word;
  font-size: 1.8rem;
  color: ${(props) => props.theme.cardTitle};
  transition: all 300ms ease-in-out;
`

const RemoveButton = styled.button`
  position: absolute;
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

const ShareButton = styled(RemoveButton)`
  background: ${(props: { copied: boolean }) =>
    props.copied ? "#00C29F" : "#4b36dc"};
  outline: none;
`

const ImageContainer = styled(motion.div)`
  background: #fff;
  position: relative;
  height: 150px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  border-radius: 10px;
  z-index: 201;
  cursor: grab;
`

const UrlAddr = styled.p`
  position: absolute;
  max-width: 240px;
  bottom: 0px;
  left: 0px;
  margin: 0;
  background: #0a0a0a;
  color: #f4f4f4;
  padding: 5px 10px;
  transform: translate3d(0, 0, 0);
  transition: transform 100ms ease-in;
  border-top-right-radius: 5px;
  font-size: 1.2rem;
  z-index: 400;
  font-weight: 600;
  box-shadow: 0 -4px 10px rgba(0, 0, 0, 0.15);

  ${Title}:hover & {
    transform: translate3d(0, 0, 0);
  }
`

const FaHeartWrapper = styled(FaHeart)`
  position: absolute;
  right: 10px;
  bottom: 10px;
  font-size: 3rem;
  color: white;
  background: black;
  padding: 6px;
  border-radius: 50%;
  cursor: pointer;
  transition: color 100ms ease-in;
  z-index: 100;
  border-radius: 50%;
  box-shadow: 0px 0px 5px 5px rgba(0, 0, 0, 0.05);
  overflow: visible;

  &:hover {
    color: crimson;
  }
`

const FavLinksAdded = styled(motion.span)`
  display: inline-block;
  border: 1px solid crimson;
  background: #111;
  padding: 10px;
  font-size: 1.4rem;
  position: absolute;
  width: 60%;
  font-weight: 600;
  text-align: center;
  left: 50%;
  top: 50%;
  border-radius: 5px;
  color: crimson;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  z-index: 9000;
`

const RssAdded = styled(FavLinksAdded)`
  border: 1px solid #00c29f;
  color: #00c29f;
`

const FavLinksBg = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.75);
  z-index: 8999;
`

const FaStickyNoteWrapper = styled(FaStickyNote)`
  position: absolute;
  bottom: 7px;
  right: 10px;
  font-size: 2.6rem;
  color: var(--secondaryColor);
  padding: 4px;
  z-index: 10;
  cursor: pointer;
  transition: 150ms;

  &:hover {
    transform: rotate(3deg);
  }
`

const NoteDisplay = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 2000;
  background: #ffc357;
  padding: 1.8rem 2rem;
  border-radius: 10px;

  span {
    z-index: 200;
    color: #333;
    font-size: 1.4rem;
  }

  h4 {
    margin-top: 0;
    margin-bottom: 0.8rem;
    text-decoration: underline;
  }
`

const PullCard = styled.div`
  position: absolute;
  top: -10px;
  background: ${(props) => props.theme.cardTopDiv};
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  width: 100%;
  z-index: -1;
  height: 25px;
  transition: all 300ms ease-in-out;
`

const RssIcon = styled(FaRss)`
  position: absolute;
  right: ${(props: StyledProps) => (props.showheart ? "45px" : "10px")};
  bottom: 10px;
  font-size: 3rem;
  background: black;
  color: ${(props: StyledProps) => (props.subscribed ? "#00c29f" : " #f4f4f4")};
  padding: 6px;
  border-radius: 50%;
  cursor: pointer;
  transition: color 100ms ease-in;
  z-index: 100;
  border-radius: 50%;
  box-shadow: 0px 0px 5px 5px rgba(0, 0, 0, 0.05);
  pointer-events: ${(props: StyledProps) =>
    props.subscribed ? "none" : "all"};

  &:hover {
    color: var(--secondaryColor);
  }
`
