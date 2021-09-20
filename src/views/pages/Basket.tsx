import React from "react"
import { useStore } from "effector-react"
import { Link, useHistory } from "react-router-dom"
import { basketActions, basketStore } from "../../state/Basket"
import { Button } from "../components"

const Basket = (): React.ReactElement => {
  const basket = useStore(basketStore)
  const history = useHistory()
  return basket.basketState.items.length === 0 ? (
    <div className="flex flex-col m-auto gap-10">
      <p className="text-3xl">Your Basket is Empty 😢</p>
      <Button className="mx-auto text-xl" onClick={() => history.push("/")}>
        Go to Catalog
      </Button>
    </div>
  ) : (
    <>
      <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 my-4">
        Products in Your Basket
      </h2>
      <div className="grid grid-cols-1 gap-4">
        {basket.basketState.items.map((item, index) => (
          <div
            key={index}
            className="border border-gray-100 bg-gray-50 rounded flex flex-row w-full p-3 hover:shadow-offset-purple transform hover:-translate-x-1 hover:-translate-y-1"
          >
            <Link to={`/product/${item.productId}`}>
              <img
                src="https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80"
                alt={item.productName ?? ""}
                className="h-40"
              />
            </Link>
            <div className="flex flex-col justify-between text-xl ml-4">
              <h2 className="text-2xl my-2">{item.productName}</h2>
              <p>Price: ${item.price}</p>
              <p>quantity:{item.quantity}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-end gap-4 my-10">
        <h3 className="text-xl">
          Total Price:{" "}
          <span className="text-3xl">${basket.basketState.totalPrice}</span>
        </h3>
        <Button
          className="shadow-offset-sm hover:bg-red-600 hover:text-white text-xl"
          onClick={async () => {
            await basketActions.deleteBasket(basket.basketState.userName),
              history.push("/")
          }}
        >
          Clear
        </Button>
        <Button
          onClick={() => history.push("/checkout")}
          className="shadow-offset-sm bg-green-500 hover:bg-green-600 text-white text-xl"
        >
          Checkout
        </Button>
      </div>
    </>
  )
}

export default Basket
