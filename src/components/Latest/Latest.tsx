import * as React from "react"
import { useEffect, useState } from "react"
import styled from "styled-components"
import { motion } from "framer-motion"
import { useRecoilValue, useRecoilState } from "recoil"
import Spinner from "react-spinkit"

import Card from "../Card"

import {
  searchResultsState,
  searchTextState,
  locationState,
} from "../../state/searchbar"

import { userState } from "../../state/user"
import { latestState } from "../../state/latest"
import { soundNotifsOnState } from "../../state/notifications"

import { Link } from "../../models/link"

import { db } from "../../services/firebase"

import dots from "../../assets/dots.svg"

const latestVariants = {
  hidden: {
    y: 10,
  },
  show: {
    y: 0,
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

interface StyledProps {
  disabled: boolean
}

const Latest = () => {
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)

  const results = useRecoilValue(searchResultsState)
  const [searchText] = useRecoilState(searchTextState)
  const [latest, setLatest] = useRecoilState(latestState)
  const [location, setLocation] = useRecoilState(locationState)

  const user = useRecoilValue(userState)
  const soundNotifsOn = useRecoilValue(soundNotifsOnState)

  let totalPages = Math.ceil(latest.length / 6)

  const prevPage = (page: number) => {
    page - 1 > 0 ? setPage((prevState) => prevState - 1) : null
  }

  const nextPage = (page: number) => {
    page + 1 <= totalPages ? setPage((prevState) => prevState + 1) : null
  }

  useEffect(() => {
    setLocation("profile")
  }, [])

  useEffect(() => {
    if (user.uid) {
      const latestLinks = db
        .collection(`users`)
        .doc(user.uid)
        .collection("latest")
        .orderBy("created", "desc")
      // .limit(itemsPerPage)

      latestLinks.onSnapshot((links) => {
        if (links.size) {
          const docs: any = []
          links.docs.forEach((link) => {
            const newLinks = { ...link.data() }
            docs.push(newLinks)
            setLoading(false)
          })
          setLatest(docs)
        } else {
          setLoading(false)
        }
      })
    }
  }, [user])

  const swoosh = new Audio(
    "https://raw.github.com/nicopellerin/favlinkz-desktop/master/sounds/tap-hollow.mp3"
  )

  const errorSound = new Audio(
    "https://raw.github.com/nicopellerin/favlinkz-desktop/master/sounds/error-smooth.mp3"
  )

  const isSubscribed = (id: string) => {
    if (JSON.parse(localStorage.getItem("feeds")!)) {
      return JSON.parse(localStorage.getItem("feeds")!)[id]
    }
    return false
  }

  if (loading) {
    return (
      <NoMatchingResults>
        <Spinner name="ball-pulse-rise" color="#ff5c5b" fadeIn="full" />
      </NoMatchingResults>
    )
  }

  return (
    <Wrapper>
      <DotsWrapper>
        <Dots src={dots} alt="dots" draggable="false" />
      </DotsWrapper>
      {results?.length > 0 && (
        <CardList
          variants={latestVariants}
          initial="hidden"
          animate="show"
          exit="exit"
        >
          {results
            .slice((page - 1) * 6, (page - 1) * 6 + 6)
            .map((link: Link) => (
              <Card
                key={link.id}
                link={link}
                showheart={true}
                isSubscribed={isSubscribed(link.id)}
              />
            ))}
        </CardList>
      )}
      {results?.length < 1 && searchText?.length > 1 && (
        <NoMatchingResults animate={{ y: [10, 0], opacity: [0, 1] }}>
          <h2>Found no matching results</h2>
        </NoMatchingResults>
      )}
      {results?.length < 1 && searchText?.length < 1 && (
        <NoMatchingResults animate={{ y: [10, 0], opacity: [0, 1] }}>
          <h2>No latest links added</h2>
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
          disabled={page + 1 > totalPages || results?.length <= 6}
          onClick={() => {
            nextPage(page)
            if (
              (soundNotifsOn && page + 1 > totalPages) ||
              results?.length <= 6
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
                page + 1 > totalPages || results?.length <= 6
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

export default Latest

// Styles
const Wrapper = styled(motion.div)`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 4rem;
  height: 100%;
`

const CardList = styled(motion.div)`
  padding: 0.5rem 6rem 3rem 6rem;
  display: grid;
  grid-template-columns: repeat(3, minmax(300px, 350px));
  grid-gap: 4rem;
  max-height: 80rem;
  overflow: auto;
`

const DotsWrapper = styled.div`
  display: flex;
  justify-content: center;
  user-select: none;
`

const Dots = styled.img`
  margin: 0rem 0 5rem;
  text-align: center;
`

const NoMatchingResults = styled(motion.div)`
  height: calc(100% - 300px);
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
`

const PaginateControls = styled(motion.div)`
  display: flex;
  position: fixed;
  bottom: 4rem;
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
