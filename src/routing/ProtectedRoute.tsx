import { useStore } from "effector-react"
import React from "react"
import { Redirect, Route } from "react-router-dom"
import { authStore } from "../state/FakeAuth"

interface ProtectedRouteProps {
  readonly children: React.ReactElement
  readonly path: string
}

const ProtectedRoute = ({
  children,
  ...rest
}: ProtectedRouteProps): React.ReactElement => {
  const { auth } = useStore(authStore)
  return (
    <Route
      {...rest}
      render={() => {
        return auth.authenticated === true ? children : <Redirect to="/login" />
      }}
    />
  )
}

export default ProtectedRoute
