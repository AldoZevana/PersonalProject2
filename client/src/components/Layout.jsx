import React from 'react';
import { Link } from 'react-router-dom';
import { assets } from '../assets/assets';

const Layout = ({ loggedIn, user, handleLogout, children }) => {
  return (
    <div>
      <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
        <img src={assets.header_img} alt="Header" className="h-16" />
        <nav>
          {loggedIn ? (
            <>
              <span className="mr-4">Welcome, {user.firstName}</span>
              <button onClick={handleLogout} className="bg-red-500 text-white px-3 py-1 rounded">Logout</button>
            </>
          ) : (
            <>
              <Link to="/register" className="mr-4">Register</Link>
              <Link to="/login">Login</Link>
            </>
          )}
        </nav>
      </header>
      <main className="p-4">
        {children}
      </main>
    </div>
  );
};

export default Layout;
