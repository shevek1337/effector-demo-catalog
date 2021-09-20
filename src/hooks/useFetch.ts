import { useEffect, useReducer } from "react"

interface State<T> {
  readonly data?: T
  readonly error?: Error
}

type Action<T> =
  | { type: "loading" }
  | { type: "done"; payload: T }
  | { type: "error"; payload: Error }

const useFetch = <T>(
  url: string,
  method: string,
  body?: BodyInit
): State<T> => {
  const initialState: State<T> = {
    data: undefined,
    error: undefined,
  }

  const fetchReducer = (state: State<T>, action: Action<T>): State<T> => {
    switch (action.type) {
      case "loading":
        return { ...initialState }
      case "done":
        return { ...initialState, data: action.payload }
      case "error":
        return { ...initialState, error: action.payload }
      default:
        return state
    }
  }

  const [state, dispatch] = useReducer(fetchReducer, initialState)

  useEffect(() => {
    if (url == null) return

    dispatch({ type: "loading" })
    try {
      fetch(url, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
        method: method,
        body: body,
      })
        .then((response) => response.json())
        .then((data) => dispatch({ type: "done", payload: data }))
    } catch (error) {
      dispatch({ type: "error", payload: error as Error })
    }
  }, [url])

  return state
}

export default useFetch
