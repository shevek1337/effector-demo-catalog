import { useStore } from "effector-react"
import React from "react"
import { useHistory } from "react-router"
import { authActions, authStore } from "../../state/FakeAuth"
import Button from "../components/Button"
import DownArrowIcon from "../components/DownArrowIcon"

const Login = (): React.ReactElement => {
  const [error, setError] = React.useState(false)
  const { values } = useStore(authStore)
  const history = useHistory()

  return (
    <div className="w-full flex flex-col m-auto">
      <h2 className="mx-auto mb-2 text-2xl">Sign in to Your Account</h2>
      <p className="m-auto mb-2">Please enter your name</p>
      <DownArrowIcon className="h-6 mb-2" />
      <p className={error ? "mx-auto mb-2 text-red-600 font-bold" : "hidden"}>
        Please enter your name!
      </p>
      <form
        onSubmit={async (e) => {
          e.preventDefault(),
            values?.user != null && values.user.length > 0
              ? (await authActions.login(values.user), history.push("/"))
              : setError(!error)
        }}
        className="flex m-auto mt-2 gap-2"
      >
        <input
          type="text"
          className="border border-gray-400 rounded p-2 outline-none"
          placeholder="Username:"
          onChange={(e) => authActions.values.user(e.target.value)}
        />
        <Button
          type="submit"
          className="bg-purple-700 text-white hover:bg-purple-500"
        >
          Sign In
        </Button>
      </form>
    </div>
  )
}

export default Login
