import React from "react"
import { Navbar, Footer, Notification } from "./layout"
import { BrowserRouter as Router, Route } from "react-router-dom"
import { Basket, Category, Checkout, Home, Login, Product } from "./pages"
import Order from "./components/Orders"

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
        <Route exact path="/basket" component={Basket} />
        <Route exact path="/checkout" component={Checkout} />
        <Route exact path="/orders" component={Order} />
        <Footer />
      </div>
    </Router>
  )
}

export default App
