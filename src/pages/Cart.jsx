import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, removeFromCart } from '../app/features/cart/cartSlice';

export const Cart = () => {

  const dispatch = useDispatch();

  const shoppingCart = useSelector((state) => state.cart);

  // console.log(shoppingCart);

  const handleRemoveFromCart = (productId) => {

    dispatch(removeFromCart(productId));
  }

  const handleIncrement = (product) => {

    dispatch(addToCart(product));
  }

  const handleDecrement = (productId) => {

    dispatch(removeFromCart(productId));
  }

  const calculateCheckoutSummary = (taxes_percent = 5, shipping_charge = 30) => {
    const subTotalAmount = shoppingCart.cartItems?.reduce((total, item) => total + item.price * item.qty,0);

    const totalAmount = (shipping_charge + (subTotalAmount + (subTotalAmount * taxes_percent * 0.01)));

    return {'subtotal': subTotalAmount, 'total': totalAmount, 'taxes': taxes_percent+' %','shipping': shipping_charge};
  }

  const checkOutSummary = calculateCheckoutSummary();

  return (

    <div className="bg-gray-100 h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-semibold mb-4">Shopping Cart</h1>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="md:w-3/4">
            <div className="bg-white rounded-lg shadow-md p-6 mb-4">


              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-8 py-3">
                      <span className="sr-only">Image</span>
                    </th>
                    <th scope="col" className="px-2 py-3">
                      Product
                    </th>
                    <th scope="col" className="px-16 py-3">
                      Qty
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Price
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Total
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {
                    shoppingCart.cartItems?.map(citem => (

                      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td className="p-1">
                          <img src={citem.image} className="w-12 h-16 md:w-8 max-w-full max-h-full" alt={citem.title} />
                        </td>
                        <td className="px-2 py-4 font-semibold text-gray-900 dark:text-white">
                          {citem.title}
                        </td>
                        <td className="px-2 py-4">
                          <div className="flex items-center">
                            <button onClick={() => handleDecrement(citem.id)} className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                              <span className="sr-only">Quantity button</span>
                              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                <path stroke="currentColor" stroke-linecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16" />
                              </svg>
                            </button>
                            <div>
                              <input type="number" id="first_product" className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={citem.qty} required readOnly />
                            </div>
                            <button onClick={() => handleIncrement(citem)} className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                              <span className="sr-only">Quantity button</span>
                              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
                              </svg>
                            </button>
                          </div>
                        </td>
                        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                          Rs. {citem.price}
                        </td>
                        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                          Rs. {(citem.qty * citem.price).toFixed(2)}
                        </td>
                        <td className="px-6 py-4">
                          <button onClick={() => handleRemoveFromCart(citem.id)} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-1.5 py-0.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Remove</button>
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>

            </div>
          </div>
          <div className="md:w-1/4">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold mb-4">Cart Summary</h2>
              <div className="flex justify-between mb-2">
                <span>Subtotal :</span>
                <span className='text-sm'>Rs. {(checkOutSummary.subtotal).toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Taxes :</span>
                <span className='text-sm'>{checkOutSummary.taxes}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Shipping :</span>
                <span className='text-sm'>Rs. {checkOutSummary.shipping}</span>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between mb-2">
                <span className="font-semibold">Total :</span>
                <span className="text-sm">Rs. {(checkOutSummary.total).toFixed(2)}</span>
              </div>
              <button className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 w-full">Checkout</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
