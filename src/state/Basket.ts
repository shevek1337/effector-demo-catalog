import { combine, createEffect, createEvent, createStore } from "effector"
import * as Api from "../api"
import { toast } from "react-toastify"

export interface CheckoutValues {
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
  readonly paymentMethod: 0
}

export interface State {
  readonly basket: Api.Basket
  readonly values: Api.postBasketCheckoutParams | null
}

const basketState = createStore<State["basket"]>({
  items: [],
  totalPrice: 0,
  userName: "",
})
const checkoutValues = createStore<State["values"]>(null)

export const basketStore = combine({
  basketState,
  checkoutValues,
})

const getBasketRequest = createEffect(Api.getBasket)
const postBasketRequest = createEffect(Api.postBasket)
const postBasketCheckoutRequest = createEffect(Api.postBasketCheckout)
const deleteBasketRequest = createEffect(Api.deleteBasket)

basketState.on(getBasketRequest.doneData, (state, payload) => payload)

const postBasket = createEffect<Api.postBasketParams, void>(async (payload) => {
  await postBasketRequest(payload)
  getBasketRequest({ args: { userName: payload.body.userName } })
})

postBasketRequest.doneData.watch(() =>
  toast.success(`Item added to your basket 👌`)
)

const deleteBasket = createEffect<string, void>(async (user) => {
  await deleteBasketRequest({
    args: {
      userName: user,
    },
  })
  getBasketRequest({ args: { userName: user } })
})

deleteBasketRequest.doneData.watch(() =>
  toast.success("Your basket is now empty! 😉")
)

const postBasketCheckout = createEffect<Api.postBasketCheckoutParams, void>(
  async (payload) => {
    await postBasketCheckoutRequest(payload)
    getBasketRequest({ args: { userName: payload.body.userName } })
  }
)

postBasketCheckoutRequest.doneData.watch(() =>
  toast.success(`Your order is on its way! 🎉`)
)

export const basketActions = {
  values: {
    init: createEvent<Api.postBasketCheckoutParams>(),
    userName: createEvent<string>(),
    firstName: createEvent<string>(),
    lastName: createEvent<string>(),
    emailAddress: createEvent<string>(),
    addressLine: createEvent<string>(),
    country: createEvent<string>(),
    state: createEvent<string>(),
    zipCode: createEvent<string>(),
    cardName: createEvent<string>(),
    cardNumber: createEvent<string>(),
    expiration: createEvent<string>(),
    cvv: createEvent<string>(),
  },
  initialization: createEvent<string>(),
  getBasketRequest,
  postBasket,
  postBasketCheckout,
  deleteBasket,
}

for (const key of Object.keys(basketActions.values) as Array<
  keyof typeof basketActions.values
>) {
  // @ts-expect-error helper function needed for this one
  checkoutValues.on(basketActions.values[key], (state, payload) => {
    if (state == null) return
    return {
      body: {
        ...state.body,
        [key]: payload,
      },
    }
  })
}

checkoutValues.on(basketActions.values.init, (state, payload) => payload)

basketActions.initialization.watch((payload) => {
  const totalPrice = basketState.getState().totalPrice
  basketActions.values.init({
    body: {
      userName: payload,
      totalPrice: totalPrice,
      addressLine: "",
      cardName: "",
      cardNumber: "",
      country: "",
      cvv: "",
      emailAddress: "",
      expiration: "",
      firstName: "",
      lastName: "",
      paymentMethod: 0,
      state: "",
      zipCode: "",
    },
  })
})
