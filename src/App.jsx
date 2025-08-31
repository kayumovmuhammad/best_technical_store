import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./screens/HomePage/HomePage";
import ProductPage from "./screens/ProductPage/ProductPage";
import SearchPage from "./screens/SearchPage/SearchPage";
import ThemeProvider from "./providers/ThemeProvider";
import CartProvider from "./providers/CartProvider";
import OrderScreen from "./screens/OrderScreen/OrderScreen";

export default function App() {
    return (
        <CartProvider>
            <ThemeProvider>
                <Router>
                    <Routes>
                        <Route path="/" element={<HomePage />}></Route>
                        <Route
                            path="/product/:id"
                            element={<ProductPage />}
                        ></Route>
                        <Route path="/search" element={<SearchPage />}></Route>
                        <Route path="/order" element={<OrderScreen />}></Route>
                        <Route path="*" element={<h1>Not found</h1>}></Route>
                    </Routes>
                </Router>
            </ThemeProvider>
        </CartProvider>
    );
}
