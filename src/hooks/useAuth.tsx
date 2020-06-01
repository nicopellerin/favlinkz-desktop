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

          // Checks to see if initial 2 categories exist
          const userRef = db.collection("users").doc(user.uid)
          let isExist: any
          userRef
            .collection("categories")
            .get()
            .then((query) => (isExist = query.size))
            .then(() => {
              if (!isExist) {
                userRef
                  .collection("categories")
                  .doc("latest linkz")
                  .set({
                    createdAt: new Date(),
                    links: [],
                    title: "Latest linkz",
                  })
                  .then(() =>
                    userRef.collection("categories").doc("favorites").set({
                      createdAt: new Date(),
                      links: [],
                      title: "Favorites",
                    })
                  )
              }
            })
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
