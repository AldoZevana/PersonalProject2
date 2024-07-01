import React, { useState, useEffect } from 'react';
import { food_list } from '../assets/assets';

const Cart = ({ cartItems, removeFromCart, placeOrder }) => {
  const [itemsInCart, setItemsInCart] = useState([]);

  useEffect(() => {
    const selectedItems = cartItems.map(id => food_list.find(item => item._id === id));
    setItemsInCart(selectedItems);
  }, [cartItems]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Cart</h2>
      <ul className="space-y-2">
        {itemsInCart.map((item, index) => (
          <li key={index} className="flex justify-between items-center p-2 border rounded">
            <div>
              <img src={item.image} alt={item.name} className="w-16 h-16 object-cover" />
              <h3 className="text-lg font-semibold">{item.name}</h3>
              <p>{item.description}</p>
              <p className="text-gray-600">${item.price.toFixed(2)}</p>
            </div>
            <button onClick={() => removeFromCart(item._id)} className="bg-red-500 text-white px-3 py-1 rounded">Remove</button>
          </li>
        ))}
      </ul>
      <button onClick={placeOrder} className="w-full bg-blue-500 text-white px-3 py-2 rounded mt-4">Place Order</button>
    </div>
  );
};

export default Cart;
