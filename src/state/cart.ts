import _ from "lodash";
import { newRidgeState } from "react-ridge-state";
import { CartItem } from "../components/cart/types";
import { Product } from "../components/products/types";

import { produce } from "immer";
import { currentApi } from "../config/config";
import { DeliveryMethodOption } from "../components/store/types";
import { config } from "../components/checkout/config";

const authStorageKey = currentApi.cartStateName;

export type CartItems = {
  store: number | string;
  items: CartItem[];
  selectedDelivery?: {
    id: number | string;
    option: DeliveryMethodOption;
    extra?: any;
  };
};

export type Totals = {
  total_items: number;
  delivery: number;
  vat: number;
  total: number;
};

interface Cart {
  loading: boolean;
  showing: boolean;
  id?: number;
  cart?: CartItems[];
  totals?: Totals;
}

const emptyCart = {
  loading: false,
  showing: false,
  id: undefined,
  cart: [],
  totals: undefined,
};

export const cartState = newRidgeState<Cart>(emptyCart, {
  onSet: (newState) => {
    // calculate totals

    try {
      localStorage.setItem(authStorageKey, JSON.stringify(newState));
    } catch (e) {}
  },
});

//

const setTotals = (newCart): Totals => {
  if (newCart.length > 0) {
    let newTotals: Totals = {
      total_items: 0,
      delivery: 0,
      vat: 0,
      total: 0,
    };

    newCart.forEach((Items) => {
      Items.items.forEach((Item) => {
        const productPrice =
          Item.Quantity *
          parseInt(
            Item.Product.data.attributes.Variation[Item.Variation].Price
          );
        const deliveryPrice = Items.selectedDelivery.option.Cost;
        newTotals.total_items = newTotals.total_items + productPrice;
        newTotals.delivery = newTotals.delivery + deliveryPrice;
        newTotals.total = newTotals.total + productPrice + deliveryPrice;
      });
    });

    return newTotals;
  } else {
    return undefined;
  }
};

// SETTING DELIVERY METHOD
export const setDeliveryMethod = (storeId, option) => {
  let newCart = cartState.get().cart;

  const curStoreCartIndex = _.findIndex(newCart, (list: CartItems) => {
    return list?.store === storeId;
  });

  newCart = produce(newCart, (draft) => {
    draft[curStoreCartIndex].selectedDelivery = {
      ...option,
      extra:
        draft[curStoreCartIndex].selectedDelivery.id === config.paxi.toString()
          ? draft[curStoreCartIndex].selectedDelivery.extra
          : undefined,
    };
  });

  // Set the new state
  cartState.set((prevState) => {
    return {
      ...prevState,
      totals: setTotals(newCart),
      cart: newCart,
    };
  });

  return newCart;
};

const getGroupIndexByStore = (storeId) => {
  let cart = cartState.get().cart;

  return _.findIndex(cart, (list: CartItems) => {
    return list?.store === storeId;
  });
};

// GET EXTRA ON STORE ID
export const getSelectedExtra = (storeId) => {
  let cart = cartState.get().cart;

  return cart[getGroupIndexByStore(storeId)].selectedDelivery.extra;
};

// SETTING EXTRA ON DELIVERY METHOD
export const setExtraOnDeliveryMethod = (storeId, extra) => {
  let newCart = cartState.get().cart;

  newCart = produce(newCart, (draft) => {
    draft[getGroupIndexByStore(storeId)].selectedDelivery.extra = extra;
  });

  // Set the new state
  cartState.set((prevState) => {
    return {
      ...prevState,
      totals: setTotals(newCart),
      cart: newCart,
    };
  });

  return newCart;
};

// ADDING AND REMOVING FROM CART

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
  const productStoreDeliveryMethods =
    product.data.attributes.Store.data.attributes.DeliveryMethods.data;

  let newCart = cartState.get().cart;

  let curStoreCart = getGroupIndexByStore(productStoreId);

  // MAKE SURE THE QUANTITY ISN"T HIGHER THAN THE AVAILABLE

  const newQuantity =
    quantityValue > productVariationQuantity
      ? productVariationQuantity
      : quantityValue;

  // SETUP THE NEW PRODUCT DATA

  const newProductData = {
    Product: product,
    Store: product.data.attributes.Store.data.id,
    Variation: variationValue,
    Quantity: newQuantity,
    Extra: null,
  };

  // SELECT PICKUP AS THE INITIAL METHOD

  const newStoreDeliveryMethodIndex = _.findIndex(
    productStoreDeliveryMethods,
    (obj) => {
      return obj.id === config.pickup.toString();
    }
  );

  const pickup = productStoreDeliveryMethods[newStoreDeliveryMethodIndex];

  const initialSelectedDelivery = {
    id: pickup.id,
    option: pickup.attributes.delivery_options[0],
  };

  if (quantityValue !== -1) {
    // we don't have that store yet
    if (curStoreCart === -1) {
      // create the entry
      newCart = produce(newCart, (draft) => {
        draft.push({
          store: productStoreId,
          items: [newProductData],
          selectedDelivery: initialSelectedDelivery,
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

  // Set the new state
  cartState.set((prevState) => {
    return {
      ...prevState,
      totals: setTotals(newCart),
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
