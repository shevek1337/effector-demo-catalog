export type ID = string

export type NullableString = string | null

export interface ProductErrorObject {
  readonly type: string
  readonly title: NullableString
  readonly status: number
  readonly detail: NullableString
  readonly instance: NullableString
  readonly additionalProp1: string
  readonly additionalProp2: string
  readonly additionalProp3: string
}

export interface OrderErrorObject {
  readonly type: string
  readonly title: string
  readonly status: number
  readonly detail: string
  readonly instance: string
}
