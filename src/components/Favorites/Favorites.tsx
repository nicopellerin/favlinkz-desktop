import * as React from "react"
import styled from "styled-components"
import { motion } from "framer-motion"

import Card from "../Card"

import dots from "../../assets/dots.svg"

const journalVariants = {
  hidden: {
    x: -10,
  },
  show: {
    x: 0,
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

const Favorites = () => {
  return (
    <motion.div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      {/* <Title>Favorites</Title> */}
      <DotsWrapper>
        <Dots src={dots} alt="dots" />
      </DotsWrapper>
      <CardList
        variants={journalVariants}
        initial="hidden"
        animate="show"
        exit="exit"
      >
        <Card
          link={{
            url: "https://functionsnstuff.io",
            title:
              "functionsnstuff | Tutorials & tips for React, Go, Node.js, Gatsby and more!",
            image: "https://functionsnstuff.io/og-image1.png",
          }}
          showHeart={true}
          category="latest"
          user={null}
          likeAdded={null}
        />
        <Card
          link={{
            url: "https://nicopellerin.io",
            title: "Nico Pellerin",
            image: "https://nicopellerin.io/og-image1.png",
          }}
          showHeart={true}
          category="latest"
          user={null}
          likeAdded={null}
        />
        <Card
          link={{
            url: "https://monjournaldebord.ca",
            title: "monjournaldebord",
            image: "https://monjournaldebord.ca/og-image-5.png",
          }}
          showHeart={true}
          category="latest"
          user={null}
          likeAdded={null}
        />
        <Card
          link={{
            url: "https://virtualcanvas.app",
            title: "Virtual Canvas | Bring your art to life",
            image: "https://virtualcanvas.app/og4.png",
          }}
          showHeart={true}
          category="latest"
          user={null}
          likeAdded={null}
        />
      </CardList>
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

const Title = styled.h3`
  margin: 0;
  font-size: 2.2rem;
  color: #333;
`

const DotsWrapper = styled.div`
  display: flex;
  justify-content: center;
`

const Dots = styled.img`
  margin: 1.5rem 0 1.5rem;
  text-align: center;
`
