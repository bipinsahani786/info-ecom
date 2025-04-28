import { useCart } from '../contexts/CartContext';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';

const Cart = () => {
  const { cartItems, removeFromCart, clearCart, loading } = useCart();

  const totalAmount = cartItems.reduce((sum, item) => {
    return sum + (item.productId?.price || 0) * (item.quantity || 1);
  }, 0);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">🛒 My Cart</h1>

      {cartItems.length === 0 ? (
        <div className="text-center">
          <p className="text-gray-500 mb-4">Your cart is empty!</p>
          <Link 
            to="/"
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <>
          <div className="space-y-6">
            {cartItems.map((item) => (
              <div key={item.productId?._id} className="flex justify-between items-center border-b pb-4">
                <div className="flex items-center gap-4">
                  <img 
                    src={item.productId?.image || 'https://via.placeholder.com/150'} 
                    alt={item.productId?.name} 
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <h2 className="text-lg font-semibold">{item.productId?.name}</h2>
                    <p className="text-gray-600">${item.productId?.price}</p>
                    <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                  </div>
                </div>
                <button 
                  onClick={() => removeFromCart(item.productId?._id)}
                  className="text-red-500 hover:underline"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-between items-center">
            <div>
              <p className="text-xl font-semibold">Total: ${totalAmount.toFixed(2)}</p>
            </div>
            <div className="flex gap-4">
              <button 
                onClick={clearCart}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Clear Cart
              </button>
              <Link 
                to="/checkout"
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
