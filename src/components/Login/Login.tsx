import * as React from "react"
import { useState } from "react"
import { ipcRenderer, remote } from "electron"
import styled from "styled-components"
import { FaGoogle } from "react-icons/fa"
import { motion, AnimatePresence, AnimateSharedLayout } from "framer-motion"
import { useHistory } from "react-router-dom"
import Lottie from "react-lottie"
import { Circle } from "better-react-spinkit"
import qs from "qs"
import { parse } from "url"
import { ParsedURLQuery } from "querystring"
import axios from "axios"

import { firebase } from "../../services/firebase"

import Logo from "../../assets/favlinkz-white.svg"

import successAnimation from "../../assets/success.json"

const Login = () => {
  const [authError, setAuthError] = useState({ message: "" })
  const [isSubmiting, setIsSubmiting] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const GOOGLE_AUTHORIZATION_URL =
    "https://accounts.google.com/o/oauth2/v2/auth"
  const GOOGLE_TOKEN_URL = "https://www.googleapis.com/oauth2/v4/token"

  const history = useHistory()

  const signInWithPopup = async () => {
    return new Promise<ParsedURLQuery>((resolve, reject) => {
      const authWindow = new remote.BrowserWindow({
        width: 600,
        height: 700,
        show: true,
      })

      const urlParams = {
        response_type: "code",
        redirect_uri: "com.nicopellerin.favlinkz:/oauth2Callback",
        client_id:
          "445807341018-d03nhf0hioq5qf8g3253agq8jg0t96ru.apps.googleusercontent.com",
        scope: "profile email",
        prompt: "select_account",
      }
      const authUrl = `${GOOGLE_AUTHORIZATION_URL}?${qs.stringify(urlParams)}`

      const handleNavigation = (url: string) => {
        const query = parse(url, true).query
        if (query) {
          if (query.error) {
            reject(new Error(`There was an error: ${query.error}`))
          } else if (query.code) {
            // authWindow.removeListener("closed")
            setImmediate(() => authWindow.close())

            resolve(query.code)
          }
        }
      }

      authWindow.on("closed", () => {
        setIsSubmiting(false)
        throw new Error("Auth window was closed by user")
      })

      authWindow.webContents.on("will-navigate", (event, url) => {
        handleNavigation(url)
      })

      authWindow.webContents.on(
        "did-get-redirect-request",
        (event, oldUrl, newUrl) => {
          handleNavigation(newUrl)
        }
      )

      authWindow.loadURL(authUrl, {
        userAgent: "Chrome",
      })
    })
  }

  const fetchAccessTokens = async (code: string) => {
    const response = await axios.post(
      GOOGLE_TOKEN_URL,
      qs.stringify({
        code,
        client_id:
          "445807341018-d03nhf0hioq5qf8g3253agq8jg0t96ru.apps.googleusercontent.com",
        redirect_uri: "com.nicopellerin.favlinkz:/oauth2Callback",
        grant_type: "authorization_code",
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    )
    return response.data
  }

  const handleSignIn: () => void = async () => {
    setIsSubmiting(true)

    try {
      const code: string = await signInWithPopup()
      const tokens = await fetchAccessTokens(code)

      const credential = firebase.auth.GoogleAuthProvider.credential(
        null,
        tokens.access_token
      )
      // firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION).then(())
      await firebase.auth().signInWithCredential(credential)
      setTimeout(() => setIsSubmiting(false), 500)
      setTimeout(() => {
        setIsLoggedIn(true)
      }, 500)
      setTimeout(() => {
        ipcRenderer.send("user-logged-in")
        history.push("/profile")
      }, 1750)
    } catch (err) {
      setAuthError(err)
      setIsSubmiting(false)
    }
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
    <Wrapper animate layoutId="wrapper">
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
              <AnimatePresence exitBeforeEnter>
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
const Wrapper = styled(motion.div)`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-size: 100%;
  -webkit-app-region: drag;
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
  color: var(--whiteTextColor);
  line-height: 1.4em;
`

const LoggedInText = styled.h3`
  font-size: 2rem;
  margin: 0;
`
