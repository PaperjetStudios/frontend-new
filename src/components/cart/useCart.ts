import { ApolloError, gql, useLazyQuery, useMutation } from "@apollo/client";
import { useState, useEffect } from "react";

import { userState } from "../../state/user";
import { Product } from "../products/types";

import { omit, forEach, filter } from "lodash";

import { CartItem, CART_BASE } from "./types";
import { cartState } from "../../state/cart";

function useCart() {
  const user = userState.get();
  const [cartItems] = cartState.use();

  /* 
  // MUTATION - CREATE CART
  */

  const [
    createCartMutation,
    {
      data: createCartData,
      loading: createCartLoading,
      error: createCartError,
    },
  ] = useMutation(gql`
    ${CART_BASE}
    mutation {
      createCart(data: {}) {
        data {
          ...CART_BASE
        }
      }
    }
  `);

  /* 
  // MUTATION - UPDATE CART
  */

  const [
    updateCartMutation,
    {
      data: updateCartData,
      loading: updateCartLoading,
      error: updateCartError,
    },
  ] = useMutation(
    gql`
      ${CART_BASE}
      mutation ($cartId: ID!, $products: CartInput!) {
        updateCart(id: $cartId, data: $products) {
          data {
            ...CART_BASE
          }
        }
      }
    `,
    {
      onError: (error: ApolloError) => {
        console.log(JSON.stringify(error));
      },
    }
  );

  /* 
  // QUERY - GET CART
  */

  const [
    getCartQuery,
    { loading: getCartLoading, error: getCartError, data: getCartData },
  ] = useLazyQuery(
    gql`
      ${CART_BASE}
      query ($cart: ID) {
        cart(id: $cart) {
          data {
            ...CART_BASE
          }
        }
      }
    `,
    {
      onCompleted: (data) => {
        console.log("cart fetch", data);
      },
      fetchPolicy: "network-only",
      onError: (error: ApolloError) => {
        console.log(JSON.stringify(error));
      },
    }
  );

  /* 
  // Toggle Preview
  */

  const togglePreview = (toggle: boolean | null) => {
    cartState.set((prevState) => ({
      ...prevState,
      showing: toggle ? toggle : !prevState.showing,
    }));
  };

  /* 
  // FUNCTION - UPDATE CART
  */

  const compareQuantity = (product: Product, quantity: number) => {
    const maxQuantity = parseInt(product.attributes.Variation[0].Quantity);
    if (quantity > maxQuantity) {
      return maxQuantity;
    } else {
      return quantity;
    }
  };

  const updateCart = async (list: CartItem[]) => {
    await checkForCart();

    const cartData = cartItems.attributes?.CartItem;
    let newCartData: any[] = [];

    if (cartData) {
      // add current data
      cartData.forEach((obj: CartItem) => {
        newCartData.push({
          Product: obj.Product.data.id,
          Quantity: obj.Quantity,
          Extra: obj.Extra,
        });
      });

      // add list data
      list.forEach((obj: CartItem) => {
        //merge or add
        let isAddition = true;
        newCartData.forEach((current: any) => {
          if (current.Product === obj.Product.data.id) {
            isAddition = false;
            current.Quantity = compareQuantity(
              obj.Product.data,
              current.Quantity + obj.Quantity
            );
          }
        });
        // Add if it doesn't exist on the list
        if (isAddition) {
          newCartData.push({
            Product: obj.Product.data.id,
            Quantity: obj.Quantity,
            Extra: obj.Extra,
          });
        }
      });

      // make sure we don't have any negative or zeros
      newCartData = filter(newCartData, (obj: CartItem) => {
        return obj.Quantity > 0;
      });

      // update
      updateCartMutation({
        variables: {
          cartId: user.cartId,
          products: { CartItem: newCartData },
        },
      }).then((cart) => {
        cartState.set((prevState) => ({
          ...prevState,
          ...cart.data.updateCart.data,
          showing: true,
        }));
      });
    }
  };

  /* 
  // USEEFFECT
  */

  function createCart(cartInfo) {
    createCartMutation().then((cart: any) => {
      const cartId = cart.data.createCart?.data?.id;
      userState.set({
        ...user,
        cartId: cartId,
      });
      cartState.set((prevState) => ({
        ...prevState,
        ...cartInfo.data.cart.data,
      }));
      console.log("setting", cartItems);
    });
  }

  async function checkForCart() {
    const cartInfo = await getCartQuery({ variables: { cart: user.cartId } });
    console.log("check for cart start", cartInfo);
    if (cartInfo.data.cart.data === null) {
      createCart(cartInfo);
    } else {
      cartState.set((prevState) => ({
        ...prevState,
        ...cartInfo.data.cart.data,
      }));
    }
    console.log("check for cart complete", cartItems);
  }

  useEffect(() => {
    const check = async () => {
      await checkForCart();
    };
    console.log("use effect");
    check();
  }, []);

  const getStatus = () => {
    console.log(cartItems);
  };

  return {
    update: updateCart,
    getStatus: getStatus,
    togglePreview: togglePreview,
    showing: cartItems.showing,
    loading: createCartLoading || getCartLoading,
  };
}

export default useCart;
