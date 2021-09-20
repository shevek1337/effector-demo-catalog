import { NullableString } from "../globalTypes"

export interface Product {
  readonly id: string
  readonly name: NullableString
  readonly category: NullableString
  readonly summary: NullableString
  readonly description: NullableString
  readonly price: number
  readonly imageUrl: NullableString
}
