import * as React from "react"
import { useState } from "react"
import { ipcRenderer } from "electron"
import styled from "styled-components"
import { FaGoogle } from "react-icons/fa"
import { motion, AnimatePresence, AnimateSharedLayout } from "framer-motion"
import { useHistory } from "react-router-dom"
import Lottie from "react-lottie"
import { Circle } from "better-react-spinkit"

import { firebase } from "../../services/firebase"

import Logo from "../../assets/favlinkz-white.svg"
// import BG from "../../assets/bg.png";

import successAnimation from "../../assets/success.json"

const Login = () => {
  const [authError, setAuthError] = useState({ message: "" })
  const [isSubmiting, setIsSubmiting] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const history = useHistory()

  const handleSignIn: () => void = async () => {
    setIsSubmiting(true)
    // const provider = new firebase.auth.GoogleAuthProvider()
    // try {
    //   await firebase.auth().signInWithPopup(provider)
    // } catch (err) {
    //   setAuthError(err)
    // }
    setTimeout(() => setIsSubmiting(false), 500)
    setTimeout(() => setIsLoggedIn(true), 500)
    setTimeout(() => {
      history.push("/profile")
      ipcRenderer.send("user-logged-in")
    }, 1750)
  }

  const connexionOptions = {
    loop: false,
    autoplay: true,
    animationData: successAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  }

  return (
    <Wrapper
    // style={{ background: `url(${BG})` }}
    >
      <Container animate={{ y: [10, 0] }}>
        <InsideContainer>
          <AnimateSharedLayout>
            <LogoStyled
              layoutId="logo"
              animate={{ y: [20, 0] }}
              src={Logo}
              alt="logo"
            />
            <LoginWrapper animate={{ y: [40, 0] }}>
              <AnimatePresence>
                {isLoggedIn ? (
                  <motion.div animate={{ scale: [0.2, 1.5, 1] }}>
                    <Lottie
                      options={connexionOptions}
                      height={100}
                      width={100}
                      isStopped={!isLoggedIn}
                    />
                    {/* <LoggedInText>Successfully logged in!</LoggedInText> */}
                  </motion.div>
                ) : (
                  <LoginButton
                    whileHover={{ y: 1 }}
                    whileTap={{ y: -1 }}
                    onClick={() => handleSignIn()}
                  >
                    {isSubmiting ? (
                      <Circle color="white" />
                    ) : (
                      <>
                        <FaGoogle style={{ marginRight: 5 }} />
                        Sign-in with Google
                      </>
                    )}
                  </LoginButton>
                )}
              </AnimatePresence>
            </LoginWrapper>
            {authError.message && <ErrorMsg>{authError.message}</ErrorMsg>}
          </AnimateSharedLayout>
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
  position: relative;
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
  justify-content: center;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  outline: none;
  width: 185px;
  height: 45px;
`

const ErrorMsg = styled(motion.span)`
  position: absolute;
  bottom: -30px;
  font-size: 1.4rem;
  max-width: 75%;
  margin: 0 auto;
  text-align: center;
`

const LoggedInText = styled.h3`
  font-size: 2rem;
  margin: 0;
`
