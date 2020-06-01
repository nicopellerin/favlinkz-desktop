import { useEffect, useState } from "react"

import { firebase, db } from "../services/firebase"

interface User {
  displayName: string | null
  photoUrl: string | null
  uid: string
  email: string | null
}

const useAuth = () => {
  const [user, setUser] = useState<User | null>()

  useEffect(() => {
    return firebase.auth().onAuthStateChanged((firebaseUser) => {
      const usersRef = db.collection("users").doc(firebaseUser?.uid)

      usersRef.get().then(() => {
        if (firebaseUser) {
          const user: User = {
            displayName: firebaseUser.displayName,
            photoUrl: firebaseUser.photoURL,
            uid: firebaseUser.uid,
            email: firebaseUser.email,
          }

          localStorage.setItem("userFavLinkz", JSON.stringify(user))
          setUser(user)

          db.collection("users").doc(user.uid).set(user, { merge: true })
        } else {
          localStorage.removeItem("userFavLinkz")
          setUser(null)
        }
      })
    })
  }, [setUser])

  return user
}

export default useAuth
