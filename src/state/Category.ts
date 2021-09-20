import * as Api from "../api"
import { createEffect, createStore } from "effector"

export type State = Api.Product[] | null

export const categoryStore = createStore<State>(null)

export const getCategory = createEffect(Api.getProductByCategory)

categoryStore.on(getCategory.doneData, (state, payload) => payload)
