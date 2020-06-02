import * as React from "react"
import { useEffect } from "react"
import styled from "styled-components"
import { motion } from "framer-motion"
import { useRecoilValue, useRecoilState } from "recoil"

import Card from "../Card"

import {
  searchTextState,
  searchResultsState,
  locationState,
} from "../../state/searchbar"
import { favoritesState } from "../../state/favorites"

import { db } from "../../services/firebase"

import { userState } from "../../state/user"

import dots from "../../assets/dots.svg"

const favoritesVariants = {
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

const Favorites = () => {
  const results = useRecoilValue(searchResultsState)
  const [favorites, setFavorites] = useRecoilState(favoritesState)
  const user = useRecoilValue(userState)
  const [searchText] = useRecoilState(searchTextState)
  const [location, setLocation] = useRecoilState(locationState)

  useEffect(() => {
    setLocation("favorites")
  }, [])

  useEffect(() => {
    if (user.uid) {
      const latestLinks = db
        .collection(`users`)
        .doc(user.uid)
        .collection("favorites")
      // .orderBy("created", "desc")

      latestLinks.onSnapshot((links) => {
        const docs: any = []
        links.docs.forEach((link) => {
          const newLinks = { ...link.data() }
          docs.push(newLinks)
        })
        setFavorites(docs)
      })
    }
  }, [user])

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
          variants={favoritesVariants}
          initial="hidden"
          animate="show"
          exit="exit"
        >
          {results.map(({ url, title, image, note, id }: Results) => (
            <Card
              key={url}
              link={{
                url,
                title,
                image,
                note,
                id,
              }}
              showHeart={false}
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
          <h2>No favorite links added</h2>
        </NoMatchingResults>
      )}
    </motion.div>
  )
}

export default Favorites

// Styles
const CardList = styled(motion.div)`
  padding: 3rem 6rem;
  display: grid;
  grid-template-columns: repeat(3, minmax(300px, 350px));
  grid-gap: 4rem;
  max-width: 100%;
  max-height: 80rem;
  overflow: auto;
  margin: 0 auto;
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
