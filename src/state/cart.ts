import _ from "lodash";
import { newRidgeState } from "react-ridge-state";
import { CartItem } from "../components/cart/types";
import { Product } from "../components/products/types";

import { produce } from "immer";
import { currentApi } from "../config/config";

const authStorageKey = currentApi.cartStateName;

export type CartItems = {
  store: number | string;
  items: CartItem[];
  selectedDelivery: number;
};

interface Cart {
  loading: boolean;
  showing: boolean;
  id?: number;
  cart?: CartItems[];
}

const emptyCart = {
  loading: false,
  showing: false,
  id: undefined,
  cart: [],
};

export const cartState = newRidgeState<Cart>(emptyCart, {
  onSet: (newState) => {
    try {
      localStorage.setItem(authStorageKey, JSON.stringify(newState));
    } catch (e) {}
  },
});

export const updateCart = (
  product: { data: Product },
  quantityValue: number,
  variationValue: number = 0,
  showCartAfter: boolean = false
) => {
  const productVariationData =
    product.data.attributes.Variation[variationValue];
  const productVariationQuantity = parseInt(productVariationData.Quantity);
  const productStoreId = product.data.attributes.Store.data.id;

  let newCart = cartState.get().cart;

  let curStoreCart = _.findIndex(newCart, (list: CartItems) => {
    return list?.store === productStoreId;
  });

  const newQuantity =
    quantityValue > productVariationQuantity
      ? productVariationQuantity
      : quantityValue;

  const newProductData = {
    Product: product,
    Store: product.data.attributes.Store.data.id,
    Variation: variationValue,
    Quantity: newQuantity,
    Extra: null,
  };

  if (quantityValue !== -1) {
    // we don't have that store yet
    if (curStoreCart === -1) {
      // create the entry
      newCart = produce(newCart, (draft) => {
        draft.push({
          store: productStoreId,
          items: [newProductData],
          selectedDelivery: 0,
        });
      });
    } else {
      const existingProduct = _.findIndex(
        newCart[curStoreCart].items,
        (item: CartItem) => {
          return item.Product.data.id === newProductData.Product.data.id;
        }
      );
      // if there is an existing product, update it, if not, add a new one
      newCart = produce(newCart, (draft) => {
        if (existingProduct !== -1) {
          draft[curStoreCart].items[existingProduct] = newProductData;
        } else {
          draft[curStoreCart].items.push(newProductData);
        }
      });
    }
  } else {
    // if quantity === -1, delete it
    if (curStoreCart !== -1) {
      const productInCart = _.findIndex(
        newCart[curStoreCart].items,
        (item: CartItem) => {
          return item.Product.data.id === newProductData.Product.data.id;
        }
      );
      newCart = produce(newCart, (draft) => {
        // delete the entry if there's only one in the entry
        if (draft[curStoreCart].items.length === 1) {
          draft.splice(curStoreCart, 1);
        } else {
          draft[curStoreCart].items.splice(productInCart, 1);
        }
      });
    }
  }

  cartState.set((prevState) => {
    return {
      ...prevState,
      showing: showCartAfter,
      cart: newCart,
    };
  });

  return newCart;
};

// setInitialState fetches data from localStorage
async function setInitialState() {
  try {
    const item = await localStorage.getItem(authStorageKey);
    if (item) {
      const initialState = JSON.parse(item);
      cartState.set(initialState);
    }
  } catch (e) {}
}

// run function as application starts
setInitialState();
