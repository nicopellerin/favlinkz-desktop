import * as React from "react"
import styled from "styled-components"
import { motion } from "framer-motion"

import userImg from "../../assets/nico.jpg"

const userVariants = {
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

const User = () => {
  return (
    <Wrapper
      variants={userVariants}
      initial="hidden"
      animate="show"
      exit="exit"
    >
      <Container>
        <UserImage src={userImg} alt="avatar" />
        <Name>Nico Pellerin</Name>
        <Email>hello@nicopellerin.io</Email>
        <DeleteAccount>Delete account</DeleteAccount>
      </Container>
    </Wrapper>
  )
}

export default User

// Styles
const Wrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100% - 75px);
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
  /* box-shadow: 0 12px 11px -11px rgba(0, 0, 0, 0.1); */
`

const Name = styled.h3`
  color: ${(props) => props.theme.username};
  font-size: 3.2rem;
  margin-bottom: 2rem;
`

const Email = styled.h5`
  color: #112;
  font-size: 1.6rem;
  font-weight: 500;
`

const DeleteAccount = styled.span`
  color: red;
  font-size: 1.4rem;
  font-weight: 500;
`
