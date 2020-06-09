import * as React from "react"
import { useTransactionObservation_UNSTABLE } from "recoil"

export const PersistanceObserver = () => {
  useTransactionObservation_UNSTABLE(
    ({ atomValues, atomInfo, modifiedAtoms }) => {
      for (const modifiedAtom of modifiedAtoms) {
        localStorage.setItem(
          modifiedAtom,
          JSON.stringify({ value: atomValues.get(modifiedAtom) })
        )
      }
    }
  )
  return null
}
