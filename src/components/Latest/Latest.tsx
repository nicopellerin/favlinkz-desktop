import * as React from "react"
import { useEffect } from "react"
import styled from "styled-components"
import { motion } from "framer-motion"
import { useRecoilValue, useRecoilState } from "recoil"

import Card from "../Card"

import { db } from "../../services/firebase"

import { searchResultsState, searchTextState } from "../../state/searchbar"

import dots from "../../assets/dots.svg"
import { userState } from "../../state/user"

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
}

const Latest = () => {
  const results = useRecoilValue(searchResultsState)
  const user = useRecoilValue(userState)
  const [searchText] = useRecoilState(searchTextState)

  useEffect(() => {
    const userRef = db.collection(`users/${user.uid}`)

    userRef.onSnapshot((snapshot) => {
      const docs = []
      snapshot.forEach((doc): any => {
        docs.push({ ...doc.data(), id: doc.id })
      })
      console.log(docs[0].links)
    })
  }, [])

  return (
    <motion.div
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        marginTop: "4rem",
        height: "100%",
      }}
    >
      <DotsWrapper>
        <Dots src={dots} alt="dots" />
      </DotsWrapper>
      {results.length > 0 && (
        <CardList
          variants={latestVariants}
          initial="hidden"
          animate="show"
          exit="exit"
        >
          {results.map(({ url, title, image, note }: Results) => (
            <Card
              key={url}
              link={{
                url,
                title,
                image,
                note,
              }}
              showHeart={true}
              category="latest"
              user={null}
              likeAdded={null}
            />
          ))}
        </CardList>
      )}
      {results.length < 1 && searchText.length > 1 && (
        <NoMatchingResults animate={{ y: [10, 0], opacity: [0, 1] }}>
          <h2>Found no matching results</h2>
        </NoMatchingResults>
      )}
      {results.length < 1 && searchText.length < 1 && (
        <NoMatchingResults animate={{ y: [10, 0], opacity: [0, 1] }}>
          <h2>No links added</h2>
        </NoMatchingResults>
      )}
    </motion.div>
  )
}

export default Latest

// Styles
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
`
