import * as React from "react"
import styled from "styled-components"
import { motion } from "framer-motion"
import { useRecoilValue } from "recoil"

import Card from "../Card"

import dots from "../../assets/dots.svg"

import { searchResultsState } from "../Navbar/SearchBar"

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
}

const Favorites = () => {
  const results = useRecoilValue(searchResultsState)

  return (
    <motion.div
      style={{
        display: "flex",
        alignItems: "center",
        // justifyContent: "center",
        flexDirection: "column",
        marginTop: "4rem",
        height: "100%",
      }}
    >
      <DotsWrapper>
        <Dots src={dots} alt="dots" />
      </DotsWrapper>
      {results.length > 0 ? (
        <CardList
          variants={favoritesVariants}
          initial="hidden"
          animate="show"
          exit="exit"
        >
          {results.map(({ url, title, image }: Results) => (
            <Card
              key={url}
              link={{
                url,
                title,
                image,
              }}
              showHeart={false}
              category="latest"
              user={null}
              likeAdded={null}
            />
          ))}
        </CardList>
      ) : (
        <NoMatchingResults>
          <h2>Found no matching results</h2>
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

const Title = styled.h3`
  margin: 0;
  font-size: 1.8rem;
  color: #484554;
  font-weight: 600;
  margin-right: 2rem;
`

const Dots = styled.img`
  margin: 1.5rem 0 3rem;
  text-align: center;
`

const NoMatchingResults = styled.div`
  height: calc(100% - 300px);
  display: flex;
  justify-content: center;
  align-items: center;
`
