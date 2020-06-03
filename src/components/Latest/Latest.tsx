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

interface Results {
  url: string
  title: string
  image: string
  note: string
  id: string
}

const Latest = () => {
  const [loading, setLoading] = useState(true)

  const results = useRecoilValue(searchResultsState)
  const [latest, setLatest] = useRecoilState(latestState)
  const user = useRecoilValue(userState)
  const [searchText] = useRecoilState(searchTextState)
  const [location, setLocation] = useRecoilState(locationState)

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
          {results.map(({ url, title, image, note, id }: Results) => (
            <Card
              key={id}
              link={{
                url,
                title,
                image,
                note,
                id,
              }}
              showHeart={true}
              category="latest"
              user={null}
              likeAdded={null}
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
  padding: 3rem 6rem;
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
  margin: 1.5rem 0 3rem;
  text-align: center;
`

const NoMatchingResults = styled(motion.div)`
  height: calc(100% - 300px);
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
`
