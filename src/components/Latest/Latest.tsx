import * as React from "react"
import styled from "styled-components"

import Card from "../Card"

const Latest = () => {
  return (
    <>
      <Title>Latest &mdash;</Title>
      <CardList>
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
    </>
  )
}

export default Latest

// Styles
const CardList = styled.div`
  padding: 4rem 6rem;
  display: grid;
  grid-template-columns: repeat(3, minmax(300px, 400px));
  grid-gap: 4rem;
  /* max-width: 90%; */
  max-height: 80rem;
  overflow: auto;
  margin: 0 auto;
`

const Title = styled.h3`
  margin: 0;
  padding-left: 6rem;
  color: var(--primaryColor);
`
