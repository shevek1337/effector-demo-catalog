import { useStore } from "effector-react"
import React, { useEffect } from "react"
import { useHistory, useParams } from "react-router"
import { Link } from "react-router-dom"
import { basketActions, basketStore } from "../../state/Basket"
import { categoryStore, getCategory } from "../../state/Category"
import { authStore } from "../../state/FakeAuth"
import { productActions, productStore } from "../../state/Product"
import { Button, Loader } from "../components"

interface RouteParams {
  id: string
}

const Product = (): React.ReactElement => {
  const { product } = useStore(productStore)
  const category = useStore(categoryStore)
  const { auth } = useStore(authStore)
  const { basketState } = useStore(basketStore)
  const { id } = useParams<RouteParams>()
  const history = useHistory()

  // TODO: fetch სტეიტშია გასატანი არასწორად ფეჩავს
  useEffect(() => {
    productActions.fetchProduct({ args: { id } })
    if (product?.category) getCategory({ args: { category: product.category } })
  }, [id, product])

  if (product == null) {
    return <Loader className="flex m-auto mt-20" />
  }

  return (
    <div className="w-full">
      <div className="grid grid-cols-2 gap-4 py-4 divide-x divide-gray-300">
        <div
          className="bg-cover bg-center rounded w-full"
          style={{
            minHeight: "500px",
            backgroundImage:
              `url(${product.imageUrl})` ??
              "url(https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80)",
          }}
        />
        <div className="flex flex-col pl-4 h-full justify-between">
          <div>
            <h2 className="font-bold text-2xl">{product.name}</h2>
            <div className="mt-4">
              <Link
                to={`/category/${product.category}`}
                className="bg-purple-700 font-bold px-2 py-1.5 text-white rounded hover:bg-purple-500"
              >
                # {product.category}
              </Link>
            </div>
            <p className="mt-8 text-lg">{product.summary}</p>
          </div>
          <div>
            <p className="text-2xl mb-5">${product.price}</p>
            <div className="flex gap-2">
              <Button
                // TODO: სტეიტშია გასატანი
                onClick={() => {
                  auth.user != null
                    ? basketActions.postBasket({
                        body: {
                          userName: auth.user,
                          items: [
                            ...basketState.items,
                            {
                              price: product.price,
                              productId: product.id,
                              productName: product.name,
                              quantity: 1,
                            },
                          ],
                        },
                      })
                    : history.push("/login")
                }}
                className="bg-purple-700 hover:bg-purple-500 text-white"
              >
                Add to Cart
              </Button>
              <Button>Buy Now</Button>
              <Button>{"<3"}</Button>
            </div>
          </div>
        </div>
      </div>
      <div className="pb-4">
        <p className="text-2xl">Description:</p>
        <p>{product.description}</p>
      </div>
      <div className="py-4">
        <p className="text-2xl mb-2">Related Products:</p>
        <div className="grid grid-cols-4 gap-4">
          {category?.slice(0, 4).map((p, index) => (
            <div className="group relative" key={index}>
              <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:shadow-offset-purple transform group-hover:-translate-x-2 group-hover:-translate-y-2 lg:h-80 lg:aspect-none">
                <img
                  src={
                    product.imageUrl ??
                    "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg"
                  }
                  alt="Front of men&#039;s Basic Tee in black."
                  className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-gray-700">
                    <Link to={`/product/${product.id}`}>
                      <span
                        aria-hidden="true"
                        className="absolute inset-0"
                      ></span>
                      {product.name}
                    </Link>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {product.summary}
                  </p>
                </div>
                <p className="font-bold">${product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Product
