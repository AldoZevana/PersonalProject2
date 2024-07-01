import React, { useState, useEffect } from 'react';
import { food_list } from '../assets/assets';

const FoodMenu = ({ addToCart }) => {
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    setMenu(food_list);
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Food Menu</h2>
      <ul className="space-y-2">
        {menu.map((item) => (
          <li key={item._id} className="flex justify-between items-center p-2 border rounded">
            <div>
              <img src={item.image} alt={item.name} className="w-16 h-16 object-cover" />
              <h3 className="text-lg font-semibold">{item.name}</h3>
              <p>{item.description}</p>
              <p className="text-gray-600">${item.price.toFixed(2)}</p>
            </div>
            <button onClick={() => addToCart(item._id)} className="bg-green-500 text-white px-3 py-1 rounded">Add to Cart</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FoodMenu;
