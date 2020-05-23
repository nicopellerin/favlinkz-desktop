import * as React from "react"
import { useState } from "react"
import styled from "styled-components"
import { FaGoogle } from "react-icons/fa"
import { motion } from "framer-motion"

import { firebase } from "../../services/firebase"

import Logo from "../../assets/favlinkz-white.svg"
// import BG from "../../assets/bg.png";

const Login = () => {
  const [authError, setAuthError] = useState({ message: "" })

  const handleSignIn: () => void = async () => {
    const provider = new firebase.auth.GoogleAuthProvider()

    try {
      await firebase.auth().signInWithPopup(provider)
    } catch (err) {
      setAuthError(err)
    }
  }

  return (
    <Wrapper
    // style={{ background: `url(${BG})` }}
    >
      <Container animate={{ y: [10, 0] }}>
        <InsideContainer>
          <LogoStyled animate={{ y: [20, 0] }} src={Logo} alt="logo" />
          <LoginWrapper animate={{ y: [40, 0] }}>
            <LoginButton onClick={() => handleSignIn()}>
              <FaGoogle style={{ marginRight: 5 }} />
              Sign-in with Google
            </LoginButton>
          </LoginWrapper>
          {authError.message && authError.message}
        </InsideContainer>
      </Container>
    </Wrapper>
  )
}

export default Login

// Styles
const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-size: 100%;
`

const Container = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 40rem;
  width: 40rem;
  background: rgba(255, 255, 255, 0.005);
  border-radius: 10px;
  /* box-shadow: 0 0 20px rgba(0, 0, 0, 0.05); */
`

const InsideContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-bottom-left-radius: 100px;
  border-bottom-right-radius: 100px;
  height: 80%;
  width: 100%;
  box-shadow: 0 62px 31px -31px rgba(0, 0, 0, 0.1);
  background: var(--primaryColor);
`

const LogoStyled = styled(motion.img)`
  width: 25rem;
  margin-bottom: 3rem;
`

const LoginWrapper = styled(motion.div)`
  background: var(--darkBlue);
  padding: 2rem 2rem;
  border-radius: 10px;
`

const LoginButton = styled(motion.button)`
  border: none;
  background: #ff5c5b;
  font-size: 1.4rem;
  color: #fafafa;
  padding: 0.9em 1.2em;
  border-radius: 5px;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  outline: none;
`
