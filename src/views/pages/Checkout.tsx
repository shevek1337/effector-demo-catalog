import { useStore } from "effector-react"
import React from "react"
import { useHistory } from "react-router"
import { basketActions, basketStore } from "../../state/Basket"
import { authStore } from "../../state/FakeAuth"
import { Button, Loader } from "../components"

const Checkout = (): React.ReactElement => {
  const { auth } = useStore(authStore)
  const { checkoutValues } = useStore(basketStore)
  const history = useHistory()

  React.useEffect(() => {
    if (auth.user) {
      basketActions.initialization(auth.user)
    }
  }, [])

  if (checkoutValues == null) return <Loader className="flex m-auto mt-20" />

  return (
    <>
      <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 mt-4">
        Shipping Information
      </h2>
      <div className="flex flex-col gap-4 mt-4">
        <Input
          onChange={(e) => basketActions.values.firstName(e.target.value)}
          label="First Name:"
          name="firstname"
          type="text"
          placeholder="John"
        />
        <Input
          onChange={(e) => basketActions.values.lastName(e.target.value)}
          label="Last Name:"
          name="lastname"
          type="text"
          placeholder="Doe"
        />
        <Input
          onChange={(e) => basketActions.values.emailAddress(e.target.value)}
          label="Email:"
          name="email"
          type="email"
          placeholder="john@example.com"
        />
        <div className="grid grid-cols-2 gap-4 mb-4">
          <Input
            onChange={(e) => basketActions.values.country(e.target.value)}
            label="Country:"
            name="country"
            type="text"
            placeholder="Georgia"
          />
          <Input
            onChange={(e) => basketActions.values.state(e.target.value)}
            label="State:"
            name="state"
            type="text"
            placeholder="Tbilisi"
          />
          <Input
            onChange={(e) => basketActions.values.addressLine(e.target.value)}
            label="Address:"
            name="address"
            type="text"
            placeholder="542 W. 15th Street"
          />
          <Input
            onChange={(e) => basketActions.values.zipCode(e.target.value)}
            label="Zip Code:"
            name="zipcode"
            type="text"
            placeholder="0105"
          />
        </div>
        <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
          Billing Information
        </h2>
        <Input
          onChange={(e) => basketActions.values.cardName(e.target.value)}
          label="Name on Card:"
          name="cardname"
          type="text"
          placeholder="John M. Doe"
        />
        <Input
          onChange={(e) => basketActions.values.cardNumber(e.target.value)}
          label="Card Number:"
          name="cardnumber"
          type="text"
          placeholder="1111-2222-3333-4444"
        />
        <div className="flex flex-row justify-between gap-4">
          <Input
            onChange={(e) => basketActions.values.expiration(e.target.value)}
            label="Expiration Date:"
            name="expiration"
            type="text"
            placeholder="08/24"
          />
          <Input
            onChange={(e) => basketActions.values.cvv(e.target.value)}
            label="CVV:"
            name="cvv"
            type="text"
            placeholder="352"
          />
        </div>
      </div>
      <div className="flex justify-end my-4 gap-4 text-xl">
        <Button className="shadow-offset-sm" onClick={() => history.goBack()}>
          Cancel
        </Button>
        <Button
          onClick={async () => {
            await basketActions.postBasketCheckout(checkoutValues)
            history.push("/")
          }}
          className="bg-green-500 text-white hover:bg-green-600 shadow-offset-sm"
        >
          Finish Order
        </Button>
      </div>
    </>
  )
}

export default Checkout

interface InputProps {
  readonly label: string
  readonly name: string
  readonly type: string
  readonly placeholder: string
  readonly onChange?: (e: React.ChangeEvent<HTMLInputElement>) => string
}

const Input = ({ name, type, placeholder, label, onChange }: InputProps) => (
  <label className="w-full">
    <span className="text-xl">{label}</span>
    <input
      onChange={onChange}
      className="border border-gray-400 p-2 w-full"
      name={name}
      type={type}
      placeholder={placeholder}
    />
  </label>
)
