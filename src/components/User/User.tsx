import * as React from "react"
import styled from "styled-components"
import { motion } from "framer-motion"
import { useRecoilValue } from "recoil"

import { userState } from "../../state/user"
import { favoritesState } from "../../state/favorites"
import { latestState } from "../../state/latest"

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
  const { displayName, photoUrl, email } = useRecoilValue(userState)
  const latest = useRecoilValue(latestState)
  const favorites = useRecoilValue(favoritesState)

  const totalLinks = [...latest, ...favorites]

  return (
    <Wrapper
      variants={userVariants}
      initial="hidden"
      animate="show"
      exit="exit"
    >
      <Container>
        <UserImage src={photoUrl} alt="avatar" />
        <Name>{displayName}</Name>
        <Email>{email}</Email>
        <TotalLinks>Total links: {totalLinks.length}</TotalLinks>
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
`

const Name = styled.h3`
  color: ${(props) => props.theme.username};
  font-size: 3.2rem;
  margin-bottom: 2rem;
`

const Email = styled.h5`
  color: var(--primaryColor);
  font-size: 1.6rem;
  font-weight: 500;
`

const TotalLinks = styled.h3`
  font-size: 2rem;
  color: var(--secondaryColor);
`

const DeleteAccount = styled.span`
  position: absolute;
  bottom: 5rem;
  color: #999;
  font-size: 1.4rem;
  font-weight: 500;
`
