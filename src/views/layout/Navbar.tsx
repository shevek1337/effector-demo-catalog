import React, { ReactElement, useEffect } from "react"
import { useStore } from "effector-react"
import { Link, useHistory } from "react-router-dom"
import { authActions, authStore } from "../../state/FakeAuth"
import Button from "../components/Button"
import CartIcon from "../components/CartIcon"
import { basketStore, basketActions } from "../../state/Basket"
import { ToastContainer } from "react-toastify"

const Navbar = (): ReactElement => {
  const { auth } = useStore(authStore)
  const { basketState } = useStore(basketStore)
  const history = useHistory()

  useEffect(() => {
    if (auth.user != null && auth.authenticated)
      basketActions.getBasketRequest({ args: { userName: auth.user } })
  }, [])
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="w-full py-4 border-b border-gray-300 flex items-center justify-between">
        <Link to="/">
          <h2 className="text-3xl">LOGO</h2>
        </Link>
        <div className="flex items-center gap-2">
          {auth.user != null && auth.authenticated ? (
            <>
              <p className="text-2xl">
                Hi,{" "}
                <span className="font-bold">
                  {auth.user[0].toUpperCase() + auth.user.substring(1)}
                </span>
                !
              </p>
              <Button
                onClick={() => history.push("/basket")}
                className="relative inline-block"
              >
                {basketState?.items != null && basketState.items.length > 0 && (
                  <span className="absolute top-2 right-2 inline-block w-2 h-2 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full" />
                )}
                <CartIcon />
              </Button>
              <Button
                onClick={() => history.push("/orders")}
                className="py-2 px-4"
              >
                Orders
              </Button>
              <Button
                className="py-2 px-4"
                onClick={() => {
                  authActions.logout(), history.push("/")
                }}
              >
                Log Out
              </Button>
            </>
          ) : (
            <Button
              className="py-2 px-4 bg-purple-700 hover:bg-purple-500 text-white"
              onClick={() => history.push("/login")}
            >
              Sign In
            </Button>
          )}
        </div>
      </div>
    </>
  )
}

export default Navbar
