import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductPage from './product';
import CartPage from './cart';
import Navigation from '../Component/Navigation';
import Dashboard from './dashboard';

// const Home = () => <h2>Home</h2>;

const About = () => <h2>About</h2>;

const Users = () => <h2>Users</h2>;

const App = () => (
  <Router>
    <Navigation />
    <div>
      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/users" element={<Users />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/carts" element={<CartPage />} />
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </div>
  </Router>
);

export default App;
