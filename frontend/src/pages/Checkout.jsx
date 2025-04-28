import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import API from '../services/api';
import Loader from '../components/Loader';

const Checkout = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { cartItems, clearCart } = useCart();

  const totalAmount = cartItems.reduce((sum, item) => {
    return sum + (item.productId?.price || 0) * (item.quantity || 1);
  }, 0);

  const placeOrder = async () => {
    try {
      setLoading(true);
      await API.post('/orders');
      await clearCart();
      alert('Order placed successfully!');
      navigate('/orders');
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (cartItems.length === 0) {
    return (
      <div className="text-center mt-10">
        <p className="text-xl mb-4">Your cart is empty!</p>
        <button
          onClick={() => navigate('/')}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-center">Checkout</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        {cartItems.map((item) => (
          <div key={item.productId?._id} className="flex justify-between items-center mb-4">
            <div>
              <p className="font-medium">{item.productId?.name}</p>
              <p className="text-gray-600">Quantity: {item.quantity}</p>
            </div>
            <p className="font-medium">${(item.productId?.price * item.quantity).toFixed(2)}</p>
          </div>
        ))}
        <div className="border-t pt-4 mt-4">
          <div className="flex justify-between items-center text-xl font-bold">
            <p>Total:</p>
            <p>${totalAmount.toFixed(2)}</p>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={placeOrder}
          className="bg-green-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-green-700"
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default Checkout;
