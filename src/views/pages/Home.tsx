import React, { useEffect } from "react"
import { useStore } from "effector-react"
import { catalog, getCatalog } from "../../state/Catalog"
import { Loader, Categories } from "../components"
import { authStore } from "../../state/FakeAuth"
import { basketStore } from "../../state/Basket"
import SingleProduct from "../components/SingleProduct"

const Home = (): React.ReactElement => {
  const products = useStore(catalog)
  const { basketState } = useStore(basketStore)
  const { auth } = useStore(authStore)

  // TODO: fetch სტეიტშია გასატანი
  useEffect(() => {
    getCatalog()
  }, [])

  if (products == null) return <Loader className="flex m-auto mt-20" />
  const categories = [...new Set(products.map((product) => product.category))]

  return (
    <div className="w-full">
      <Categories categories={categories} />
      <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
        Featured Products
      </h2>
      <div className="my-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {products.map((product, index) => (
          <SingleProduct
            key={index}
            basket={basketState}
            product={product}
            user={auth.user}
          />
        ))}
      </div>
    </div>
  )
}

export default Home
