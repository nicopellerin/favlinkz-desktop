import * as React from "react"
import styled from "styled-components"
import { motion } from "framer-motion"

const userVariants = {
  hidden: {
    y: -40,
  },
  show: {
    y: -50,
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

const Saved = () => {
  return (
    <Wrapper
      variants={userVariants}
      initial="hidden"
      animate="show"
      exit="exit"
    >
      <h2>{"Soonz :)"}</h2>
    </Wrapper>
  )
}

export default Saved

// Styles
const Wrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100% - 100px);
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`

const UserImage = styled.img`
  width: 100px;
  margin-bottom: 2rem;
  border-radius: 50%;
`

const Name = styled.h3`
  color: ${(props) => props.theme.username};
  font-size: 3.2rem;
  margin-bottom: 2rem;
  user-select: none;
`

const Email = styled.h5`
  color: var(--primaryColor);
  font-size: 1.6rem;
  font-weight: 500;
  user-select: none;
`

const TotalLinks = styled.h3`
  font-size: 2rem;
  color: var(--secondaryColor);
  user-select: none;
`

const DeleteAccount = styled(motion.span)`
  position: fixed;
  bottom: 5rem;
  opacity: 0;
  color: #999;
  font-size: 1.4rem;
  font-weight: 500;
  user-select: none;
`
