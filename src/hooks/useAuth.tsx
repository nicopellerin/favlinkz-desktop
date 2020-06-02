import { useEffect } from "react"
import { useRecoilState } from "recoil"

import { firebase, db } from "../services/firebase"

import { userState } from "../state/user"

interface User {
  displayName: string
  photoUrl: string
  uid: string
  email: string
}

const useAuth = () => {
  const [user, setUser] = useRecoilState(userState)

  useEffect(() => {
    return firebase.auth().onAuthStateChanged((firebaseUser) => {
      const usersRef = db.collection("users").doc(firebaseUser?.uid)

      usersRef.get().then(() => {
        if (firebaseUser) {
          const user = {
            displayName: firebaseUser.displayName,
            photoUrl: firebaseUser.photoURL,
            uid: firebaseUser.uid,
            email: firebaseUser.email,
          } as User

          localStorage.setItem("userFavLinkz", JSON.stringify(user))
          setUser(user)

          db.collection("users").doc(user.uid).set(user, { merge: true })
        } else {
          localStorage.removeItem("userFavLinkz")
          setUser({ displayName: "", photoUrl: "", uid: "", email: "" })
        }
      })
    })
  }, [setUser])

  return user
}

export default useAuth
