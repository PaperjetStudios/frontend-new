import { Routes, Route } from "react-router-dom";
import Authorized from "../components/auth/authorized";
import Category from "../pages/template/category";

import Checkout from "../pages/checkout";
import Homepage from "../pages/home";
import NothingFound from "../pages/nothing-found";
import LoginRegisterPage from "../pages/user/login-register";

import CategoryHolder from "../pages/template/category-holder";

import Product from "../pages/template/product";
import StoreHolder from "../pages/template/store-holder";
import Store from "../pages/template/store";
import BaseProduct from "../pages/layout/base-product";
import WizardTest from "../pages/wizardTest";
import TestPage from "../pages/testpage";
import OrderFlow from "../pages/orderflow";
import Account from "../pages/profile/account";
import Wishlist from "../pages/profile/wishlist";
import Orders from "../pages/profile/orders";
import Shop from "../pages/profile/shop";
import Wallet from "../pages/profile/wallet";
import ProfilePage from "../pages/profile/profile";
import OrderHolder from "../pages/template/order-holder";
import OrderHolderStore from "../pages/template/order-holder-store";
import Order from "../pages/template/order";
import OrderList from "../components/orders/table-list";
import ShopSetup from "../components/store/setup";
import ProductSetup from "../components/products/product-setup";
import Box from "../components/box";

/* <Authorized guest redirect="/profile">
            <LoginRegisterPage />
        </Authorized> 
        
        <Authorized redirect="/login-register">
        */

const BaseRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/login-register" element={<LoginRegisterPage />} />

      <Route path="/profile/" element={<ProfilePage />}>
        <Route index element={<Account />} />
        <Route path="wishlist" element={<Wishlist />} />
        <Route path="order" element={<OrderHolder />}>
          <Route path=":order" element={<Order />} />
        </Route>
        <Route path="shop" element={<Shop />}>
          <Route index element={<OrderList seller />} />
          <Route path="setup" element={<ShopSetup />} />
          <Route path="products" element={<ProductSetup />}>
            <Route index element={<ProductSetup />} />
            <Route path=":slug" element={<ProductSetup />} />
          </Route>
          <Route path="banking_details" element={<Box />} />
        </Route>
      </Route>

      <Route path="/wizard" element={<WizardTest />} />
      <Route path="/orderflow" element={<OrderFlow />} />
      <Route path="/category" element={<CategoryHolder />}>
        <Route path=":cat" element={<Category />} />
      </Route>
      <Route path="/products" element={<BaseProduct />}>
        <Route path=":product" element={<Product />} />
      </Route>
      <Route path="/store" element={<StoreHolder />}>
        <Route path=":store" element={<Store />} />
      </Route>
      <Route path="*" element={<NothingFound />} />
    </Routes>
  );
};

export default BaseRoutes;
