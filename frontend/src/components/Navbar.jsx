import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ isLoggedIn, onLogout }) => {
  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-lg font-bold">
          E-Commerce
        </Link>
        <div className="flex space-x-4">
          {isLoggedIn ? (
            <>
              <Link to="/cart" className="hover:underline">
                Cart
              </Link>
              <Link to="/orders" className="hover:underline">
                Orders
              </Link>
              <button onClick={onLogout} className="hover:underline">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:underline">
                Login
              </Link>
              <Link to="/register" className="hover:underline">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;