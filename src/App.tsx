import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import CategoryList from "./pages/category/list/category-list";
import Home from "./pages/home/home";
import ProductList from "./pages/product/list/product-list";

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
            key="product-route"
            path="/product"
            element={<ProductList />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
