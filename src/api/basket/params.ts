import { BasketProduct } from "./types"

export interface getBasketParams {
  readonly args: {
    readonly userName: string
  }
}

export interface postBasketParams {
  readonly body: {
    readonly userName: string
    readonly items: BasketProduct[]
  }
}

export interface deleteBasketParams {
  readonly args: {
    readonly userName: string
  }
}

export interface postBasketCheckoutParams {
  readonly body: {
    readonly userName: string
    readonly totalPrice: number
    readonly firstName: string
    readonly lastName: string
    readonly emailAddress: string
    readonly addressLine: string
    readonly country: string
    readonly state: string
    readonly zipCode: string
    readonly cardName: string
    readonly cardNumber: string
    readonly expiration: string
    readonly cvv: string
    readonly paymentMethod: number
  }
}
