import { NullableString } from "../globalTypes"

export interface BasketProduct {
  readonly productId: string
  readonly productName: NullableString
  readonly quantity: number
  readonly price: number
}

export interface Basket {
  readonly userName: string
  readonly items: readonly BasketProduct[]
  readonly totalPrice: number
}
