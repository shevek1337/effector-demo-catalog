import { useStore } from "effector-react"
import React, { useEffect } from "react"
import { useParams } from "react-router"
import { basketStore } from "../../state/Basket"
import { categoryStore, getCategory } from "../../state/Category"
import { authStore } from "../../state/FakeAuth"
import { Loader } from "../components"
import SingleProduct from "../components/SingleProduct"

interface RouteParams {
  category: string
}

const Category = (): React.ReactElement => {
  const products = useStore(categoryStore)
  const { basketState } = useStore(basketStore)
  const { auth } = useStore(authStore)
  const { category } = useParams<RouteParams>()

  // TODO: fetch სტეიტშია გასატანი
  useEffect(() => {
    getCategory({ args: { category } })
  }, [category])

  if (products == null) return <Loader className="flex m-auto mt-20" />

  return (
    <>
      <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 mt-4">
        Products in Category &quot;{category}&quot;
      </h2>{" "}
      <div className="w-full grid grid-cols-3 gap-4 my-4">
        {products.map((product, index) => (
          <SingleProduct
            key={index}
            basket={basketState}
            product={product}
            user={auth.user}
          />
        ))}
      </div>
    </>
  )
}

export default Category
