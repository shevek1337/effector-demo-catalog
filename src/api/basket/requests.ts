import {
  Basket,
  deleteBasketParams,
  getBasketParams,
  postBasketCheckoutParams,
  postBasketParams,
} from "."

const url = "http://192.168.1.6:5003/Basket"

export const getBasket = async (params: getBasketParams): Promise<Basket> => {
  const response = await fetch(url + "/" + params.args.userName, {
    method: "GET",
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  })

  const data: Basket = await response.json()
  if (response.ok) {
    if (data) {
      return data
    } else {
      return Promise.reject(new Error())
    }
  } else {
    const error = new Error()
    return Promise.reject(error)
  }
}

export const deleteBasket = async (
  params: deleteBasketParams
): Promise<void> => {
  await fetch(url + "/" + params.args.userName, {
    method: "DELETE",
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  })
}

export const postBasket = async (
  params: postBasketParams
): Promise<Response> => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Access-Control-Allow-Origin": "*",
      accept: "text/plain",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userName: params.body.userName,
      items: params.body.items,
    }),
  })

  const data = await response.json()
  if (response.ok) {
    if (data) {
      return data
    } else {
      return Promise.reject(new Error())
    }
  } else {
    const error = new Error()
    return Promise.reject(error)
  }
}

export const postBasketCheckout = async (
  params: postBasketCheckoutParams
): Promise<void> => {
  await fetch(url + "/Checkout", {
    method: "POST",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userName: params.body.userName,
      totalPrice: params.body.totalPrice,
      firstName: params.body.firstName,
      lastName: params.body.lastName,
      emailAddress: params.body.emailAddress,
      addressLine: params.body.addressLine,
      country: params.body.country,
      state: params.body.state,
      zipCode: params.body.zipCode,
      cardName: params.body.cardName,
      cardNumber: params.body.cardNumber,
      expiration: params.body.expiration,
      cvv: params.body.cvv,
      paymentMethod: params.body.paymentMethod,
    }),
  })
}
