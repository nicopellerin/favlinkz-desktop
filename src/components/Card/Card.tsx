import React, { useState } from "react"
import { FaHeart, FaStickyNote } from "react-icons/fa"
import styled from "styled-components"
import { motion, useMotionValue } from "framer-motion"

// import useCategoryData from "../hooks/useCategoryData"

import { maxLength, maxLengthUrl, spliceUrl, removeSpace } from "../../utils"

import { db } from "../../services/firebase"

interface Props {
  link: any
  showHeart: boolean
  likeAdded: number | null
  user: any
  category: any
}

const Card = ({ link, category, showHeart, user }: Props) => {
  const [showNote, setShowNote] = useState<boolean>(false)
  const [favorited, setFavorited] = useState<boolean>(false)
  const [onFocus, setOnFocus] = useState(false)

  const y = useMotionValue(0)

  // Get all Catgeroies data
  // const [categoryList] = useCategoryData()

  // Animations
  // const noteDisplayTransition = useTransition(showNote, null, {
  //   from: { transform: `translate3d(0, -100px, 0)` },
  //   enter: { transform: `translate3d(0, 0, 0)` },
  //   leave: { transform: `translate3d(0, -200px, 0)` },
  //   config: config.gentle,
  // })

  const handleNoteDisplay: () => void = () => {
    setShowNote((prevState) => !prevState)
  }

  // Handles move to selected category
  function handleMoveCategory(e) {
    // const selectedCategory = e.target.value
    // if (selectedCategory !== "default") {
    //   const categoryRef = db
    //     .collection(`users/${user.uid}/categories/`)
    //     .doc(`${selectedCategory}`)
    //   categoryRef
    //     .get()
    //     .then((doc) => {
    //       const previousLinks = doc.data().links || []
    //       const updatedLinks = [...previousLinks, link]
    //       categoryRef.update({ links: updatedLinks })
    //       console.log(link)
    //     })
    //     .then(() => handleDelete(link.url))
    // }
  }

  // Remove links
  const handleDelete = (url: string) => {
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
  const handleLike = (link: { url: string }) => {
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

  return (
    <motion.div variants={itemVariants}>
      <LinksCardItem key={link.url}>
        <ImageContainer
          drag="y"
          dragConstraints={{ left: 0, bottom: 50, top: 0 }}
          dragElastic={0.2}
          dragMomentum={true}
          dragTransition={{ bounceStiffness: 600, bounceDamping: 40 }}
          title="Drag down image to access Move & Remove functions :)"
          style={{ y }}
          onClick={() => y.set(0)}
          // onPanStart={isMobile ? () => setOnFocus(true) : null}
          // onPanEnd={isMobile ? () => setOnFocus(false) : null}
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
              <FavLinksAdded>Link added to favorites</FavLinksAdded>
            </FavLinksBg>
          )}

          <UrlAddr>{spliceUrl(maxLengthUrl(link.url))}</UrlAddr>

          {/* {noteDisplayTransition.map(
            ({ item, props: ani, key }) =>
              item && (
                <NoteDisplay style={ani} key={key}>
                  <h4>Notes</h4>
                  <span>{link.note}</span>
                </NoteDisplay>
              )
          )} */}
          {showHeart && (
            <FaHeartWrapper
              onClick={() => {
                handleLike(link)
              }}
            />
          )}
        </ImageContainer>
        {/* <PullCard>
          <h4>Pull</h4>
        </PullCard> */}
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
          <FaStickyNoteWrapper onClick={() => handleNoteDisplay()} />
        )}
        {/* <CategorySelect onChange={handleMoveCategory}>
          <option value={"default"}>Move link to...</option>
          {categoryList.slice(2, categoryList.length).map((cat) => {
            if (cat.title.toLowerCase() === category.toLowerCase()) return
            return (
              <option key={cat.id} value={cat.id}>
                {cat.title}
              </option>
            )
          })}
        </CategorySelect> */}
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
const LinksCardItem = styled.div`
  min-width: 300px;
  height: 250px;
  background: ${(props) => props.theme.cardBackground};
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  transition: all 300ms ease-in-out;
  position: relative;
  user-select: none;
  -moz-user-select: none;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    display: block;
  }
`

const Title = styled.h2`
  margin: 0;
  word-wrap: break-word;
  font-size: 2rem;
  color: ${(props) => props.theme.cardTitle};
  transition: all 300ms ease-in-out;
`

const CategorySelect = styled.select`
  position: absolute;
  top: 8px;
  left: 10px;
  width: 50%;
  height: 30px;
  background: white;
  color: #333;
  padding-left: 5px;
  font-size: 14px;
  border: none;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);

  option {
    color: black;
    background: white;
    font-weight: small;
    display: flex;
    white-space: pre;
    min-height: 20px;
    padding: 0px 2px 1px;
  }
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
  /* background-color: rgba(255, 255, 255, 0.13); */
  border-radius: 50%;
  box-shadow: 0px 0px 5px 5px rgba(0, 0, 0, 0.05);
  overflow: visible;

  &:hover {
    color: crimson;
  }
`

const FavLinksAdded = styled.span`
  display: inline-block;
  border: 1px solid crimson;
  background: #111;
  padding: 10px;
  position: absolute;
  width: 60%;
  font-weight: 600;
  text-align: center;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
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
  font-size: 1.8rem;
  color: orangered;
  padding: 4px;
  z-index: 10;
  cursor: pointer;
`

const NoteDisplay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 2000;
  background: #faca0c;
  padding: 1rem;

  span {
    z-index: 200;
    color: #333;
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
  background: lightgray;
  border-radius: 15px;
  width: 100%;
  z-index: -1;

  h4 {
    color: lightgray;
  }
`
