import React from "react"
import * as Api from "../../api"
import { Link, useHistory } from "react-router-dom"
import { Button } from "."
import { basketActions } from "../../state/Basket"

interface ProductProps {
  readonly product: Api.Product
  readonly user: string | null
  readonly basket: Api.Basket
}

const SingleProduct = ({
  product,
  user,
  basket,
}: ProductProps): React.ReactElement => {
  const history = useHistory()
  return (
    <div>
      <div className="group relative">
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
                <span aria-hidden="true" className="absolute inset-0"></span>
                {product.name}
              </Link>
            </h3>
            <p className="mt-1 text-sm text-gray-500">{product.summary}</p>
          </div>
          <p className="font-bold">${product.price}</p>
        </div>
      </div>
      <Button
        onClick={() => {
          user != null
            ? basketActions.postBasket({
                body: {
                  userName: user,
                  items: [
                    ...basket.items,
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
        className="bg-gray-200 font-bold hover:bg-gray-300 mt-2 p-2 rounded text-gray-900 w-full"
      >
        Add to Cart
      </Button>
    </div>
  )
}

export default SingleProduct
