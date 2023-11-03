import { Route, Routes, useNavigate } from "react-router-dom";
import LoginPage from "./pages/user/login/LoginPage";
import NotFoundPage from "./pages/user/NotFound/NotFound";
import RegisterPage from "./pages/user/register/RegisterPage";
import HomePage from "./pages/user/home/HomePage";
import DetailPage from "./pages/user/detail/DetailPage";
import CartPage from "./pages/user/cart/CartPage";
import AdminLoginPage from "./pages/admin/login/AdminLoginPage";
import UsersManagerPage from "./pages/admin/UserManager/UserManagerPage";
import OrdersManagerPage from "./pages/admin/OrderManager/OrderManagerPage";
import ProductManagerPage from "./pages/admin/ProductManager/ProductManager";
import AddProductPage from "./pages/admin/AddProduct/AddProductPage";
import PrivateAdminRoutes from "./components/PrivateAdminRoutes/PrivateAdminRoutes";
import BranchesManagerPage from "./pages/admin/BranchManager/BranchManager";
import UpdateBranchPage from "./pages/admin/UpdateBranch/UpdateBranchPage";
import { useEffect } from "react";
import OrderHistoryPage from "./pages/user/OrderHistory/OrderHistoryPage";

function App() {
  const navigate = useNavigate();
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  useEffect(() => {
    scrollToTop();
  }, [navigate]);
  return <>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/monitors/:id" element={<DetailPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route path="/history" element={<OrderHistoryPage />} />
      <Route element={<PrivateAdminRoutes />}>
        <Route path="/admin/users" element={<UsersManagerPage />} />
        <Route path="/admin/orders" element={<OrdersManagerPage />} />
        <Route path="/admin/products" element={<ProductManagerPage />} />
        <Route path="/admin/products/add" element={<AddProductPage />} />
        <Route path="/admin/manufacturers" element={<BranchesManagerPage />} />
        <Route path="/admin/manufacturers/:id/update" element={<UpdateBranchPage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </>;
}

export default App;
