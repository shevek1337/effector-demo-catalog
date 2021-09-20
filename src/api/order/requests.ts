import { getOrderParams, UserOrders } from "."

const url = "http://192.168.1.6:5003/Order"

export const getOrders = async (
  params: getOrderParams
): Promise<UserOrders> => {
  const response = await fetch(url + "/" + params.args.userName, {
    method: "GET",
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  })

  const data: UserOrders = await response.json()
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
