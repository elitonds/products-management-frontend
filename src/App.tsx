import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Category from "./pages/category/category";
import CategoryList from "./pages/category/list/category-list";
import Home from "./pages/home/home";
import ProductList from "./pages/product/list/product-list";
import Product from "./pages/product/product";

function App() {
  return (
    <div className="App">
      <Router>
        <Home />
        <Routes>
          <Route
            key="category-route"
            path="/category"
            element={<CategoryList />}
          />
          <Route
            key="category-new-route"
            path="/category/new"
            element={<Category />}
          />

          <Route
            key="category-edit-route"
            path="/category/:id"
            element={<Category />}
          />
          <Route
            key="product-route"
            path="/product"
            element={<ProductList />}
          />
          <Route
            key="product-new-route"
            path="/product/new"
            element={<Product />}
          />

          <Route
            key="product-edit-route"
            path="/product/:id"
            element={<Product />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
