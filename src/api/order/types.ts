export interface Order {
  readonly id: number
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

export type UserOrders = ReadonlyArray<Order>
