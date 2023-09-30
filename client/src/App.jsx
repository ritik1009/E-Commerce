import Footer from "./components/Footer"
import Navbar from "./components/Navbar"
import Home from "./pages/Home";
import Login from "./pages/Login"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ProductDetails from "./pages/ProductDetails";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Cart from "./pages/Cart";
import Register from "./pages/Register";
import AddProduct from "./pages/AddProduct";



function App() {
  return (
    <Router>
      <div className="min-h-screen flex justify-between flex-col">
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/details/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/addProduct/:id" element={<AddProduct />} />
          <Route path="/addProduct" element={<AddProduct />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App
