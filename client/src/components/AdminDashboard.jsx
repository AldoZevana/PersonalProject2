import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/admin/orders');
        setOrders(response.data);
      } catch (err) {
        console.error('Error fetching orders:', err);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
      <ul className="space-y-2">
        {orders.map((order) => (
          <li key={order._id} className="p-2 border rounded">
            <p>Order Number: {order.orderNumber}</p>
            <p>Status: {order.status}</p>
            <p>Items: {order.items.map(item => item.name).join(', ')}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
