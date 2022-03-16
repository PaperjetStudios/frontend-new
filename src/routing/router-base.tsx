import { useContext, useLayoutEffect } from "react";

import { Routes, Route, UNSAFE_NavigationContext } from "react-router-dom";
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

import OrderFlow from "../pages/orderflow";
import Account from "../pages/profile/account";
import Wishlist from "../pages/profile/wishlist";
import Orders from "../pages/profile/orders";
import Shop from "../pages/profile/shop";
import Wallet from "../pages/profile/wallet";
import ProfilePage from "../pages/profile/profile";
import OrderHolder from "../pages/template/order-holder";

import Order from "../pages/template/order";
import { BrowserHistory } from "history";
import { cartState } from "../state/cart";

const BaseRoutes: React.FC = () => {
  const navigation = useContext(UNSAFE_NavigationContext)
    .navigator as BrowserHistory;

  useLayoutEffect(() => {
    if (navigation) {
      navigation.listen((locationListener) => {
        // hide the cart preview every dom change
        cartState.set((prevState) => ({
          ...prevState,
          showing: false,
        }));
      });
    }
  }, [navigation]);

  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/login-register" element={<LoginRegisterPage />} />

      <Route path="/profile/" element={<ProfilePage />}>
        <Route index element={<Account />} />
        <Route path="wishlist" element={<Wishlist />} />
        <Route path="orders" element={<Orders />} />
        <Route path="order" element={<OrderHolder />}>
          <Route path=":order" element={<Order />} />
        </Route>
        <Route path="shop" element={<Shop />} />
        <Route path="wallet" element={<Wallet />} />
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
