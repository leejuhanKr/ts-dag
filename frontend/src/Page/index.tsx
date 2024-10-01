import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ProductPage from './product';
import CartPage from './cart';

const Home = () => <h2>Home</h2>;

const About = () => <h2>About</h2>;

const Users = () => <h2>Users</h2>;

const App = () => (
  <Router>
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/users">Users</Link>
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>
          <li>
            <Link to="/carts">Carts</Link>
          </li>
        </ul>
      </nav>

      {/* A <Routes> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/users" element={<Users />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/carts" element={<CartPage />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  </Router>
);

export default App;
