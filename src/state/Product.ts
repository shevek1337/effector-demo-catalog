import * as Api from "../api"
import { combine, createEffect, createEvent, createStore } from "effector"

export interface State {
  readonly product: Api.Product | null
  readonly values: ProductValues | null
}

export interface ProductValues {
  id: string
  name: string | null
  category: string | null
  summary: string | null
  description: string | null
  price: number
  imageUrl: string | null
}

// stores
const product = createStore<State["product"]>(null)
const values = createStore<State["values"]>(null)

// effects
const getProduct = createEffect(Api.getProduct)
const postProduct = createEffect(Api.postProduct)

// reducers
product.on(getProduct.doneData, (state, payload) => payload)

getProduct.doneData.watch((state) => {
  productActions.values.init({
    category: state.category,
    description: state.description,
    id: state.id,
    imageUrl: state.imageUrl,
    name: state.name,
    price: state.price,
    summary: state.summary,
  })
})

// productActions
const submit = createEffect(async () => {
  const state = values.getState()
  if (state == null) return

  await postProduct({
    body: {
      category: state.category,
      description: state.description,
      id: state.id,
      imageUrl: state.imageUrl,
      name: state.name,
      price: state.price,
      summary: state.summary,
    },
  })
})

export const productStore = combine({
  values,
  product,
})

export const productActions = {
  values: {
    init: createEvent<ProductValues>(),
    id: createEvent<string>(),
    name: createEvent<string>(),
    category: createEvent<string>(),
    summary: createEvent<string>(),
    description: createEvent<string>(),
    price: createEvent<number>(),
    imageUrl: createEvent<string>(),
  },
  fetchProduct: createEvent<Api.getProductParams>(),
  submit,
}

productActions.fetchProduct.watch((payload) => {
  const state = productStore.getState()

  if (state.values?.id !== payload.args.id) {
    void getProduct(payload)
  }
})

values.on(productActions.values.init, (state, payload) => payload)

values.on(productActions.values.id, (state, payload) => {
  if (state == null) return
  return {
    ...state,
    id: payload,
  }
})

values.on(productActions.values.category, (state, payload) => {
  if (state == null) return
  return {
    ...state,
    category: payload,
  }
})

values.on(productActions.values.description, (state, payload) => {
  if (state == null) return
  return {
    ...state,
    description: payload,
  }
})

values.on(productActions.values.imageUrl, (state, payload) => {
  if (state == null) return
  return {
    ...state,
    imageUrl: payload,
  }
})

values.on(productActions.values.name, (state, payload) => {
  if (state == null) return
  return {
    ...state,
    name: payload,
  }
})

values.on(productActions.values.price, (state, payload) => {
  if (state == null) return
  return {
    ...state,
    price: payload,
  }
})

values.on(productActions.values.summary, (state, payload) => {
  if (state == null) return
  return {
    ...state,
    summary: payload,
  }
})
