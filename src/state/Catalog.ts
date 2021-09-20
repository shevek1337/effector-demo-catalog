import * as Api from "../api"
import { createEffect, createStore } from "effector"

export type State = Api.Product[] | null

export const catalog = createStore<State>(null)

export const getCatalog = createEffect(Api.getCatalog)

catalog.on(getCatalog.doneData, (state, payload) => payload)
