import React from "react"
import { Navbar, Footer, Notification } from "./layout"
import { BrowserRouter as Router, Route } from "react-router-dom"
import {
  Basket,
  Category,
  Checkout,
  Home,
  Login,
  Product,
  Order,
} from "./pages"
import ProtectedRoute from "../routing/ProtectedRoute"

function App(): React.ReactElement {
  return (
    <Router>
      <Notification />
      <div
        className="font-mono flex flex-col mx-auto lg:max-w-screen-lg"
        style={{ minHeight: "99vh" }}
      >
        <Navbar />
        <Route exact path="/" component={Home} />
        <Route path="/product/:id" component={Product} />
        <Route path="/category/:category" component={Category} />
        <Route exact path="/login" component={Login} />
        <ProtectedRoute path="/basket">
          <Basket />
        </ProtectedRoute>
        <ProtectedRoute path="/checkout">
          <Checkout />
        </ProtectedRoute>
        <ProtectedRoute path="/orders">
          <Order />
        </ProtectedRoute>
        <Footer />
      </div>
    </Router>
  )
}

export default App
