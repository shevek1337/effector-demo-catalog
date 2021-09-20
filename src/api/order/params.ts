import { ID } from "../globalTypes"
import { Order } from "./types"

export interface getOrderParams {
  readonly args: {
    readonly userName: string
  }
}

export interface postOrderParams {
  readonly body: Order
}

export interface putOrderParams {
  readonly body: Order
}

export interface deleteOrderParams {
  readonly args: {
    id: ID
  }
}
