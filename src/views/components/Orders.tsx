import { useStore } from "effector-react"
import React, { useEffect } from "react"
import { Loader } from "."
import { authStore } from "../../state/FakeAuth"
import { getOrders, orderStore } from "../../state/Orders"

const Order = (): React.ReactElement => {
  const { auth } = useStore(authStore)
  const orders = useStore(orderStore)
  useEffect(() => {
    if (auth.user != null && auth.authenticated) {
      getOrders({ args: { userName: auth.user } })
    }
  }, [])

  if (orders == null) return <Loader className="flex m-auto mt-20" />
  return orders.length > 0 ? (
    <>
      <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 my-4">
        Your Orders 🛍️
      </h2>
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      #
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Country
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      State
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Address
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Total Price
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {orders?.map((order, index) => (
                    <tr key={order.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {order.firstName} {order.lastName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {order.country}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {order.state}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {order.addressLine}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        ${order.totalPrice}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : (
    <h2 className="text-2xl m-auto">Your have no orders 🛍️</h2>
  )
}

export default Order
