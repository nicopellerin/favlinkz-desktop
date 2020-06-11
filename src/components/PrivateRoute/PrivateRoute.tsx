import * as React from "react"
import { Route, Redirect, RouteProps } from "react-router-dom"

interface PrivateRouteProps extends RouteProps {
  isLoggedIn: boolean
}

const PrivateRoute = ({ isLoggedIn, children, ...rest }: PrivateRouteProps) => {
  return (
    <Route
      {...rest}
      render={() => (isLoggedIn ? children : <Redirect to="/" />)}
    />
  )
}

export default PrivateRoute
