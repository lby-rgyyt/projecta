import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
// import HomePage from "./pages/HomePage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import UpdatePasswordPage from "./pages/UpdatePasswordPage";
import CreateProductPage from "./pages/CreateProductPage";
import EditProductPage from "./pages/EditProductPage";
import NotFoundPage from "./pages/NotFoundPage";
import ProductListPage from "./pages/ProductListPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<ProductListPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/profile/password" element={<UpdatePasswordPage />} />
          <Route path="/profile/reset-password/:token" element={<ResetPasswordPage />} />
          <Route path="/products/create" element={<CreateProductPage />} />
          <Route path="/products/edit/:id" element={<EditProductPage />} />
          <Route path="/products" element={<ProductListPage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
