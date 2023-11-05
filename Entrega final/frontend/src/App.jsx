import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom"

// ---- Components
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import ProductListContainer from "./components/ProductListContainer";

// ---- Pages
import { Home } from './pages/Home';
import { Login } from './pages/LoginPage';
import { Register } from './pages/RegisterPage';
import { RecoverPassword } from './pages/RecoverPassword';
import { UpdatePassword } from './pages/UpdatePassword';
import { ProductDetail } from "./pages/ProductDetail";
import { Cart } from "./pages/Cart"
import { Account } from "./pages/Account"

// ---- Auth context
import { AuthProvider } from "./context/AuthContext";


function App() {
  const NoHeaderPages = ['/login', '/register', '/recoverpassword', '/updatepassword'];
  function HideHeaderFooter({componentName: Component}) {
    const location = useLocation();
    return NoHeaderPages.includes(location.pathname) ? null : <Component />;
  }

  return (
    <AuthProvider>
      <BrowserRouter>
        <HideHeaderFooter componentName={Header} />
        <Routes>
          <Route path="/"  element={<Home />} />
          <Route path="/login"  element={<Login />} />
          <Route path="/register"  element={<Register />} />
          <Route path="/recoverpassword"  element={<RecoverPassword />} />
          <Route path="/updatepassword"  element={<UpdatePassword />} />
          <Route path="/account"  element={<Account />} />
          <Route path="/detail/:productId"  element={<ProductDetail />} />
          <Route path="/cart"  element={<Cart />} />
          <Route path="/products"  element={<ProductListContainer />} />
          <Route path="/products/:category"  element={<ProductListContainer />} />
          <Route path="*" element={<Navigate to={"/"} />}/> 
        </Routes>
        <HideHeaderFooter componentName={Footer}/>
    </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
