import { useEffect, useState } from "react";
import { axiosInstance } from "../../config/api";
import { cartState } from "../../state/cart";

export type Props = {};
export type Response = {
  errors?: any[];
};

export default function useCheckout() {
  const [checkoutId, setCheckoutId] = useState(-1);
  const [loading, setLoading] = useState(false);

  const [cart] = cartState.use();

  const createOrder = (continueAnyway, user, callback, errorCallback) => {
    setLoading(true);
    return axiosInstance()(`/transactions/createMyOrder`, {
      method: "post",
      data: {
        cart: cart,
        continue_anyway: continueAnyway,
        user: user,
      },
    })
      .then((response) => {
        setLoading(false);
        if (response.data.newOrder.errors) {
          errorCallback(response.data.newOrder);
        } else {
          callback(response.data.newOrder);
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log("An error occurred:", error);
        // setLoadingUser(false);
      });
  };

  return {
    createOrder,
    loading,
  };
}
