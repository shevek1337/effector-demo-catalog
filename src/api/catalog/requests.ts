import {
  getProductByCategoryParams,
  getProductParams,
  postProductsParams,
} from "."
import { Product } from "./types"

const url = "http://192.168.1.2:8003/Catalog"

export const getCatalog = async (): Promise<Product[]> => {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  })

  const data: Product[] = await response.json()
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

export const getProduct = async (
  params: getProductParams
): Promise<Product> => {
  const response = await fetch(url + "/" + params.args.id, {
    method: "GET",
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  })

  const data: Product = await response.json()
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

export const getProductByCategory = async (
  params: getProductByCategoryParams
): Promise<Product[]> => {
  const response = await fetch(
    url + "/GetProductByCategory/" + params.args.category,
    {
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    }
  )

  const data: Product[] = await response.json()
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

export const postProduct = async (
  params: postProductsParams
): Promise<Response> => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      id: params.body["id"],
      name: params.body["name"],
      category: params.body["category"],
      summary: params.body["summary"],
      description: params.body["description"],
      price: params.body["price"],
      imageUrl: params.body["imageUrl"],
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
