import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Layout from './components/Layout';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import FoodMenu from './components/FoodMenu';
import Cart from './components/Cart';
import AdminDashboard from './components/AdminDashboard';
import CheckoutForm from './components/CheckoutForm';
import './tailwind.css';
import axios from 'axios';

axios.defaults.withCredentials = true;

const stripePromise = loadStripe('pk_test_51PafxYRw9lSQ9MQVubcyz66asYdln68UA0yAWgpTqZlOCQnTcSK7fvntlNMViBCJQkdch7OU2X50GIcGMZvJHAFX00h75IuojV');

const App = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [orderId, setOrderId] = useState(null);
  const [orderAmount, setOrderAmount] = useState(0);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/checkAuth');
        if (response.status === 200) {
          setLoggedIn(true);
          setUser(response.data.user);
        }
      } catch (err) {
        setLoggedIn(false);
        setUser(null);
      }
    };
    checkLoginStatus();
  }, []);

  const addToCart = (id) => {
    setCartItems(prevItems => [...prevItems, id]);
  };

  const removeFromCart = (id) => {
    setCartItems(prevItems => prevItems.filter(item => item !== id));
  };

  const placeOrder = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/orders', {
        items: cartItems,
        orderNumber: `ORD-${Date.now()}`,
      });
      if (response.status === 201) {
        alert('Order placed successfully');
        setOrderId(response.data._id);
        setOrderAmount(response.data.amount); // Assuming your order response contains the amount
        setCartItems([]);
      } else {
        alert('Failed to place order');
      }
    } catch (err) {
      console.error('Error placing order:', err);
      alert('An unexpected error occurred');
    }
  };

  const handleLogout = async () => {
    try {
      await axios.get('http://localhost:8000/api/logout');
      setLoggedIn(false);
      setUser(null);
    } catch (err) {
      console.error('Error logging out:', err);
      alert('An unexpected error occurred');
    }
  };

  return (
    <Router>
      <Layout loggedIn={loggedIn} user={user} handleLogout={handleLogout}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login setLoggedIn={setLoggedIn} setUser={setUser} />} />
          <Route path="/menu" element={loggedIn ? (
            <div className="flex">
              <div className="w-2/3 p-4">
                <FoodMenu addToCart={addToCart} />
              </div>
              <div className="w-1/3 p-4">
                <Cart cartItems={cartItems} removeFromCart={removeFromCart} placeOrder={placeOrder} />
              </div>
            </div>
          ) : (
            <Navigate to="/login" />
          )} />
          <Route path="/admin" element={loggedIn && user && user.isAdmin ? (
            <AdminDashboard />
          ) : (
            <Navigate to="/login" />
          )} />
          <Route path="/checkout" element={
            <Elements stripe={stripePromise}>
              <CheckoutForm orderId={orderId} amount={orderAmount} />
            </Elements>
          } />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
