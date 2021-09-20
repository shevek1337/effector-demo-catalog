import { ID } from "../globalTypes"
import { Product } from "./types"

export interface postProductsParams {
  readonly body: Product
}

export interface putProductParams {
  readonly body: Product
}

export interface getProductParams {
  readonly args: {
    readonly id: ID
  }
}

export interface deleteProductParams {
  readonly args: {
    readonly id: ID
  }
}

export interface getProductByCategoryParams {
  readonly args: {
    readonly category: string
  }
}
