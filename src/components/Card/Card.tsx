import React, { useState } from "react"
import { FaHeart, FaStickyNote } from "react-icons/fa"
import styled from "styled-components"
import {
  motion,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion"
import { useRecoilState } from "recoil"
import { useLocation } from "react-router-dom"

// import useCategoryData from "../hooks/useCategoryData"

import { mockDataState } from "../../state/latest"
import { favoritesState } from "../../state/favorites"

import { maxLength, maxLengthUrl, spliceUrl, removeSpace } from "../../utils"

// import { db } from "../../services/firebase"

interface Link {
  url: string
  title: string
  image: string
  note: string
}

interface Props {
  link: Link
  showHeart: boolean
  likeAdded: number | null
  user: any
  category: any
}

const Card = ({ link, showHeart, user }: Props) => {
  const { pathname } = useLocation()

  const [showNote, setShowNote] = useState(false)
  const [favorited, setFavorited] = useState(false)

  const [mockData, setMockData] = useRecoilState(mockDataState)
  const [favoritesData, setFavoritesData] = useRecoilState(favoritesState)

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

  // Remove links
  const handleDelete = (url: string) => {
    scale.set(0)
    if (pathname.includes("profile")) {
      setTimeout(() => {
        const newData = mockData.filter((item) => item.url !== url)
        setMockData(newData)
      }, 200)
    }

    if (pathname.includes("favorites")) {
      setTimeout(() => {
        const newData = favoritesData.filter((item) => item.url !== url)
        setFavoritesData(newData)
      }, 200)
    }
    // const newLinks = selectedCategory.filter((link: { url: string }) => {
    //   y.set(0)
    //   return link.url !== url
    // })
    // // setSelectedCategory(newLinks)
    // const categoryRef = db
    //   .collection(`users/${user.uid}/categories/`)
    //   .doc(`${removeSpace(locationPath)}`)
    // categoryRef.get().then(() => {
    //   categoryRef.update({ links: newLinks })
    // })
  }

  // Like page
  const handleLike = (link) => {
    setFavoritesData([...favoritesData, link])
    setFavorited(true)
    setTimeout(() => handleDelete(link.url), 700)
    // setFavorited(true)
    // setTimeout(() => setFavorited(false), 500)
    // const categoryRef = db
    //   .collection(`users/${user.uid}/categories/`)
    //   .doc(`favorites`)
    // categoryRef.get().then(doc => {
    //   const previousLikes = doc.data().links || []
    //   const updatedLikes = [...previousLikes, link]
    //   handleDelete(link.url)
    //   categoryRef.update({ links: updatedLikes })
    // })
    // .then(() => setTimeout(() => , 1500))
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
                ? link.image
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
          <UrlAddr>{spliceUrl(maxLengthUrl(link.url))}</UrlAddr>
          <AnimatePresence>
            {showNote && (
              <NoteDisplay
                initial={{ y: "-100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-105%" }}
                transition={{ type: "spring", damping: 12 }}
              >
                <h4>Notes</h4>
                <span>{link.note}</span>
              </NoteDisplay>
            )}
          </AnimatePresence>
          {showHeart && (
            <FaHeartWrapper
              onClick={() => {
                handleLike(link)
              }}
            />
          )}
        </ImageContainer>
        <PullCard></PullCard>
        <div
          style={{
            padding: "1.5rem 1.5rem ",
          }}
        >
          <a href={`${link.url}`} target="_blank" rel="noopener noreferrer">
            <Title>{maxLength(link.title)}</Title>
          </a>
        </div>
        {link.note && (
          <FaStickyNoteWrapper
            title="Show note"
            onClick={() => setShowNote((prevState) => !prevState)}
          />
        )}
        <ShareButton
          style={{ position: "absolute", top: 10, right: 80, zIndex: 0 }}
          onClick={() => alert(link.url)}
        >
          Share
        </ShareButton>
        <RemoveButton
          style={{ position: "absolute", top: 10, right: 10, zIndex: 0 }}
          onClick={() => handleDelete(link.url)}
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
`

const ShareButton = styled(RemoveButton)`
  background: #4b36dc;
`

const ImageContainer = styled(motion.div)`
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
  height: 15px;
  transition: all 300ms ease-in-out;
`
