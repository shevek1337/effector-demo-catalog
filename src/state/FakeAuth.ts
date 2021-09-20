import { createStore, createEffect, createEvent, combine } from "effector"
import { toast } from "react-toastify"

// TODO: needs refactor to save local storage with "auth" key and username as a valu

export interface FakeAuth {
  readonly user: string | null
  readonly authenticated: boolean
}

export type Values = FakeAuth | null

const auth = createStore<FakeAuth>({ user: null, authenticated: false })
const values = createStore<Values>(null)

const getStorage = createEffect(() => {
  return {
    key: "auth",
    value: localStorage.getItem("auth"),
  }
})

getStorage.doneData.watch((state) => {
  if (state.value == null) return
  authActions.values.init({
    user: state.value,
    authenticated: state.value.length > 0 ? true : false,
  })
})

const login = createEffect((user: string) => {
  return {
    key: "auth",
    value: localStorage.setItem("auth", user),
  }
})

login.doneData.watch(async () => {
  await getStorage()
  toast.success("You are now logged in 🖐️")
})

const logout = createEffect<void, void>()

logout.watch(() => {
  localStorage.clear()
  authActions.values.user(null)
  authActions.values.authenticated(false)
  toast.info("You are now logged out 👋")
})

export const authStore = combine({
  auth,
  values,
})

export const authActions = {
  values: {
    init: createEvent<Values>(),
    user: createEvent<string | null>(),
    authenticated: createEvent<boolean>(),
  },
  login,
  logout,
}

auth.on(authActions.values.init, (state, payload) => {
  if (payload == null) return
  return {
    user: payload.user,
    authenticated: payload.authenticated,
  }
})

auth.on(authActions.values.user, (state, payload) => {
  return {
    user: payload,
    authenticated: state.authenticated,
  }
})

auth.on(authActions.values.authenticated, (state, payload) => {
  return {
    user: state.user,
    authenticated: payload,
  }
})

values.on(authActions.values.user, (state, payload) => ({
  user: payload,
  authenticated: false,
}))

values.on(authActions.values.authenticated, (state, payload) => {
  if (state == null) return
  return { user: state.user, authenticated: payload }
})

getStorage()
