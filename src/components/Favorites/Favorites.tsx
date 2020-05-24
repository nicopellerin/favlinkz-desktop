import * as React from "react"
import styled from "styled-components"
import { motion } from "framer-motion"

import Card from "../Card"

const journalVariants = {
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
    scale: 0.6,
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
      <Title>Favorites</Title>
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
      </CardList>
    </motion.div>
  )
}

export default Favorites

// Styles
const CardList = styled(motion.div)`
  padding: 5rem 6rem;
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
  color: var(--primaryColor);
`
