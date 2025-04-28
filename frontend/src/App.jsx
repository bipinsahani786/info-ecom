import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import { useCart } from './contexts/CartContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import API from './services/api';

function App() {
  const { user, login, logout } = useAuth();

  const handleLogin = async (email, password) => {
    try {
      const response = await API.post('/auth/login', { email, password });
      const data = response.data;
      
      localStorage.setItem('user', JSON.stringify(data));
      login(data.user);
      
      return true;
    } catch (error) {
      console.error('Login error:', error);
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  };

  const handleSignup = async (name, email, password) => {
    try {
      const response = await API.post('/auth/register', { name, email, password });
      return true;
    } catch (error) {
      console.error('Signup error:', error);
      throw new Error(error.response?.data?.message || 'Signup failed');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    logout();
  };

  return (
    <Router>
      <Navbar isLoggedIn={!!user} onLogout={handleLogout} />
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register onSignup={handleSignup} />} />
          <Route 
            path="/cart" 
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/checkout" 
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/orders" 
            element={
              <ProtectedRoute>
                <Orders />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;