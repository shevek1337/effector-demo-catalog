import * as Api from "../api"
import { createEffect, createStore } from "effector"

export type State = Api.UserOrders | null

export const orderStore = createStore<State>(null)

export const getOrders = createEffect(Api.getOrders)

orderStore.on(getOrders.doneData, (state, payload) => payload)

orderStore.watch(() => console.log)
